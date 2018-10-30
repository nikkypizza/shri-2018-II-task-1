const INPUT_JSON = {
  "events": [{
    "type": `info`,
    "title": `Еженедельный отчет по расходам ресурсов`,
    "source": `Сенсоры потребления`,
    "time": `19:00, Сегодня`,
    "description": `Так держать! За последнюю неделю вы потратили на 10% меньше ресурсов, чем неделей ранее.`,
    "icon": `stats`,
    "data": {
      "type": `graph`,
      "values": [{
        "electricity": [
          [`1536883200`, 115],
          [`1536969600`, 117],
          [`1537056000`, 117.2],
          [`1537142400`, 118],
          [`1537228800`, 120],
          [`1537315200`, 123],
          [`1537401600`, 129]
        ]
      },
      {
        "water": [
          [`1536883200`, 40],
          [`1536969600`, 40.2],
          [`1537056000`, 40.5],
          [`1537142400`, 41],
          [`1537228800`, 41.4],
          [`1537315200`, 41.9],
          [`1537401600`, 42.6]
        ]
      },
      {
        "gas": [
          [`1536883200`, 13],
          [`1536969600`, 13.2],
          [`1537056000`, 13.5],
          [`1537142400`, 13.7],
          [`1537228800`, 14],
          [`1537315200`, 14.2],
          [`1537401600`, 14.5]
        ]
      }
      ]
    },
    "size": `l`
  },
  {
    "type": `info`,
    "title": `Дверь открыта`,
    "source": `Сенсор входной двери`,
    "time": `18:50, Сегодня`,
    "description": null,
    "icon": `key`,
    "size": `s`
  },
  {
    "type": `info`,
    "title": `Уборка закончена`,
    "source": `Пылесос`,
    "time": `18:45, Сегодня`,
    "description": null,
    "icon": `robot-cleaner`,
    "size": `s`
  },
  {
    "type": `info`,
    "title": `Новый пользователь`,
    "source": `Роутер`,
    "time": `18:45, Сегодня`,
    "description": null,
    "icon": `router`,
    "size": `s`
  },
  {
    "type": `info`,
    "title": `Изменен климатический режим`,
    "source": `Сенсор микроклимата`,
    "time": `18:30, Сегодня`,
    "description": `Установлен климатический режим «Фиджи»`,
    "icon": `thermal`,
    "size": `m`,
    "data": {
      "temperature": 24,
      "humidity": 80
    }
  },
  {
    "type": `critical`,
    "title": `Невозможно включить кондиционер`,
    "source": `Кондиционер`,
    "time": `18:21, Сегодня`,
    "description": `В комнате открыто окно, закройте его и повторите попытку`,
    "icon": `ac`,
    "size": `m`
  },
  {
    "type": `info`,
    "title": `Музыка включена`,
    "source": `Яндекс.Станция`,
    "time": `18:16, Сегодня`,
    "description": `Сейчас проигрывается:`,
    "icon": `music`,
    "size": `m`,
    "data": {
      "albumcover": `https://avatars.yandex.net/get-music-content/193823/1820a43e.a.5517056-1/m1000x1000`,
      "artist": `Florence & The Machine`,
      "track": {
        "name": `Big God`,
        "length": `4:31`
      },
      "volume": 80
    }
  },
  {
    "type": `info`,
    "title": `Заканчивается молоко`,
    "source": `Холодильник`,
    "time": `17:23, Сегодня`,
    "description": `Кажется, в холодильнике заканчивается молоко. Вы хотите добавить его в список покупок?`,
    "icon": `fridge`,
    "size": `m`,
    "data": {
      "buttons": [`Да`, `Нет`]
    }
  },
  {
    "type": `info`,
    "title": `Зарядка завершена`,
    "source": `Оконный сенсор`,
    "time": `16:22, Сегодня`,
    "description": `Ура! Устройство «Оконный сенсор» снова в строю!`,
    "icon": `battery`,
    "size": `s`
  },
  {
    "type": `critical`,
    "title": `Пылесос застрял`,
    "source": `Сенсор движения`,
    "time": `16:20, Сегодня`,
    "description": `Робопылесос не смог сменить свое местоположение в течение последних 3 минут. Похоже, ему нужна помощь.`,
    "icon": `cam`,
    "data": {
      "image": `get_it_from_mocks_:3.jpg`
    },
    "size": `l`
  },
  {
    "type": `info`,
    "title": `Вода вскипела`,
    "source": `Чайник`,
    "time": `16:17, Сегодня`,
    "description": null,
    "icon": `kettle`,
    "size": `s`
  }
  ]
};

const INPUT_DATA = JSON.parse(JSON.stringify(INPUT_JSON));

