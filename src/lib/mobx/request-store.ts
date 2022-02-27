import { action, observable } from 'mobx';

export interface RequestState {
  loading: boolean;
  error: string | null;
}

export interface RequestStore extends RequestState {
  onReset: () => void;
  setLoading: (value: boolean) => void;
  setError: (value: unknown) => void;
}

export function createRequestStore() {
  const state: RequestState = observable.object({
    loading: false,
    error: null,
  });

  const setLoading = action((value: boolean) => (state.loading = value));

  const setError = action(
    (value: unknown) =>
      (state.error = value instanceof Error ? value.message : null),
  );

  const onReset = action(() => {
    setLoading(false);
    setError(false);
  });

  return { ...state, setLoading, setError, onReset };
}
