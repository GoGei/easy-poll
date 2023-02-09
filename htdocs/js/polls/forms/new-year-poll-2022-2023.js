$(document).ready(function () {
    function trip() {
        let $field = $('#id_trip');
        clearField($field);
        let data = getJsonData();

        let trip = data['trip'];
        if (!trip) {
            return
        }

        if (trip.length < 20) {
            setComment($field, 'Что-то слишком мало написано');
        } else if (trip.length > 80) {
            setComment($field, 'Нормально ты написала. Оставляй');
        }
    }

    function greeted() {
        handleYesNoChoice(
            $('#id_greeted'),
            'greeted',
            'Ты чё?! Сейчас билет назад куплю!',
            'Конечно, я готовился!',
        );
    }

    function goForWalkAndSleep() {
        let $mailField = $('#id_want_sleep');
        clearField($('#id_go_to_walk_after_meet'));
        clearField($mailField);
        let data = getJsonData();

        let want_sleep = data['want_sleep'];
        let go_to_walk_after_meet = data['go_to_walk_after_meet'];
        if (want_sleep === 'True' && go_to_walk_after_meet === 'True') {
            setComment(getThisElem($(this), $mailField), 'Ну и на кой чёрт надо было переться гулять?');
        } else if (want_sleep === 'True' && go_to_walk_after_meet === 'False') {
            setComment(getThisElem($(this), $mailField), 'Это было правильное решение');
        } else if (want_sleep === 'False' && go_to_walk_after_meet === 'True') {
            setComment(getThisElem($(this), $mailField), 'Интересно откуда в тебе было столько энергии');
        } else if (want_sleep === 'False' && go_to_walk_after_meet === 'False') {
            setComment(getThisElem($(this), $mailField), 'Интересно почему не пошли гулять... Возможно были в маке?');
        }
    }

    function isCoffeeGood() {
        handleYesNoChoice(
            $('#id_is_coffee_good'),
            'is_coffee_good',
            'Ну кофе ладно - я старался',
            'Мне приятно, я старался',
        );
    }

    function isFedWellAndCoffeeGood() {
        let $mainField = $('#is_coffee_good');
        clearField($('#id_is_fed_well'));
        clearField($mainField);
        let data = getJsonData();

        let is_coffee_good = data['is_coffee_good'];
        let is_fed_well = data['is_fed_well'];
        if (is_coffee_good === 'False' && is_fed_well === 'False') {
            setComment(getThisElem($(this), $mainField), 'Я прощу кофе, но вот неуважение еды - никогда!');
        } else if (is_fed_well === 'False') {
            setComment(getThisElem($(this), $mainField), 'А вот тут я выдаю бан! До свидания');
        } else if (is_fed_well === 'True') {
            setComment(getThisElem($(this), $mainField), 'Отлично, мне нравится, что тебе нравится как я готовлю');
        }
    }

    function flowers() {
        handleYesNoChoice(
            $('#id_flowers'),
            'flowers',
            'Ещё бы ей не понравилось!',
            'Я иду их выкидывать!',
        );
    }

    function chooseShoes() {
        handleYesNoChoice(
            $('#id_choose_shoes'),
            'choose_shoes',
            'Продолжаем поиски',
            'Надеюсь она комфортная',
        );
    }

    function wasDateAndComment() {
        let $mainField = $('#id_date_comment');
        clearField($('#id_was_date'));
        clearField($mainField);
        let data = getJsonData();

        let was_date = data['was_date'];
        let date_comment = data['date_comment'];
        if (was_date === 'False' && date_comment.length) {
            setComment(getThisElem($(this), $mainField), 'Если свидания не было, то что ты тут забыла?');
        } else if (was_date === 'True' && !date_comment.length) {
            setComment(getThisElem($(this), $mainField), 'Если свидание было, то оставь ты комментарий!');
        }
    }

    function giftFound() {
        let $field = $('#id_gift_found');
        clearField($field);
        let data = getJsonData();

        let gift_found = data['gift_found'];
        let now = new Date();
        let target = new Date(2023, 0, 1);

        if (gift_found) {
            if (gift_found === 'True' && (now < target)) {
                setComment($field, 'Да ладно! Как ты его нашла?');
            } else if (gift_found === 'True' && (now >= target)) {
                setComment($field, 'Я надеюсь тебе понравилось');
            } else if (now < target) {
                setComment($field, 'Конечно, жди 1ого января!');
            } else if (now >= target) {
                setComment($field, 'Уже 1ое января прошло! Можно спросить за свой подарок');
            }
        }
    }

    function init() {
        trip();
        greeted();
        goForWalkAndSleep();
        isCoffeeGood();
        isFedWellAndCoffeeGood();
        flowers();
        chooseShoes();
        wasDateAndComment();
        giftFound();
    }

    init();

    $('#id_trip').on('focusout click', trip);
    $('#id_greeted').on('focusout click', greeted);
    $('#id_go_to_walk_after_meet,#id_want_sleep').on('focusout click', goForWalkAndSleep);
    $('#id_is_coffee_good').on('focusout click', isCoffeeGood);
    $('#id_is_fed_well,#is_coffee_good').on('focusout click', isFedWellAndCoffeeGood);
    $('#id_flowers').on('focusout click', flowers);
    $('#id_choose_shoes').on('focusout click', chooseShoes);
    $('#id_was_date,#id_date_comment').on('focusout keyup', wasDateAndComment);
    $('#id_gift_found').on('focusout click', giftFound);
});