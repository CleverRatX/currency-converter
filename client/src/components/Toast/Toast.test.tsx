import { render, screen } from '@testing-library/react';

import { toastDuration } from '../../data/constants';
import { Toast } from './Toast';

test('renders the message as an alert', () => {
  render(<Toast message="The server is down" onClose={() => {}} />);

  expect(screen.getByRole('alert')).toHaveTextContent('The server is down');
});

test('closes on its own after the given time', () => {
  vi.useFakeTimers();

  const handleClose = vi.fn();

  render(<Toast message="The server is down" onClose={handleClose} />);

  expect(handleClose).not.toHaveBeenCalled();

  vi.advanceTimersByTime(toastDuration);

  expect(handleClose).toHaveBeenCalledTimes(1);

  vi.useRealTimers();
});
