import { typeInElement } from './type-in-element';


describe(`typeInElement`, function() {
  let nodeMock: HTMLInputElement;

  beforeEach(() => {
    nodeMock = window.document.createElement('input');
    nodeMock.type = 'text';
    nodeMock.dispatchEvent = jest.fn();
  });


  test(`should dispatch an event`, () => {
    typeInElement('foo', nodeMock);
    expect(nodeMock.dispatchEvent).toHaveBeenCalled();
  });

});
