import { startTransition, useActionState, useCallback, useMemo } from 'react';

import { toLoadError, type LoadError } from '../api/errors';

type AsyncDataState<TData> = {
  data: TData;
  error: LoadError | null;
};

type DataLoader<TData, TParams> = (params: TParams) => Promise<TData>;

export const createLoadAction = <TData, TParams>(load: DataLoader<TData, TParams>) => {
  return async (previousState: AsyncDataState<TData>, params: TParams): Promise<AsyncDataState<TData>> => {
    try {
      return { data: await load(params), error: null };
    } catch (error) {
      return { data: previousState.data, error: toLoadError(error) };
    }
  };
};

export const useAsyncData = <TData, TParams>(load: DataLoader<TData, TParams>, initialData: TData) => {
  const loadAction = useMemo(() => createLoadAction(load), [load]);
  const [state, dispatch, isLoading] = useActionState(loadAction, { data: initialData, error: null });

  const loadData = useCallback(
    (params: TParams) => {
      startTransition(() => {
        dispatch(params);
      });
    },
    [dispatch]
  );

  return { data: state.data, error: state.error, isLoading, loadData };
};