const renderCards = (input: Array<object>) => {
  interface critColors {
    readonly TEXT: string
    readonly BACKGROUND: string
  }
  const criticalColors: critColors = {
    TEXT: `#ffffff`,
    BACKGROUND: `#db5341`
  };

  const eventsListNode = <HTMLUListElement>document.querySelector(`.events__list`);
  const cardTemplateNode = <HTMLTemplateElement>document.querySelector(`.card-template`);
  const cardNode = <HTMLLIElement>cardTemplateNode.content.querySelector(`.events__card`);

  const widgetsTemplateNode = <HTMLTemplateElement>document.querySelector(`.widgets-template`);
  const camWidgetNode = <HTMLDivElement>widgetsTemplateNode.content.querySelector(`.widget-cam`);
  const fridgeWidgetNode = <HTMLFormElement>widgetsTemplateNode.content.querySelector(`.widget-fridge`);
  const tempWidgetNode = <HTMLUListElement>widgetsTemplateNode.content.querySelector(`.widget-temperature`);
  const musicWidgetNode = <HTMLDivElement>widgetsTemplateNode.content.querySelector(`.widget-music`);
  const statsImgNode = <HTMLImageElement>widgetsTemplateNode.content.querySelector(`.events__card-image`);

  const fragment = document.createDocumentFragment();

  interface dataElement {
    readonly type: string
    readonly title: string
    readonly source: string
    readonly time: string
    readonly description: string
    readonly icon: string
    readonly data?: any
    readonly size: string
  };

  for (let el of input) {
    const element = <dataElement>el;
    const currentElement = <HTMLLIElement>cardNode.cloneNode(true);

    currentElement.classList.add(`events__card--${element.size}`);
    (currentElement.querySelector(`.events__card-title`) as HTMLHeadingElement).textContent = element.title;
    (currentElement.querySelector(`.events__card-source`) as HTMLSpanElement).textContent = element.source;
    (currentElement.querySelector(`.events__card-time`) as HTMLSpanElement).textContent = element.time;
    // Добавление виджетов
    if (element.data) {
      const cardContentNode = <HTMLDivElement>currentElement.querySelector(`.events__card-content`);

      switch (element.icon) {
        case `cam`:
          cardContentNode.appendChild(camWidgetNode.cloneNode(true));
          break;
        case `stats`:
          cardContentNode.appendChild(statsImgNode.cloneNode(true));
          break;
        case `fridge`:
          cardContentNode.appendChild(fridgeWidgetNode.cloneNode(true));
          break;
        case `thermal`:
          cardContentNode.appendChild(tempWidgetNode.cloneNode(true));
          (currentElement.querySelector(`.widget-temperature-value--temp`) as HTMLSpanElement).textContent = `${element.data.temperature} C`;
          (currentElement.querySelector(`.widget-temperature-value--humidity`) as HTMLSpanElement).textContent = `${element.data.humidity} %`;
          break;
        case `music`:
          cardContentNode.appendChild(musicWidgetNode.cloneNode(true));
          (currentElement.querySelector(`.widget-music__album-cover`) as HTMLImageElement).src = element.data.albumcover;
          (currentElement.querySelector(`.widget-music__artist-name`) as HTMLSpanElement).textContent = `${element.data.artist} - ${element.data.track.name}`;
          (currentElement.querySelector(`.widget-music__song-length`) as HTMLSpanElement).textContent = element.data.track.length;
          (currentElement.querySelector(`.widget-music__volume-input`) as HTMLInputElement).value = element.data.volume;
          (currentElement.querySelector(`.widget-music__volume-output`) as HTMLOutputElement).textContent = `${element.data.volume}%`;
          break;
      }
    }

    if (!element.description) {
      (currentElement.querySelector(`.events__card-content`) as HTMLDivElement).classList.add(`display-none`);
    } else {
      (currentElement.querySelector(`.events__card-description`) as HTMLParagraphElement).textContent = element.description;
      currentElement.style.paddingBottom = `0`;
    }

    // Добавление критического состояния
    switch (element.type) {
      case `critical`:
        currentElement.style.backgroundColor = criticalColors.BACKGROUND;
        currentElement.style.color = criticalColors.TEXT;
        (currentElement.querySelector(`.events__card-icon`) as HTMLImageElement).src = `img/svg/icon-${element.icon}-critical.svg`;
        (currentElement.querySelector(`.events__card-subheader`) as HTMLDivElement).style.marginBottom = `16px`;
        (currentElement.querySelector(`.events__card-content`) as HTMLDivElement).style.padding = `18px 5% 1px 5%`;
        (currentElement.querySelector(`.events__card-title`) as HTMLHeadingElement).classList.add(`events__card-title--critical`);
        (currentElement.querySelector(`.events__card-btn--close`) as HTMLButtonElement).style.backgroundImage = `url('img/svg/icon-cross-critical.svg')`;
        break;
      default:
        (currentElement.querySelector(`.events__card-icon`) as HTMLImageElement).src = `img/svg/icon-${element.icon}.svg`;
        break;
    }

    fragment.appendChild(currentElement);
  };
  eventsListNode.appendChild(fragment);
};

renderCards(INPUT_DATA.events);
