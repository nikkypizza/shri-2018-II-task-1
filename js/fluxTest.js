import deFlux from './flux/deFlux.js';

// Данные храним в localStorage
let savedData = JSON.parse(localStorage.savedData || null) || {};
const saveBtnDataToStorage = (color, subtitle) => {
  savedData.btnColor = color;
  savedData.subtitle = subtitle;
  localStorage.savedData = JSON.stringify(savedData);
}

class Label extends deFlux.View {
  constructor(emitter, dispatcher) {
    super(emitter, dispatcher);
    this._label = undefined;

    emitter.on(`storeChanged`, (data) => {
      if (data.actionType === `server_sent`) {
        const serverName = data.serverName;
        this.reset({
          label: serverName
        });
      }
    });
  }
}

class Button extends deFlux.View {
  constructor(emitter, dispatcher) {
    super(dispatcher);
    const button = document.querySelector(`.events__card--fluxible`);
    const subtitle = document.querySelector(`.events__card-time--fluxible`);
    const colors = ['crimson', 'khaki', 'pink', 'tomato', 'cyan', 'gold'];

    button.addEventListener(`click`, () => {
      const value = button.style.backgroundColor.valueOf();
      dispatcher.dispatch({
        type: `set_color`,
        name: value
      });
    });

    if (savedData.btnColor) {
      button.style.backgroundColor = savedData.btnColor;
      subtitle.innerHTML = savedData.subtitle;
    }

    emitter.on(`storeChanged`, (data) => {
      if (data.actionType === `set_color`) {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        button.style.backgroundColor = randomColor;
        subtitle.innerHTML = `Wow, I'm ${randomColor} now!`;
        saveBtnDataToStorage(randomColor, subtitle.innerHTML);
      }
    });
  };
}

function reduce(store, action) {
  const newStore = (store, action) => {
    switch (action.type) {
      case `set_color`:
        console.log({ ...store,
          name: action.name
        })
        return {
          ...store,
          name: action.name
        };
      default:
        return store;
    }
  };
  return newStore;
}


class App {
  constructor() {
    this._globalEmitter = new deFlux.EventEmitter();
    this._dispatcher = new deFlux.Dispatcher();
    this._initViews();
    this._initStore();
  }
  _initViews() {
    new Label(this._globalEmitter, this._dispatcher);
    new Button(this._globalEmitter, this._dispatcher);
  }

  _initStore() {
    const defaultStore = {
      name: ``,
      serverName: ``,
      events: []
    };
    this._store = new deFlux.Store(defaultStore, reduce, this._dispatcher, this._globalEmitter);
  }
}

new App();