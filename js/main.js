(function(){
  var chooseHotel = document.getElementById('choose-hotel');
  var hotelsFilters = document.getElementById('hotels-filters');

  if(chooseHotel) {
    chooseHotel.addEventListener('click', function(event) {
      target = event.target;

      if(target.classList.contains('btn-toggle')) {
        event.preventDefault();

        popup = chooseHotel.querySelector('.choose-hotel-popup');
        popup.classList.toggle('popup-show');
        popup.classList.toggle('popup-hide');

        if(!popup.classList.contains('hidden')) {
          popup.querySelector('input').focus();
        }
        return;
      }

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

      if(target.classList.contains('icon-calendar')) {
        setDate(target.parentNode);
        return;
      }
    });

    window.addEventListener('keydown', function(event) {
      target = event.target;

      if(event.keyCode === 27) {
        popup = chooseHotel.querySelector('.choose-hotel-popup');

        if(!popup.classList.contains('hidden')) {
          popup.classList.add('hidden');
        }
        return;
      }
    });

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


  if(hotelsFilters) {

  }


  function clearErrorState() {
    this.classList.remove('input-error');
    this.oninput = null;
  }


  function normalizeCounter(counter) {
    var input = counter.querySelector('input');

    if(isCounterValid(input.value)) return;

    if(input.classList.contains('input-error')) {
      (clearErrorState.bind(input))();
    }

    input.value = 0;
    counter.querySelector('.icon-minus').disabled = true;
  }

  function incCounter(counter) {
    var input = counter.querySelector('input');
    if(+input.value === 0) {
      counter.querySelector('.icon-minus').disabled = false;
    }
    input.value = +input.value + 1;
  }

  function decCounter(counter) {
    var input = counter.querySelector('input');
    if(+input.value === 0) return;
    if(+input.value === 1) {
      counter.querySelector('.icon-minus').disabled = true;
    }
    input.value = +input.value - 1;
  }


  function setDate(elem) {
    // ToDo: добавить модуль установки даты
    alert('Заглушка для модуля установки даты');
    return true;
  }


  function isCounterValid(value) {
    return !isNaN(+value) && (value !== '') && (+value >= 0);
  }

  function isDateValid(value) {
    return (value !== ''); //ToDo: добавить полезную логику проверки
  }

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
