import { KeyCode } from '@terminus/ngx-tools/keycodes';

import { createKeyboardEvent } from './create-keyboard-event';
import { dispatchEvent } from './dispatch-event';


/**
 * Shorthand to dispatch a keyboard event with a specified key code
 *
 * @param node - The Node that should dispatch the keyboard event
 * @param type - The event type
 * @param key - The KeycodesConst type (contains code and keyCode)
 * @param target - The target event element
 * @return The keyboard event
 *
 * @example
 * dispatchKeyboardEvent(myNativeElement, 'keyup', ENTER);
 * dispatchKeyboardEvent(myNativeElement, 'keyup', ENTER, myTargetElement);
 */
export function dispatchKeyboardEvent(node: Node, type: string, key: KeyCode, target?: Element):
    KeyboardEvent {
  return dispatchEvent(node, createKeyboardEvent(type, key, target)) as KeyboardEvent;
}
