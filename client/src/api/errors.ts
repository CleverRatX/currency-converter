const unknownErrorMessage = 'Something went wrong. Please try again.';

export class ApiError extends Error {}

export type LoadError = {
  message: string;
};

export const toLoadError = (error: unknown): LoadError => {
  return { message: error instanceof ApiError ? error.message : unknownErrorMessage };
};
