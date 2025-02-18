import {
  A,
  B,
  BACKSPACE,
  C,
  COMMA,
  D,
  DELETE,
  DOWN_ARROW,
  E,
  EIGHT,
  END,
  ENTER,
  ESCAPE,
  F,
  FIVE,
  FOUR,
  G,
  H,
  HOME,
  I,
  J,
  K,
  KEYS,
  L,
  LEFT_ARROW,
  M,
  N,
  NINE,
  O,
  ONE,
  P,
  PAGE_DOWN,
  PAGE_UP,
  Q,
  R,
  RIGHT_ARROW,
  S,
  SEVEN,
  SIX,
  SPACE,
  T,
  TAB,
  THREE,
  TWO,
  U,
  UP_ARROW,
  V,
  W,
  X,
  Y,
  Z,
  ZERO,
} from './keycodes.const';


describe(`keycodes`, function() {
  const codes: number[] = [
    BACKSPACE,
    TAB,
    ENTER,
    ESCAPE,
    SPACE,
    PAGE_UP,
    PAGE_DOWN,
    END,
    HOME,
    LEFT_ARROW,
    UP_ARROW,
    RIGHT_ARROW,
    DOWN_ARROW,
    DELETE,
    ZERO,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z,
    COMMA,
  ];


  test(`should all be valid numbers`, () => {
    for (const code in codes) {
      if (codes[code]) {
        expect(codes[code]).toEqual(expect.any(Number));
      }
    }
  });


  test('should all be valid strings', () => {
    Object.keys(KEYS).forEach(k => {
      const value = KEYS[k];
      expect(value.code).toEqual(expect.any(String));
      expect(value.keyCode).toEqual(expect.any(Number));
    });
  });

});
