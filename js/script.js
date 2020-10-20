"use strict";

//IE HTMLcollection foreach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

;

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }

    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

;
document.querySelectorAll('.interactive-trigger').forEach(function (item) {
  return item.addEventListener('click', function () {
    var target = item.getAttribute('data-target'),
        selector = item.getAttribute('data-sel'),
        toggleClass = item.getAttribute('data-toggleclass'),
        detailsMode = item.getAttribute('data-detailsMode'),
        func = item.getAttribute('data-function');
    if (target == "this") target = item;
    if (target == "parent") target = item.parentNode;
    if (target == "grandparent") target = item.parentNode.parentNode;
    if (!target) target = document;
    if (selector) target.querySelectorAll(selector).forEach(function (item) {
      if (detailsMode && item.classList.contains('details')) {
        if (item.style.maxHeight) item.style.removeProperty('max-height');else item.style.maxHeight = item.scrollHeight + 'px';
      }

      item.classList.toggle(toggleClass);
    });else target.classList.toggle(toggleClass);
    if (func) eval(func)();
  });
});
;
{
  var setCoords = function setCoords(item, parCoords) {
    item.style.setProperty('top', parCoords.bottom - 3 + 'px');
    if (parCoords.left + item.offsetWidth < window.innerWidth) item.style.setProperty('left', parCoords.left + 'px');else item.style.setProperty('right', '0px');
  };

  document.querySelectorAll('.simplepopup').forEach(function (item) {
    var trigger = item.getAttribute('data-trigger');
    var parent = item.parentNode;
    item.remove();
    document.body.appendChild(item);

    if (trigger == 'click') {
      parent.onclick = function (e) {
        e.preventDefault();
        if (item.classList.contains('active')) return item.classList.remove('active');
        setCoords(item, parent.getBoundingClientRect(), parent);
        item.classList.add('active');
      };
    }

    if (trigger == 'hover') {
      parent.onclick = function (e) {
        if (new Date().getTime() - showtime < 50) e.preventDefault();
      };

      var hovP = false,
          hovI = false,
          showtime = 0;

      var hide = function hide() {
        item.classList.remove('active');
        parent.classList.remove('active');
        showtime = 0;
      };

      var show = function show() {
        item.classList.add('active');
        parent.classList.add('active');
        setCoords(item, parent.children[0].getBoundingClientRect(), parent, 500);
        showtime = new Date().getTime();
      };

      var delayhide = function delayhide() {
        return setTimeout(function () {
          return !hovP && !hovI ? hide() : 0;
        }, 0);
      };

      parent.onmouseenter = function () {
        if (window.innerWidth < 1024) return;
        hovP = true;
        if (!item.classList.contains('active')) show();
      };

      parent.onmouseleave = function () {
        if (window.innerWidth < 1024) return;
        hovP = false;
        if (!hovP && !hovI) delayhide();
      };

      item.onmouseenter = function () {
        if (window.innerWidth < 1024) return;
        hovI = true;
        if (!item.classList.contains('active')) show();
      };

      item.onmouseleave = function () {
        if (window.innerWidth < 1024) return;
        hovI = false;
        if (!hovP && !hovI) delayhide();
      };
    }
  });
  window.addEventListener('resize', function () {
    return document.querySelectorAll('.simplepopup').forEach(function (item) {
      item.classList.remove('active');
      item.style.removeProperty('right');
      item.style.removeProperty('left');
      item.style.removeProperty('top');
    });
  });
}
;
var burger = document.querySelector('.burger');

burger.onclick = function (e) {
  if (burger.classList.contains('active')) {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
    bodyScrollLock.disableBodyScroll(document.body);
  } else {
    bodyScrollLock.enableBodyScroll(document.body);
  }
};

{
  var button = document.getElementById('up');
  var prevScroll,
      visible = false;
  button.addEventListener('click', function () {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });
  window.addEventListener('load', function () {
    prevScroll = pageYOffset;
  });
  window.addEventListener('scroll', function () {
    if (!visible && prevScroll || pageYOffset + window.innerHeight >= document.body.scrollHeight - 30) {
      if (pageYOffset < prevScroll && pageYOffset > window.innerHeight || pageYOffset + window.innerHeight >= document.body.scrollHeight - 30) {
        visible = true;
        button.classList.add('visible');
      } else {
        if (pageYOffset != prevScroll) {
          visible = false;
          button.classList.remove('visible');
        }
      }
    } else visible = false;

    prevScroll = pageYOffset;
  });
}
;
document.querySelector('input[type="tel"]').addEventListener('keydown', function (e) {
  if (!e.key.match(/[-+\d\s]/) && e.keyCode != 8 && e.keyCode != 46) e.preventDefault();
});
var mapsrcs = ['https://yandex.ru/map-widget/v1/?um=constructor%3A9ddcb821f14da582f91b2607fdd72ff134b2bf7674f0d2c52fb7d1f0b94a8ad1&amp;source=constructor', 'https://yandex.ru/map-widget/v1/?um=constructor%3A2f527efe1d86add5cd75276da99e08bcddb592e7bc26b4f7ab33cb4959486401&amp;source=constructor'];
var iframe = document.querySelector('iframe');
document.querySelectorAll('.mapswitch').forEach(function (item) {
  return item.onclick = function () {
    if (item.classList.contains('selected')) return;
    document.querySelector('.selected').classList.remove('selected');
    item.classList.add('selected');
    if (iframe.getAttribute('src') == mapsrcs[0]) iframe.setAttribute('src', mapsrcs[1]);else iframe.setAttribute('src', mapsrcs[0]);
  };
});
new Swiper(document.querySelector('.media .swiper-container'), {
  loop: true,
  autoplay: true,
  speed: 600,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 15,
      autoplay: {
        delay: 3000
      }
    },
    420: {
      slidesPerView: 1,
      spaceBetween: 15,
      autoplay: false
    },
    900: {
      slidesPerView: 2,
      autoplay: false
    },
    1400: {
      slidesPerView: 3,
      autoplay: false
    }
  },
  navigation: {
    nextEl: '.media .slidebutton:last-child',
    prevEl: '.media .slidebutton:first-child'
  }
});
objectFitImages();