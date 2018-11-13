class EventEmitter {
  constructor() {
    this._listeners = {};
  }

  on(eventName, callback) {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }
    this._listeners[eventName].push(callback);
  }

  trigger(eventName, data) {
    let listeners = this._listeners[eventName];
    listeners.forEach((callback) => {
      callback(data);
    });
  }
}

class Dispatcher {
  constructor() {
    this._callbacks = [];
  }

  register(callback) {
    this._callbacks.push(callback);
  }

  dispatch(action) {
    this._callbacks.forEach((callback) => {
      callback(action);
    });
  }
}

class Store {
  constructor(defaultStore, reducer, dispatcher, emitter) {
    let store = defaultStore;

    dispatcher.register((action) => {

      store = reducer(store, action);

      emitter.trigger('storeChanged', {
        actionType: action.type,
        ...store
      });

    })
  }
}

class View {
  constructor(emitter, dispatcher) {
    this._dispatcher = dispatcher;
    this._emitter = emitter;
  }

  reset(data) {
    this._setData(data);
    this._redraw();
  }
}

const deFlux = {
  EventEmitter,
  Dispatcher,
  Store,
  View
};
export default deFlux;