// 16 empty lines ~ 70 lines of js code

// creating class names for lightner
const TRAFFICLIGHT = "trafficLight";
const TRAFFICLIGHT_CONTAINER = `${TRAFFICLIGHT}__container`;
const TRAFFICLIGHT_ITEM = `${TRAFFICLIGHT}__item`;
const TRAFFICLIGHT_BUTTON = `${TRAFFICLIGHT}__button`;

// tick interval
const INTERVAL = 1000;

class TrafficLight {
  constructor() {
    this.lights = [
      { color: "green", item: undefined },
      { color: "yellow", item: undefined },
      { color: "red", item: undefined }
    ];
    this.isRunning = false;
    this.activeIndex = -1;
    this.timeoutID = null; // here I'll put interval, I'll to it for getting access form different place off code
    this.button = undefined; // here I'll put link to the button in the DOM, I'll to it for getting access form different place off code
  }

  // root method for starting
  init() {
    this.renderHTML();
    this.bindElements();
  }

  renderHTML() {
    const trafficLight = document.createElement("div");
    const container = document.createElement("div");
    const button = document.createElement("button");

    this.button = button;

    trafficLight.className = TRAFFICLIGHT;
    container.className = TRAFFICLIGHT_CONTAINER;
    button.className = TRAFFICLIGHT_BUTTON;

    this.lights.forEach(it => {
      const light = document.createElement("div");
      it.item = light;
      light.className = `${TRAFFICLIGHT_ITEM} ${it.color}`;
      container.appendChild(light);
    });

    this.setButtonText();

    //rendering elemtns in html
    trafficLight.appendChild(container);
    trafficLight.appendChild(button);
    document.body.appendChild(trafficLight);
  }

  bindElements() {
    this.button.addEventListener("click", e => this.handleClick(e));
  }

  setButtonText() {
    this.button.innerText = this.isRunning ? "off" : "on";
  }

  handleClick(e) {
    e.preventDefault();
    if (!this.isRunning) {
      const _this = this;

      // https://learn.javascript.ru/settimeout-setinterval#rekursivnyy-settimeout
      this.timeoutID = setTimeout(
        (function foo() {
          _this.start();
          _this.timeoutID = setTimeout(foo, INTERVAL);
        })()
      );

      this.isRunning = true;
    } else {
      clearTimeout(this.timeoutID);
      this.isRunning = false;
    }
    this.setButtonText();
  }

  start() {
    this.activeIndex > -1 && this.lights[this.activeIndex].item.classList.remove("active");
    this.activeIndex = this.activeIndex == 2 ? 0 : this.activeIndex + 1;
    this.lights[this.activeIndex].item.classList.add("active");
  }
}

// create Traffic Light
const trafficLight = new TrafficLight();

// start code after page will load
window.onload = trafficLight.init();
