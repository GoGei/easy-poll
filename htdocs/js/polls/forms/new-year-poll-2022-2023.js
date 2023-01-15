$(document).ready(function () {
    $('#id_trip').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let trip = data['trip'];
        if (!trip) {
            return
        }

        if (trip.length < 20) {
            setComment($(this), 'Что-то слишком мало написано');
        } else if (trip.length > 80) {
            setComment($(this), 'Нормально ты написала. Оставляй');
        }
    });

    $('#id_greeted').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let greeted = data['greeted'];
        if (greeted === 'False') {
            setComment($(this), 'Ты чё?! Сейчас билет назад куплю!');
        } else if (greeted === 'True') {
            setComment($(this), 'Конечно, я готовился!');
        }
    });

    $('#id_go_to_walk_after_meet,#id_want_sleep').on('focusout click', function () {
        clearField($(this));
        clearField($(this));
        let data = getJsonData(this);

        let want_sleep = data['want_sleep'];
        let go_to_walk_after_meet = data['go_to_walk_after_meet'];
        if (want_sleep === 'True' && go_to_walk_after_meet === 'True') {
            setComment($(this), 'Ну и на кой чёрт надо было переться гулять?');
        } else if (want_sleep === 'True' && go_to_walk_after_meet === 'False') {
            setComment($(this), 'Это было правильное решение');
        } else if (want_sleep === 'False' && go_to_walk_after_meet === 'False') {
            setComment($(this), 'Интересно почему не пошли гулять... Возможно были в маке?');
        }
    });


    $('#id_is_coffee_good').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let is_coffee_good = data['is_coffee_good'];
        if (is_coffee_good !== 'True') {
            setComment($(this), 'Ну кофе ладно - я старался');
        } else if (is_coffee_good === 'True') {
            setComment($(this), 'Мне приятно, я старался');
        }

    });

    $('#id_is_fed_well,#is_coffee_good').on('focusout click', function () {
        clearField($(this));
        clearField($(this));
        let data = getJsonData(this);

        let is_coffee_good = data['is_coffee_good'];
        let is_fed_well = data['is_fed_well'];
        if (is_coffee_good !== 'True' && is_fed_well !== 'True') {
            setComment($(this), 'Я прощу кофе, но вот неуважение еды - никогда!');
        } else if (is_fed_well !== 'True') {
            setComment($(this), 'А вот тут я выдаю бан! До свидания');
        }
    });

    $('#id_flowers').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let flowers = data['flowers'];
        if (flowers === 'True') {
            setComment($(this), 'Ещё бы ей не понравилось!');
        } else if (flowers === 'False') {
            setComment($(this), 'Я иду их выкидывать!');
        }
    });

    $('#id_choose_shoes').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let choose_shoes = data['choose_shoes'];
        if (choose_shoes === 'True') {
            setComment($(this), 'Надеюсь она комфортная');
        } else if (choose_shoes === 'False') {
            setComment($(this), 'Продолжаем поиски');
        }
    });

    $('#id_date_comment,#date_comment').on('focusout keyup', function () {
        clearField($(this));
        clearField($(this));
        let data = getJsonData(this);

        let was_date = data['was_date'];
        let date_comment = data['date_comment'];
        if (was_date === 'False' && date_comment.length) {
            setComment($(this), 'Если свидания не было, то что ты тут забыла?');
        } else if (was_date === 'True' && !date_comment.length) {
            setComment($(this), 'Если свидание было, то оставь ты комментарий!');
        }
    });

    $('#id_gift_found').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let gift_found = data['gift_found'];
        let now = new Date();
        let target = new Date(2023, 0, 1);

        if (gift_found) {
            if (gift_found === 'True' && (now < target)) {
                setComment($(this), 'Да ладно! Как ты его нашла?');
            } else if (gift_found === 'True' && (now >= target)) {
                setComment($(this), 'Я надеюсь тебе понравилось');
            } else if (now < target) {
                setComment($(this), 'Конечно, жди 1ого января!');
            } else if (now >= target) {
                setComment($(this), 'Уже 1ое января! Можно спросить за свой подарок');
            }
        }

    });
});