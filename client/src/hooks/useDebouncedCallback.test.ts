import { act, renderHook } from '@testing-library/react';

import { useDebouncedCallback } from './useDebouncedCallback';

const delay = 400;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test('calls the callback once after the pause', () => {
  const callback = vi.fn();
  const { result } = renderHook(() => useDebouncedCallback(callback, delay));

  act(() => {
    result.current();
    result.current();
    result.current();
  });

  expect(callback).not.toHaveBeenCalled();

  act(() => {
    vi.advanceTimersByTime(delay);
  });

  expect(callback).toHaveBeenCalledTimes(1);
});

test('calls the latest version of the callback', () => {
  const firstCallback = vi.fn();
  const secondCallback = vi.fn();
  const { result, rerender } = renderHook(({ callback }) => useDebouncedCallback(callback, delay), {
    initialProps: { callback: firstCallback }
  });

  act(() => {
    result.current();
  });

  rerender({ callback: secondCallback });

  act(() => {
    vi.advanceTimersByTime(delay);
  });

  expect(firstCallback).not.toHaveBeenCalled();
  expect(secondCallback).toHaveBeenCalledTimes(1);
});

test('cancels the pending call on unmount', () => {
  const callback = vi.fn();
  const { result, unmount } = renderHook(() => useDebouncedCallback(callback, delay));

  act(() => {
    result.current();
  });

  unmount();

  act(() => {
    vi.advanceTimersByTime(delay);
  });

  expect(callback).not.toHaveBeenCalled();
});
