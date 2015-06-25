(function(){
  var chooseHotel = document.getElementById('choose-hotel');
  var hotelsFilters = document.getElementById('hotels-filters');

  // обработка событий для блока choose-hotel
  if(chooseHotel) {
    chooseHotel.addEventListener('click', function(event) {
      target = event.target;

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
      target = event.target;

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
      target = event.target;

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
