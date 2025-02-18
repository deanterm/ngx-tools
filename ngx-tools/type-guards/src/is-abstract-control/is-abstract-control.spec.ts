import { FormControl } from '@angular/forms';

import { isAbstractControl } from './is-abstract-control';


describe(`isAbstractControl`, function() {

  test(`should return true for control`, function() {
    expect(isAbstractControl(new FormControl())).toEqual(true);
  });


  test(`should return false for anything else`, function() {
    expect(isAbstractControl(null)).toEqual(false);
    expect(isAbstractControl(() => true)).toEqual(false);
    expect(isAbstractControl('hi')).toEqual(false);
  });

});
