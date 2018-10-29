(function () {
    var INPUT_JSON = {
        "events": [{
                "type": "info",
                "title": "\u0415\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0447\u0435\u0442 \u043F\u043E \u0440\u0430\u0441\u0445\u043E\u0434\u0430\u043C \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u0432",
                "source": "\u0421\u0435\u043D\u0441\u043E\u0440\u044B \u043F\u043E\u0442\u0440\u0435\u0431\u043B\u0435\u043D\u0438\u044F",
                "time": "19:00, \u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                "description": "\u0422\u0430\u043A \u0434\u0435\u0440\u0436\u0430\u0442\u044C! \u0417\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044E\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u0432\u044B \u043F\u043E\u0442\u0440\u0430\u0442\u0438\u043B\u0438 \u043D\u0430 10% \u043C\u0435\u043D\u044C\u0448\u0435 \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u0432, \u0447\u0435\u043C \u043D\u0435\u0434\u0435\u043B\u0435\u0439 \u0440\u0430\u043D\u0435\u0435.",
                "icon": "stats",
                "data": {
                    "type": "graph",
                    "values": [{
                            "electricity": [
                                ["1536883200", 115],
                                ["1536969600", 117],
                                ["1537056000", 117.2],
                                ["1537142400", 118],
                                ["1537228800", 120],
                                ["1537315200", 123],
                                ["1537401600", 129]
                            ]
                        },
                        {
                            "water": [
                                ["1536883200", 40],
                                ["1536969600", 40.2],
                                ["1537056000", 40.5],
                                ["1537142400", 41],
                                ["1537228800", 41.4],
                                ["1537315200", 41.9],
                                ["1537401600", 42.6]
                            ]
                        },
                        {
                            "gas": [
                                ["1536883200", 13],
                                ["1536969600", 13.2],
                                ["1537056000", 13.5],
                                ["1537142400", 13.7],
                                ["1537228800", 14],
                                ["1537315200", 14.2],
                                ["1537401600", 14.5]
                            ]
                        }
                    ]
                },
                "size": "l"
            },
            {
                "type": "info",
                "title": "\u0414\u0432\u0435\u0440\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u0430",
                "source": "\u0421\u0435\u043D\u0441\u043E\u0440 \u0432\u0445\u043E\u0434\u043D\u043E\u0439 \u0434\u0432\u0435\u0440\u0438",
                "time": "18:50, \u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                "description": null,
                "icon": "key",
                "size": "s"
            },
            {
                "type": "info",
                "title": "\u0423\u0431\u043E\u0440\u043A\u0430 \u0437\u0430\u043A\u043E\u043D\u0447\u0435\u043D\u0430",
                "source": "\u041F\u044B\u043B\u0435\u0441\u043E\u0441",
                "time": "18:45, \u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                "description": null,
                "icon": "robot-cleaner",
                "size": "s"
            },
            {
                "type": "info",
                "title": "\u041D\u043E\u0432\u044B\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
                "source": "\u0420\u043E\u0443\u0442\u0435\u0440",
                "time": "18:45, \u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                "description": null,
                "icon": "router",
                "size": "s"
            },
            {
                "type": "info",
                "title": "\u0418\u0437\u043C\u0435\u043D\u0435\u043D \u043A\u043B\u0438\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0440\u0435\u0436\u0438\u043C",
                "source": "\u0421\u0435\u043D\u0441\u043E\u0440 \u043C\u0438\u043A\u0440\u043E\u043A\u043B\u0438\u043C\u0430\u0442\u0430",
                "time": "18:30, \u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                "description": "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \u043A\u043B\u0438\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0440\u0435\u0436\u0438\u043C \u00AB\u0424\u0438\u0434\u0436\u0438\u00BB",
                "icon": "thermal",
                "size": "m",
                "data": {
                    "temperature": 24,
                    "humidity": 80
                }
            },
            {
                "type": "critical",
                "title": "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043A\u043E\u043D\u0434\u0438\u0446\u0438\u043E\u043D\u0435\u0440",
                "source": "\u041A\u043E\u043D\u0434\u0438\u0446\u0438\u043E\u043D\u0435\u0440",
                "time": "18:21, \u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                "description": "\u0412 \u043A\u043E\u043C\u043D\u0430\u0442\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u043E \u043E\u043A\u043D\u043E, \u0437\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u0435\u0433\u043E \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443",
                "icon": "ac",
                "size": "m"
            },
            {
                "type": "info",
                "title": "\u041C\u0443\u0437\u044B\u043A\u0430 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0430",
                "source": "\u042F\u043D\u0434\u0435\u043A\u0441.\u0421\u0442\u0430\u043D\u0446\u0438\u044F",
                "time": "18:16, \u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                "description": "\u0421\u0435\u0439\u0447\u0430\u0441 \u043F\u0440\u043E\u0438\u0433\u0440\u044B\u0432\u0430\u0435\u0442\u0441\u044F:",
                "icon": "music",
                "size": "m",
                "data": {
                    "albumcover": "https://avatars.yandex.net/get-music-content/193823/1820a43e.a.5517056-1/m1000x1000",
                    "artist": "Florence & The Machine",
                    "track": {
                        "name": "Big God",
                        "length": "4:31"
                    },
                    "volume": 80
                }
            },
            {
                "type": "info",
                "title": "\u0417\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043C\u043E\u043B\u043E\u043A\u043E",
                "source": "\u0425\u043E\u043B\u043E\u0434\u0438\u043B\u044C\u043D\u0438\u043A",
                "time": "17:23, \u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                "description": "\u041A\u0430\u0436\u0435\u0442\u0441\u044F, \u0432 \u0445\u043E\u043B\u043E\u0434\u0438\u043B\u044C\u043D\u0438\u043A\u0435 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043C\u043E\u043B\u043E\u043A\u043E. \u0412\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0435\u0433\u043E \u0432 \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u043A\u0443\u043F\u043E\u043A?",
                "icon": "fridge",
                "size": "m",
                "data": {
                    "buttons": ["\u0414\u0430", "\u041D\u0435\u0442"]
                }
            },
            {
                "type": "info",
                "title": "\u0417\u0430\u0440\u044F\u0434\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430",
                "source": "\u041E\u043A\u043E\u043D\u043D\u044B\u0439 \u0441\u0435\u043D\u0441\u043E\u0440",
                "time": "16:22, \u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                "description": "\u0423\u0440\u0430! \u0423\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E \u00AB\u041E\u043A\u043E\u043D\u043D\u044B\u0439 \u0441\u0435\u043D\u0441\u043E\u0440\u00BB \u0441\u043D\u043E\u0432\u0430 \u0432 \u0441\u0442\u0440\u043E\u044E!",
                "icon": "battery",
                "size": "s"
            },
            {
                "type": "critical",
                "title": "\u041F\u044B\u043B\u0435\u0441\u043E\u0441 \u0437\u0430\u0441\u0442\u0440\u044F\u043B",
                "source": "\u0421\u0435\u043D\u0441\u043E\u0440 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F",
                "time": "16:20, \u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                "description": "\u0420\u043E\u0431\u043E\u043F\u044B\u043B\u0435\u0441\u043E\u0441 \u043D\u0435 \u0441\u043C\u043E\u0433 \u0441\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u0432\u043E\u0435 \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0445 3 \u043C\u0438\u043D\u0443\u0442. \u041F\u043E\u0445\u043E\u0436\u0435, \u0435\u043C\u0443 \u043D\u0443\u0436\u043D\u0430 \u043F\u043E\u043C\u043E\u0449\u044C.",
                "icon": "cam",
                "data": {
                    "image": "get_it_from_mocks_:3.jpg"
                },
                "size": "l"
            },
            {
                "type": "info",
                "title": "\u0412\u043E\u0434\u0430 \u0432\u0441\u043A\u0438\u043F\u0435\u043B\u0430",
                "source": "\u0427\u0430\u0439\u043D\u0438\u043A",
                "time": "16:17, \u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                "description": null,
                "icon": "kettle",
                "size": "s"
            }
        ]
    };
    var INPUT_DATA = JSON.parse(JSON.stringify(INPUT_JSON));
    var renderCards = function (input) {
        var criticalColors = {
            TEXT: "#ffffff",
            BACKGROUND: "#db5341"
        };
        var eventsListNode = document.querySelector(".events__list");
        var cardNode = document.querySelector(".card-template").content.querySelector(".events__card");
        var widgetsTemplateNode = document.querySelector(".widgets-template");
        var camWidgetNode = widgetsTemplateNode.content.querySelector(".widget-cam");
        var fridgeWidgetNode = widgetsTemplateNode.content.querySelector(".widget-fridge");
        var tempWidgetNode = widgetsTemplateNode.content.querySelector(".widget-temperature");
        var musicWidgetNode = widgetsTemplateNode.content.querySelector(".widget-music");
        var statsImgNode = widgetsTemplateNode.content.querySelector(".events__card-image");
        var fragment = document.createDocumentFragment();
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var el = input_1[_i];
            var currentElement = cardNode.cloneNode(true);
            currentElement.classList.add("events__card--" + el.size);
            currentElement.querySelector(".events__card-title").textContent = el.title;
            currentElement.querySelector(".events__card-source").textContent = el.source;
            currentElement.querySelector(".events__card-time").textContent = el.time;
            // Добавление виджетов
            if (el.data) {
                var cardContentNode = currentElement.querySelector(".events__card-content");
                switch (el.icon) {
                    case "cam":
                        cardContentNode.appendChild(camWidgetNode.cloneNode(true));
                        break;
                    case "stats":
                        cardContentNode.appendChild(statsImgNode.cloneNode(true));
                        break;
                    case "fridge":
                        cardContentNode.appendChild(fridgeWidgetNode.cloneNode(true));
                        break;
                    case "thermal":
                        cardContentNode.appendChild(tempWidgetNode.cloneNode(true));
                        currentElement.querySelector(".widget-temperature-value--temp").textContent = el.data.temperature + " C";
                        currentElement.querySelector(".widget-temperature-value--humidity").textContent = el.data.humidity + " %";
                        break;
                    case "music":
                        cardContentNode.appendChild(musicWidgetNode.cloneNode(true));
                        currentElement.querySelector(".widget-music__album-cover").src = el.data.albumcover;
                        currentElement.querySelector(".widget-music__artist-name").textContent = el.data.artist + " - " + el.data.track.name;
                        currentElement.querySelector(".widget-music__song-length").textContent = el.data.track.length;
                        currentElement.querySelector(".widget-music__volume-input").value = el.data.volume;
                        currentElement.querySelector(".widget-music__volume-output").textContent = el.data.volume + "%";
                        break;
                }
            }
            if (!el.description) {
                currentElement.querySelector(".events__card-content").classList.add("display-none");
            }
            else {
                currentElement.querySelector(".events__card-description").textContent = el.description;
                currentElement.style.paddingBottom = 0;
            }
            // Добавление критического состояния
            switch (el.type) {
                case "critical":
                    currentElement.style.backgroundColor = criticalColors.BACKGROUND;
                    currentElement.style.color = criticalColors.TEXT;
                    currentElement.querySelector(".events__card-icon").src = "img/svg/icon-" + el.icon + "-critical.svg";
                    currentElement.querySelector(".events__card-subheader").style.marginBottom = "16px";
                    currentElement.querySelector(".events__card-content").style.padding = "18px 5% 1px 5%";
                    currentElement.querySelector(".events__card-title").classList.add("events__card-title--critical");
                    currentElement.querySelector(".events__card-btn--close").style.backgroundImage = "url('img/svg/icon-cross-critical.svg')";
                    break;
                default:
                    currentElement.querySelector(".events__card-icon").src = "img/svg/icon-" + el.icon + ".svg";
                    break;
            }
            fragment.appendChild(currentElement);
        }
        eventsListNode.appendChild(fragment);
    };
    renderCards(INPUT_DATA.events);
})();
