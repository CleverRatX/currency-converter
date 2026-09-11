import { act, renderHook, waitFor } from '@testing-library/react';

import { ApiError } from '../api/errors';
import { createLoadAction, useAsyncData } from './useAsyncData';

const initialState = { data: ['initial'], error: null };

test('the action writes the loaded data and clears the error', async () => {
  const load = vi.fn().mockResolvedValue(['loaded']);

  const nextState = await createLoadAction(load)({ data: ['initial'], error: { message: 'old error' } }, 'params');

  expect(nextState).toEqual({ data: ['loaded'], error: null });
  expect(load).toHaveBeenCalledWith('params');
});

test('the action keeps the previous data and writes the error', async () => {
  const load = vi.fn().mockRejectedValue(new ApiError('The server is down'));

  const nextState = await createLoadAction(load)(initialState, 'params');

  expect(nextState).toEqual({ data: ['initial'], error: { message: 'The server is down' } });
});

test('the action hides an unexpected error behind a safe message', async () => {
  const load = vi.fn().mockRejectedValue(new TypeError('cannot read properties of undefined'));

  const nextState = await createLoadAction(load)(initialState, 'params');

  expect(nextState.error?.message).not.toContain('undefined');
  expect(nextState.data).toEqual(['initial']);
});

test('the hook reports loading while the data is being loaded', async () => {
  let resolveLoad: (value: string[]) => void = () => {};
  const load = vi.fn(() => new Promise<string[]>((resolve) => (resolveLoad = resolve)));

  const { result } = renderHook(() => useAsyncData<string[], void>(load, []));

  expect(result.current.isLoading).toBe(false);

  act(() => {
    result.current.loadData();
  });

  await waitFor(() => expect(result.current.isLoading).toBe(true));

  await act(async () => {
    resolveLoad(['loaded']);
  });

  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual(['loaded']);
  expect(result.current.error).toBeNull();
});

test('the hook keeps the loaded data when the next request fails', async () => {
  const load = vi.fn().mockResolvedValueOnce(['loaded']).mockRejectedValueOnce(new ApiError('The server is down'));

  const { result } = renderHook(() => useAsyncData<string[], void>(load, []));

  act(() => {
    result.current.loadData();
  });

  await waitFor(() => expect(result.current.data).toEqual(['loaded']));

  act(() => {
    result.current.loadData();
  });

  await waitFor(() => expect(result.current.error).toEqual({ message: 'The server is down' }));
  expect(result.current.data).toEqual(['loaded']);
});
