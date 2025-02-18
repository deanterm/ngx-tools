<h1>Utilities</h1>

A collection of useful utilities.

**Import from:** `@terminus/ngx-tools/utilities`


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [`applyMixins`](#applymixins)
- [`arrayContainsObject`](#arraycontainsobject)
- [`compactArray`](#compactarray)
- [`debounce`](#debounce)
- [`defineType` and `defineTypeEnum`](#definetype-and-definetypeenum)
- [`generateUUID`](#generateuuid)
- [`getFormControlValue`](#getformcontrolvalue)
- [`groupBy`](#groupby)
- [`hasRequiredControl`](#hasrequiredcontrol)
- [`httpRetryer`](#httpretryer)
  - [Retry conditions](#retry-conditions)
- [`inputHasChanged`](#inputhaschanged)
- [`isUnset`](#isunset)
- [`NgChangeObjectValueParser`](#ngchangeobjectvalueparser)
- [`noop`](#noop)
- [`object-deep-get`](#object-deep-get)
- [`object-deep-set`](#object-deep-set)
- [`publicShapeOf`](#publicshapeof)
- [`retryWithBackoff`](#retrywithbackoff)
  - [Delay Calculator](#delay-calculator)
- [`returnValuesByKeys`](#returnvaluesbykeys)
- [`roundNumber`](#roundnumber)
- [`setFormControlValue`](#setformcontrolvalue)
- [`toCamelCase`](#tocamelcase)
- [`untilComponentDestroyed`](#untilcomponentdestroyed)
- [`updateControlOnInputChanges`](#updatecontroloninputchanges)
- [`VERSION`](#version)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## `applyMixins`

[[source]](src/apply-mixins/apply-mixins.ts)

A helper function to apply TypeScript mixins to a base class.

```typescript
import { applyMixins } from '@terminus/ngx-tools/utilities';


// Disposable Mixin
class Disposable {
  isDisposed: boolean;
  dispose() {
    this.isDisposed = true;
  }

}

// Activatable Mixin
class Activatable {
  isActive: boolean;
  activate() {
    this.isActive = true;
  }
  deactivate() {
    this.isActive = false;
  }
}

// Base class
class SmartObject implements Disposable, Activatable {
  // Disposable
  isDisposed: boolean = false;
  dispose: () => void;
  // Activatable
  isActive: boolean = false;
  activate: () => void;
  deactivate: () => void;

  interact() {
    this.activate();
  }
}

// Apply the mixins
applyMixins(SmartObject, [Disposable, Activatable]);

// Initialize the base class
const smartObj = new SmartObject();
smartObj.interact();

smartObj.isActive
// Returns: `true`
```


## `arrayContainsObject`

[[source]](src/array-contains-object/array-contains-object.ts)

Check if an object exists in an array.

```typescript
import { arrayContainsObject } from '@terminus/ngx-tools/utilities';

// The object we want to find:
const object = {id: 2};
// The array we are searching:
const arr = [{id: 1}, {id: 2}, {id: 3}];
// A comparator used to determine if two objects are a match:
// (For this example, we are comparing objects by ID)
const comparator = (v) => v.id;

arrayContainsObject(object, array, comparator); // Returns: true
```


## `compactArray`

[[source]](src/compact-array/compact-array.ts)

Remove `undefined` or `null` items from an array:

```typescript
import { compactArray } from '@terminus/ngx-tools/utilities';

const myArray: (string | undefined | null)[] = ['foo', null, 'bar', undefined, 'baz'];

compactArray<string>(myArray);
// Returns: `['foo', 'bar', 'baz']`
// Return Type: `string[]`
```


## `debounce`

[[source]](src/debounce/debounce.ts)

Create a debounced function.

```typescript
import { debounce } from '@terminus/ngx-tools/utilities';

const myFunc = () => {console.log('hi!')};
// Create a function that will debounce all calls within 200ms:
const myDebouncedFunc = debounce(myFunc, 200);

for (const value of [1, 2, 3]) {
  myDebouncedFunc();
}
// 'Hi!' will only be logged to the console once
```

## `defineType` and `defineTypeEnum`

[[source]](src/define-type/define-type.ts)

Ensure action is defined only once in the entirety of the application

`defineType` example:

```typescript
import { defineType } from '@terminus/ngx-tools/utilities';

defineType('[log-in] User log in') as '[log-in] User log in';
```

`defineTypeEnum` example:

```typescript
import { defineTypeEnum } from '@terminus/ngx-tools/utilities';

export enum actionTypes {
  AssignState = '[mock-meta-reducer] Assign State',
};

defineTypeEnum(actionTypes);
```


## `generateUUID`

[[source]](src/generate-uuid/generate-uuid.ts)

Generate a canonically formatted UUID that is Version 1 through 5 and is the appropriate Variant as per RFC4122.

```typescript
import { generateUUID } from '@terminus/ngx-tools/utilities';

generateUUID(); // Returns a UUID such as: `f4ee5eed-ed19-3681-713e-907a23ed7858`
```


## `getFormControlValue`

[[source]](src/get-form-control-value/get-form-control-value.ts)

Helper function to retrieve the current value of a control within a form group:

```typescript
import { FormGroup } from '@angular/forms';
import { getFormControlValue } from '@terminus/ngx-tools/utilities';

// Create a form group
const formBuilder = new FormBuilder();
const myForm = formBuilder.group({
  control1: ['foo'],
  control2: [null],
});

getFormControlValue(myForm, 'control1'); // Returns: `foo`
getFormControlValue(myForm, 'control2'); // Returns: `null`
```


## `groupBy`

[[source]](src/group-by/group-by.ts)

Return an object containing arrays split by property.

```typescript
import { groupBy } from '@terminus/ngx-tools/utilities';

interface MyObj {
  a: string;
  b: number;
}
const myArray: MyObj[] = [
  {a: 'foo', b: 1},
  {a: 'bar', b: 6},
  {a: 'foo', b: 6},
];

groupBy<MyObj, keyof MyObj>(myArray, 'a');
// Returns:
// {
//   foo: [{a: 'foo', b: 1}, {a: 'foo', b: 6}],
//   bar: [{a: 'bar', b: 6}],
// }
```


## `hasRequiredControl`

[[source]](src/has-required-control/has-required-control.ts)

Check if an `AbstractControl` or `FormGroup` has a `required` validator.

```typescript
import { FormControl, FormGroup } from '@angular/forms';
import { hasRequiredControl } from '@terminus/ngx-tools/utilities';

const control = new FormControl(null, [Validators.required];
const group = new FormGroup({myControl: [null, [Validators.required]]});

hasRequiredControl(control); // Returns: true
hasRequiredControl(group);   // Returns: true
```


## `httpRetryer`

[[source]](src/http-retryer/http-retryer.ts)

Helper to retry an Observable stream only when it sees an `HttpError` it recognizes.

Number of retries is configurable, and the first attempt is not counted. A retries value of 3 will result in the first attempt, plus 3
retries for a total of 4 attempts.

```typescript
import { httpRetryer } from '@terminus/ngx-tools/utilities';

return this.http.get('/foo')
  .pipe(
    map((res: MyResponse) => {
      doDomainBusniessLogic(res);
    }),
    // If `get()` fails, the connection will be retried 2 times by default
    httpRetryer({}),
  )
;

return this.http.get('/foo')
  .pipe(
    map((res: MyResponse) => {
      doDomainBusniessLogic(res);
    }),
    httpRetryer({retries: 4}), // specify number of allowed retries
;
```

### Retry conditions

1. HTTP Error code from `500` to `599`
2. HTTP Error Code `429`
  - Respects the `Retry-After` header as a Date string or MS delay.


## `inputHasChanged`

[[source]](src/input-has-changed/input-has-changed.ts)

Helper function to determine if an Angular `@Input` value has changed.

```typescript
import { SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { inputHasChanged } from '@terminus/ngx-tools/utilities';

...
  @Input
  public myInput;

  ngOnChanges(changes: SimpleChanges): void {
    // This will verify that the `myInput` change object exists and the current value
    // is not the same as the previous value
    if (inputHasChanged(changes, 'myInput')) {
      // myInput value has changed.. do something
    }
  }
...
```


## `isUnset`

[[source]](src/is-unset/is-unset.ts)

Helper function to determine if input is unset.

```typescript
import { isUnset } from '@terminus/ngx-tools/utilities';

isUnset(null);      // Returns: true
isUnset(undefined); // Returns: true
isUnset('hello');   // Returns: false
```


## `NgChangeObjectValueParser`

[[source]](src/ngchange-object-value-parser/ngchange-object-value-parser.ts)

A utility class containing helpers for dealing with a `SimpleChanges` object.

```typescript
import { NgChangeObjectValueParser } from '@terminus/ngx-tools/utilities';

const valueParser = new NgChangeObjectValueParser();
valueParser.getOldValue(mySimpleChangesObject, 'myInputName');
```

Available methods:

|               |                                                                         |
|---------------|-------------------------------------------------------------------------|
| `getOldValue` | Get the previous value from an `@Input` within a `SimpleChanges` object |
| `getNewValue` | Get the latest value from an `@Input` within a `SimpleChanges` object   |
| `parsepath`   | Split a string path into a collection of keys                           |


## `noop`

[[source]](src/noop/noop.ts)

Provides a placeholder function.

```typescript
import { noop } from '@terminus/ngx-tools/utilities';

const myFunc = noop;
myFunc(); // Returns: undefined
```


## `object-deep-get`

[[get source]](src/object-deep-get/object-deep-get.ts)

A utility to retrieve deep object values.

```typescript
import { objectDeepGet } from '@terminus/ngx-tools/utilities';

const myObj = {
  foo: {
    bar: {
      baz: true,
    },
  },
};

// Get the value of `baz`
const valueFromObject: boolean = objectDeepGet(myObj, 'foo.bar.baz'); // Returns: true
```


## `object-deep-set`

[[set source]](src/object-deep-set/object-deep-set.ts)

A utility to set deep object values.

```typescript
import { objectDeepSet } from '@terminus/ngx-tools/utilities';

const myObj = {
  foo: {
    bar: {
      baz: true,
    },
  },
};

// Update `baz` to be `false`
const updatedObject = objectDeepSet(myObj, 'foo.bar.baz', false);
// or
const updatedObject = objectDeepSet<boolean, MyObjType>(myObj, 'foo.bar.baz', false);
```


## `publicShapeOf`

[[source]](src/public-shape-of/public-shape-of.ts)

A type that allows the consumer to extend a class with private properties.

```typescript
class Foo {
  foo1(x: string) {}
  private foo2(y: number) {}
}

class Bar implements publicShapeOf<Foo> {
  foo1(x: string) {}
}
```


## `retryWithBackoff`

[[source]](src/retry-with-backoff/retry-with-backoff.ts)

Helper to retry an Observable stream [X] times.

|                                     |                                                 |
|-------------------------------------|-------------------------------------------------|
| `retryWithBackoff`                  | Retry a stream X times with a jittered back-off |
| `exponentialBackoffDelayCalculator` | Create a custom back-off calculator             |

```typescript
import { retryWithBackoff } from '@terminus/ngx-tools/utilities';

return this.myApi.doSomething()
  .pipe(
    map((res: MyResponse) => {
      if (res) {
        return res;
      } else {
        return null;
      }
    }),
    // If `getSomething()` fails, the connection will be retried 3 times
    retryWithBackoff({}), // Using default options
  )
;
```

### Delay Calculator

If custom timing, jitter, etc. is needed, create a custom back-off calculator and pass it to
`retryWithBackoff`.

```typescript
import {
  exponentialBackoffDelayCalculator,
  retryWithBackoff,
} from '@terminus/ngx-tools/utilities';

// Set custom delay options
const calcOpts: DelayCalculator = {
  jitter: true,
  jitterFactor: .3,
  backOffFactor: 2,
  baseWaitTime: 100,
}

// Create a retrier with a custom delay calculator:
retryWithBackoff({retries: 3, delayCalculator: exponentialBackoffDelayCalculator(calcOpts)})
```


## `returnValuesByKeys`

[[source]](src/return-values-by-keys/return-values-by-keys.ts)

Helper function to return an array of desired values from an object.

```typescript
import { returnValuesByKeys } from '@terminus/ngx-tools/utilities';

const tactic1: MyType = {
  id: 1,
  name: 'tactic1',
  goal: 'goal1',
}
const tactic2: MyType = {
  id: 2,
  name: 'tactic2',
  goal: 'goal2',
}
const tactics = { 1: tactic1, 2: tactic2 }

returnValuesByKeys<MyType>([1], tactics) // Returns: `[tactic1]`
```


## `roundNumber`

[[source]](src/round-number/round-number.ts)

A helper function to round a number to a specific number of places.

```typescript
import { roundNumber } from '@terminus/ngx-tools/utilities';

roundNumber(1.050, 1)      // Returns: `1.1`
roundNumber(3456.3456, 1)  // Returns: `3456.3`
roundNumber(3456.3456, -2) // Returns: `3500`
roundNumber('1.23e+5', -4) // Returns: `120000`
```


## `setFormControlValue`

[[source]](src/set-form-control-value/set-form-control-value.ts)

A helper function to set a control value within a form group.

```typescript
import { FormGroup } from '@angular/forms';
import { setFormControlValue } from '@terminus/ngx-tools/utilities';

// Create a form group
const formBuilder = new FormBuilder();
const myForm = formBuilder.group({
  control1: ['foo'],
  control2: [null],
});

setFormControlValue<string>(myForm, 'control1', 'hi');
// The value of `control1` is now 'hi'
```


## `toCamelCase`

[[source]](src/to-camel-case/to-camel-case.ts)

Convert a string to `camelCase`:

```typescript
import { toCamelCase } from '@terminus/ngx-tools/utilities';

toCamelCase('EQUIPMENT_CLASS_NAME')       // Returns: `equipmentClassName`
toCamelCase('equipment class name')       // Returns: `equipmentClassName`
toCamelCase('equipment__class--name')     // Returns: `equipmentClassName`

// Convert to PascalCase by setting the 2nd parameter to `true`:
toCamelCase('EQUIPMENT_CLASS_NAME', true) // Returns: `EquipmentClassName`
```


## `untilComponentDestroyed`

[[source]](src/until-component-destroyed/until-component-destroyed.ts)

A helper `pipe` operator to unsubscribe from Observables when the component `ngOnDestroy` lifecycle
event is fired.

> NOTE: the component **must define the `ngOnDestroy` function.** Angular will only call lifecycle
> events if they exist at compilation time.

```typescript
import { untilComponentDestroyed } from '@terminus/ngx-tools/utilities';

@Component({
  ...
})
class TestHostDoubleComponent implements OnDestroy, OnInit {
  this.myInterval = interval(200).pipe(
    // Pass in the `this` context:
    untilComponentDestroyed(this),
  ).subscribe((v: number) => {
    // This will continue until the component is destroyed
  });

  // This must be present! (even if empty)
  ngOnDestroy() {}
}
```


## `updateControlOnInputChanges`

[[source]](src/update-control-on-input-changes/update-control-on-input-changes.ts)

A helper function to set the value of a form control when an `@Input` has changed.

```typescript
import { SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { updateControlOnInputChanges } from '@terminus/ngx-tools/utilities';

...
  @Input
  public myInput;
  @Input
  public myFormControl;

  ngOnChanges(changes: SimpleChanges) {
    // This will update the form control's value whenever the `@Input` value changes:
    updateControlOnInputChanges(changes, 'myInput', this.myFormControl));
  }
...
```


## `VERSION`

[[source]](src/version/version.ts)

An object containing the current version of the library.

```typescript
import { VERSION } from '@terminus/ngx-tools/utilities';

VERSION.full  // Returns: 1.2.3
VERSION.major // Returns: 1
VERSION.minor // Returns: 2
VERSION.patch // Returns: 3
```



<!-- LINKS -->
[docs-testing]: https://github.com/GetTerminus/ngx-tools/tree/release/ngx-tools/testing/README.md
