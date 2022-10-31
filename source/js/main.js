import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

const burgerContainer = document.querySelector('.burger');
const burgerBtn = document.querySelector('.burger__button');
const mapContainer = document.querySelector('#map');
const header = document.querySelector('.header__container');
const mainBlock = document.querySelector('.main-block');
const DEFAULT_COORDINATES = [59.938635, 30.323118];
const DEFAULT_ZOOM = 15.5;
const PIN_SIZE = [18, 22];
const PIN_OFSET_SIZE = [-18, -22];

window.addEventListener('DOMContentLoaded', () => {
  if (burgerBtn) {
    initBurger();
  }

  if (mapContainer) {
    initMap();
  }

  if (mainBlock) {
    setHeaderHeight();
  }

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

window.addEventListener('resize', () => setHeaderHeight());

const initBurger = () => {
  burgerContainer.classList.add('burger--close');
  burgerBtn.addEventListener('click', toggleBurger);
};

const toggleBurger = () => {
  burgerContainer.classList.toggle('burger--close');
  burgerContainer.classList.toggle('burger--open');
  document.body.classList.toggle('scroll-lock');
};

const initMap = () => {
  mapContainer.innerHTML = '';
  createMap();
};

const createMap = () => {
  let myMap;
  let myPlacemark;
  ymaps.ready(init);
  function init() {
    myMap = new ymaps.Map(mapContainer, {
      center: DEFAULT_COORDINATES,
      zoom: DEFAULT_ZOOM,
    });

    myPlacemark = new ymaps.Placemark(DEFAULT_COORDINATES, {}, {
      iconLayout: 'default#image',
      iconImageHref: '../img/sprite/pin.svg',
      iconImageSize: PIN_SIZE,
      iconImageOffset: PIN_OFSET_SIZE,
    });

    myMap.geoObjects.add(myPlacemark);
  }
};

const setHeaderHeight = () => {
  let headerHeight = header.offsetHeight;
  mainBlock.style.setProperty('--headerHeight', (headerHeight + 38) + 'px');
  mainBlock.style.setProperty('--padding-top', (headerHeight + 200) + 'px');
};

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
