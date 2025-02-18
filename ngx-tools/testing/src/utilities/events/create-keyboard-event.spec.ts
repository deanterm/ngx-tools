import { KEYS } from '@terminus/ngx-tools/keycodes';

import { createKeyboardEvent } from './create-keyboard-event';


describe(`createKeyboardEvent`, function() {

  test(`should add getters to event`, () => {
    const target: Element = window.document.createElement('div');
    const actual: KeyboardEvent = createKeyboardEvent('keydown', KEYS.ENTER, target);
    expect(actual.code).toEqual(KEYS.ENTER.code);
    expect(actual.key).toEqual(KEYS.ENTER.code);
    expect(actual.target).toEqual(target);
  });


  test(`should add helper for preventDefault`, () => {
    const actual: KeyboardEvent = createKeyboardEvent('keydown', KEYS.ENTER);
    actual.preventDefault();
    expect(actual.defaultPrevented).toEqual(true);
  });

});
