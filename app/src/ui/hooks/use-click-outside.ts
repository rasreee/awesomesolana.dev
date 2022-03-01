import { MutableRefObject, RefObject, useEffect } from 'react';

import { off, on } from './lib/events';
import { useSyncedRef } from './use-synced-ref';

const DEFAULT_EVENTS = ['mousedown', 'touchstart'];

/**
 * Triggers callback when user clicks outside the target element.
 *
 * @param ref React ref object with target HTML element.
 * @param callback Callback that will be triggered during the click.
 * @param events Events list that will be used as triggers for outside click.
 * Default: 'mousedown', 'touchstart'
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T> | MutableRefObject<T>,
  callback: React.MouseEventHandler<T>,
  events: string[] = DEFAULT_EVENTS,
): void {
  const cbRef = useSyncedRef(callback);
  const refRef = useSyncedRef(ref);

  useEffect(() => {
    function handler(this: T, event: React.MouseEvent<T>) {
      if (!refRef.current.current) return;

      const { target: evtTarget } = event;
      const cb = cbRef.current;

      if (
        !evtTarget ||
        (!!evtTarget && !refRef.current.current.contains(evtTarget as Node))
      ) {
        cb.call(this, event);
      }
    }

    events.forEach((name) => on(document, name, handler, { passive: false }));

    return () => {
      events.forEach((name) =>
        off(document, name, handler, { passive: false }),
      );
    };
  }, [...events]);
}
