(function(){
    var chooseHotel = document.getElementById('choose-hotel');

    var counters = chooseHotel.querySelectorAll('.counter');

    for(var i = 0, len= counters.length; i < len; i++) {
        val = +counters[i].querySelector('.input-counter').value;
        if(val === 0) {
            counters[i].querySelector('.btn-counter.icon-minus')
                .classList.add('btn-counter-disabled');
        }
    }

    chooseHotel.addEventListener('click', function(event) {
        target = event.target;

        if(target.classList.contains('btn-toggle')) {
            event.preventDefault();
            chooseHotel.querySelector('.choose-hotel-popup')
                .classList.toggle('hidden');
        }

        if(target.classList.contains('icon-minus')) {
            decNum(target.parentNode);
            return;
        }

        if(target.classList.contains('icon-plus')) {
            incNum(target.parentNode);
            return;
        }
    });

    function incNum(counter) {
        var input = counter.querySelector('.input-counter');
        if(+input.value === 0) {
            counter.querySelector('.btn-counter.icon-minus')
                .classList.remove('btn-counter-disabled');
        }
        input.value = +input.value + 1;
    }

    function decNum(counter) {
        var input = counter.querySelector('.input-counter');
        if(+input.value === 0) return;
        if(+input.value === 1) {
            counter.querySelector('.btn-counter.icon-minus')
                .classList.add('btn-counter-disabled');
        }
        input.value = +input.value - 1;
    }
})();