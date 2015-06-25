(function(){
  var chooseHotel = document.getElementById('choose-hotel');
  var hotelsFilters = document.getElementById('hotels-filters');

  // обработка событий для блока choose-hotel
  if(chooseHotel) {
    // обработка кликов по различным элементам
    chooseHotel.addEventListener('click', function(event) {
      var target = event.target;

      // клик по кнопке показа/скрытия формы
      if(target.classList.contains('btn-toggle')) {
        event.preventDefault();

        popup = chooseHotel.querySelector('.choose-hotel-popup');
        popup.classList.toggle('popup-show');
        popup.classList.toggle('popup-hide');

        if(popup.classList.contains('popup-show')) {
          popup.querySelector('input').focus();
        }
        return;
      }

      // клики по кнопкам [+]/[-] счетчика
      if(target.classList.contains('icon-minus')) {
        normalizeCounter(target.parentNode);
        decCounter(target.parentNode);
        return;
      }

      if(target.classList.contains('icon-plus')) {
        normalizeCounter(target.parentNode);
        incCounter(target.parentNode);
        return;
      }

      // клик по кнопке выбора даты
      if(target.classList.contains('icon-calendar')) {
        setDate(target.parentNode);
        return;
      }
    });

    // обработка глобального нажатия [ESC] для скрытия формы
    window.addEventListener('keydown', function(event) {
      var target = event.target;

      if(event.keyCode === 27) {
        popup = chooseHotel.querySelector('.choose-hotel-popup');

        if(popup.classList.contains('popup-show')) {
          popup.classList.remove('popup-show');
          popup.classList.add('popup-hide');
        }
        return;
      }
    });

    // обработка события отправки формы
    chooseHotel.querySelector('form').addEventListener('submit', function(event) {
      var target = event.target;

      var elems = chooseHotel.querySelectorAll('.input-date, .input-counter');

      for(var i = 0, len= elems.length; i < len; i++) {
        if(isValid(elems[i])) continue;

        event.preventDefault();

        var input = elems[i].querySelector('input');

        input.focus();
        input.classList.add('input-error');
        input.oninput = clearErrorState;

        alert('поле заполнено неверно');
        return;
      }
    });
  }


  // обработка событий для блока hotels-filters
  if(hotelsFilters) {

    var w = 20, // slider width === 20px
      range = hotelsFilters.querySelector('.range'),
      rangeRect = {
        'left': range.getBoundingClientRect().left,
        'right': range.getBoundingClientRect().right,
        'width': range.getBoundingClientRect().width - 2*w
      },
      scale = range.querySelector('.scale'),
      sliderMin = scale.querySelector('.scale-slider-min'),
      sliderMax = scale.querySelector('.scale-slider-max');

    // реализация перемещения ползунков
    scale.addEventListener('mousedown', function(event) {
      var sliderMinRange = {
            'curr': sliderMin.getBoundingClientRect().left,
            'min': rangeRect.left,
            'max': sliderMax.getBoundingClientRect().right - 2*w,
          },
          sliderMaxRange = {
            'curr': sliderMax.getBoundingClientRect().right,
            'min': sliderMin.getBoundingClientRect().left + 2*w,
            'max': rangeRect.right,
          };

      // console.log(event.clientX);
      // console.log(sliderMinRange.curr, sliderMinRange.min, sliderMinRange.max);
      // console.log(sliderMaxRange.curr, sliderMaxRange.min, sliderMaxRange.max);

      if(event.target !== sliderMin && event.target !== sliderMax ) return;

      if (event.target === sliderMin) {
        var dx = event.clientX - sliderMinRange.curr;

        document.onmousemove = function(event) {
          if(event.clientX - dx < sliderMinRange.min) {
            scale.style.left = '0';
            // console.log('min: 0%');
            return;
          }
          if(event.clientX - dx > sliderMinRange.max) {
            scale.style.left = sliderMinRange.max - sliderMinRange.min + 'px';
            // console.log('min:', 100*(sliderMinRange.max - sliderMinRange.min)/rangeRect.width + '%');
            return;
          }

          scale.style.left = event.clientX - dx - sliderMinRange.min + 'px';
          // console.log('min:', 100*(event.clientX - dx - sliderMinRange.min)/rangeRect.width + '%');
        }
      }

      if (event.target === sliderMax) {
        var dx = event.clientX - sliderMaxRange.curr;

        document.onmousemove = function(event) {
          if(event.clientX - dx > sliderMaxRange.max) {
            scale.style.right = '0';
            // console.log('max: 100%');
            return;
          }
          if(event.clientX - dx < sliderMaxRange.min) {
            scale.style.right = sliderMaxRange.max - sliderMaxRange.min + 'px';
            // console.log('max:', 100 - 100*(sliderMaxRange.max - sliderMaxRange.min)/rangeRect.width + '%');
            return;
          }

          scale.style.right = sliderMaxRange.max - event.clientX + dx + 'px';
          // console.log('max:', 100 - 100*(sliderMaxRange.max - event.clientX + dx)/rangeRect.width + '%');
        }
      }


      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      }
    });
  }


  // очистка статуса ошибки для поля ввода
  function clearErrorState() {
    this.classList.remove('input-error');
    this.oninput = null;
  }

  // коррекция ввода для счетчиков
  function normalizeCounter(counter) {
    var input = counter.querySelector('input');

    if(isCounterValid(input.value)) return;

    if(input.classList.contains('input-error')) {
      input.oninput();
    }

    input.value = 0;
  }

  // базовые операции счетчика
  function incCounter(counter) {
    var input = counter.querySelector('input');
    input.value = +input.value + 1;
  }

  function decCounter(counter) {
    var input = counter.querySelector('input');
    if(+input.value <= 0) return;
    input.value = +input.value - 1;
  }

  // базовые операции установки дат
  function setDate(elem) {
    // ToDo: добавить модуль установки даты
    alert('Заглушка для модуля установки даты');
    return true;
  }

  // набор проверок коррекности ввода
  function isCounterValid(value) {
    return !isNaN(+value) && (value !== '') && (+value >= 0);
  }

  function isDateValid(value) {
    return (value !== ''); //ToDo: добавить полезную логику проверки
  }

  // обобщающая функция проверки ввода
  function isValid(elem) {
    var input = elem.querySelector('input');
    console.log(input.type);
    console.log(input.name);
    console.log(input.value);
    console.log(input.validity);

    if(elem.classList.contains('input-counter')) {
      return isCounterValid(input.value);
    }

    if(elem.classList.contains('input-date')) {
      return isDateValid(input.value);
    }
  }
})();
