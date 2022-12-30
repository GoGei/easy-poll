$(document).ready(function () {
    function getJsonData(elem) {
        $(elem).siblings('.custom-comment').remove();

        let form = $(elem).closest('form');

        return $(form)
            .serializeArray()
            .reduce(function (json, {name, value}) {
                json[name] = value;
                return json;
            }, {})
    }

    $('#id_trip').on('focusout', function () {
        let data = getJsonData(this);

        let trip = data['trip'];
        if (trip && trip.length < 20) {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'Что-то слишком мало написано'
            }).insertAfter($(this));
        }
    });

    $('#id_greeted').on('focusout click', function () {
        let data = getJsonData(this);

        let greeted = data['greeted'];
        if (greeted !== 'True') {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'Ты чё?! Сейчас билет назад куплю!'
            }).insertAfter($(this));
        }
    });

    $('#id_go_to_walk_after_meet').on('focusout click', function () {
        let data = getJsonData(this);

        let want_sleep = data['want_sleep'];
        let go_to_walk_after_meet = data['go_to_walk_after_meet'];
        if (want_sleep === 'True' && go_to_walk_after_meet === 'True') {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'Ну и на кой чёрт надо было переться гулять?'
            }).insertAfter($(this));
        }
    });


    $('#id_is_coffee_good').on('focusout click', function () {
        let data = getJsonData(this);

        let is_coffee_good = data['is_coffee_good'];
        if (is_coffee_good !== 'True') {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'Ну кофе ладно - я старался'
            }).insertAfter($(this));
        }
    });

    $('#id_is_fed_well').on('focusout click', function () {
        let data = getJsonData(this);

        let is_coffee_good = data['is_coffee_good'];
        let is_fed_well = data['is_fed_well'];
        if (is_coffee_good !== 'True' && is_fed_well !== 'True') {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'Я прощу кофе, но вот неуважение еды - никогда!'
            }).insertAfter($(this));
        } else if (is_fed_well !== 'True') {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'А вот тут я выдаю бан! До свидания'
            }).insertAfter($(this));
        }
    });

    $('#id_flowers').on('focusout click', function () {
        let data = getJsonData(this);

        let flowers = data['flowers'];
        if (flowers === 'True') {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'Ещё бы ей не понравилось!'
            }).insertAfter($(this));
        } else if (flowers === 'False') {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'Я иду их выкидывать!'
            }).insertAfter($(this));
        }
    });

    $('#id_choose_shoes').on('focusout click', function () {
        let data = getJsonData(this);

        let choose_shoes = data['choose_shoes'];
        if (choose_shoes === 'True') {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'Надеюсь она комфортная'
            }).insertAfter($(this));
        }
    });

    $('#id_date_comment').on('focusout keyup', function () {
        let data = getJsonData(this);

        let was_date = data['was_date'];
        let date_comment = data['date_comment'];
        if (was_date === 'False' && (date_comment && date_comment.length)) {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'Если свидания не было, то что ты тут забыла?'
            }).insertAfter($(this));
        }
    });

    $('#id_gift_found').on('focusout click', function () {
        let data = getJsonData(this);

        let gift_found = data['gift_found'];
        let now = new Date();
        let target = new Date(2023, 1, 1);
        if (gift_found === 'True' && (now < target)) {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'Да ладно! Как ты его нашла?'
            }).insertAfter($(this));
        } else if (now < target) {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'Конечно, жди 1ого января!'
            }).insertAfter($(this));
        } else if (now >= target) {
            $('<div/>', {
                'class': 'text-right text-info custom-comment',
                'text': 'Уже 1ое января! Можно спросить за свой подарок'
            }).insertAfter($(this));
        }
    });
});