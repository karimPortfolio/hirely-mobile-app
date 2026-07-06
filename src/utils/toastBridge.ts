import { ApiErrorState } from '@/types/api-error.types'

type ToastEvent = 
  | { type: 'error'; data: ApiErrorState }
  | { type: 'success'; message: string };

type Listener = (event: ToastEvent) => void;
const listeners = new Set<Listener>();

export const toastBridge = {
  emitError: (data: ApiErrorState) => listeners.forEach(l => l({ type: 'error', data })),
  emitSuccess: (message: string) => listeners.forEach(l => l({ type: 'success', message })),
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};