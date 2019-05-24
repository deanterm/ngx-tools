import { KeyCode } from '@terminus/ngx-tools/keycodes';


/**
 * Creates a browser MouseEvent with the specified options.
 *
 * @example
 * createMouseEvent('click');
 * createMouseEvent('click', 212, 433);
 *
 * @param type - The event type
 * @param x - The location on the X axis
 * @param y - The location on the Y axis
 * @return The event
 */
export function createMouseEvent(type: string, x = 0, y = 0): MouseEvent {
  const event: MouseEvent = document.createEvent('MouseEvent');

  /* eslint-disable line-comment-position */
  event.initMouseEvent(
    type,
    false, // canBubble
    false, // cancelable
    window, // view
    0, // detail
    x, // screenX
    y, // screenY
    x, // clientX
    y, // clientY
    false, // ctrlKey
    false, // altKey
    false, // shiftKey
    false, // metaKey
    0, // button
    null, // relatedTarget
  );
  /* eslint-enable line-comment-position */

  return event;
}


/**
 * Creates a browser TouchEvent with the specified pointer coordinates.
 *
 * @example
 * createTouchEvent('touchstart');
 * createTouchEvent('touchstart', 212, 433);
 *
 * @param type - The touch event type
 * @param pageX - The location on the X axis
 * @param pageY - The location on the Y axis
 */
export function createTouchEvent(type: string, pageX = 0, pageY = 0): UIEvent {
  // In favor of creating events that work for most of the browsers, the event is created
  // as a basic UI Event. The necessary details for the event will be set manually.
  const event: UIEvent = document.createEvent('UIEvent');
  const touchDetails = {
    pageX,
    pageY,
  };

  event.initUIEvent(type, true, true, window, 0);

  // Most of the browsers don't have a "initTouchEvent" method that can be used to define
  // the touch details.
  Object.defineProperties(event, {touches: {value: [touchDetails]}});

  return event;
}


/**
 * Dispatches a keydown event from an element.
 *
 * @example
 * createKeyboardEvent('keydown', ENTER, myInputNativeElement);
 *
 * @param type - The event type
 * @param key - The KeyCode type
 * @param target - The target element
 * @return The event
 */
export function createKeyboardEvent(
  type: string,
  key: KeyCode,
  target?: Element,
): KeyboardEvent {
  // tslint:disable: no-unsafe-any
  // NOTE: Cannot 'type' the event here due to the note about FireFox below
  // tslint:disable-next-line no-any
  const event = document.createEvent('KeyboardEvent') as any;
  event.initEvent(type, true, false);
  const originalPreventDefault: () => void = event.preventDefault;

  // Webkit Browsers don't set the keyCode when calling the init function.
  // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
  Object.defineProperties(event, {
    key: {get: () => key.code},
    target: {get: () => target},
    code: {get: () => key.code},
  });

  // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
  event.preventDefault = function(): void {
    Object.defineProperty(event, 'defaultPrevented', {get: () => true});
    // FIXME: Not sure why this `as any` is needed now
    // tslint:disable-next-line no-any
    return originalPreventDefault.apply(this, arguments as any);
  };

  return event as KeyboardEvent;
  // tslint:enable: no-unsafe-any
}


/**
 * Creates a fake event object with any desired event type.
 *
 * @example
 * createFakeEvent('focus');
 *
 * @param type - The event type
 * @param canBubble - Define if the event can bubble up the DOM
 * @param type - Define if the event is cancelable
 * @return The event
 */
export function createFakeEvent(
  type: string,
  canBubble = true,
  cancelable = true,
): Event {
  const event: Event = document.createEvent('Event');
  event.initEvent(type, canBubble, cancelable);

  return event;
}
