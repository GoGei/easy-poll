$(document).ready(function () {
    $('#id_already_bought_tickets').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);
        let already_bought_tickets = data['already_bought_tickets'];

        if (already_bought_tickets === 'False') {
            setComment($(this), 'Как это ты ещё не купила?');
        } else if (already_bought_tickets === 'True') {
            setComment($(this), 'Отлично, я тебя очень жду');
        }
    });

    $('#id_new_dress_up').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);
        let new_dress_up = data['new_dress_up'];

        if (new_dress_up === 'False') {
            setComment($(this), 'Ничего страшного, я тебя жду в любом');
        } else if (new_dress_up === 'True') {
            setComment($(this), 'Вау, жду твои новые приколяхи, а ты жди мои взгляды');
        }
    });

    $('#id_walking_preference').on('focusout click', function () {
        let data = getJsonData(this);

        let walking_preference = data['walking_preference'] || $(this).val();
        let $comment = $('#id_walking_preference_comment');

        clearField($(this));
        clearField($comment);

        if (!walking_preference) {
            return
        } else {
            walking_preference = parseInt(walking_preference);
        }

        if (walking_preference >= 4) {
            setComment($(this), 'Это хорошо, что ты хочешь гулять');
            showElem($comment);
        } else if (walking_preference < 4) {
            setComment($(this), 'Мы НЕ хотим гулять!');
            hideElem($comment);
        } else {
            hideElem($comment);
        }
    });

    $('#id_watch_films_preference').on('focusout click', function () {
        let data = getJsonData(this);

        let watch_films_preference = data['watch_films_preference'];
        let $comment = $('#id_watch_films_preference_comment');

        clearField($(this));
        clearField($comment);

        if (!watch_films_preference) {
            return
        } else {
            watch_films_preference = parseInt(watch_films_preference);
        }

        if (watch_films_preference >= 4) {
            setComment($(this), 'Хорошо, я подберу что-то интересное )');
            showElem($comment);
        } else if (watch_films_preference < 4) {
            setComment($(this), 'Мы не будем смотреть кинематограф?');
            hideElem($comment);
        } else {
            hideElem($comment);
        }
    });

    $('#id_just_stay_at_home').on('focusout click', function () {
        let data = getJsonData(this);

        let just_stay_at_home = data['just_stay_at_home'];
        let $comment = $('#id_just_stay_at_home_comment');

        clearField($(this));
        clearField($comment);

        if (!just_stay_at_home) {
            return
        } else {
            just_stay_at_home = parseInt(just_stay_at_home);
        }

        if (just_stay_at_home >= 4) {
            setComment($(this), 'Будем отдыхать дома');
            showElem($comment);
        } else if (just_stay_at_home < 4) {
            setComment($(this), 'Получается мы активничаем');
            hideElem($comment);
        } else {
            hideElem($comment);
        }
    });

    $('#id_want_to_try_smth_new').on('focusout click', function () {
        let data = getJsonData(this);

        let want_to_try_smth_new = data['want_to_try_smth_new'];
        let $comment = $('#id_want_to_try_smth_new_comment');

        clearField($(this));
        clearField($comment);

        if (!want_to_try_smth_new) {
            return
        } else {
            want_to_try_smth_new = parseInt(want_to_try_smth_new);
        }

        if (want_to_try_smth_new >= 4) {
            setComment($(this), 'Будем отдыхать дома');
            showElem($comment);
        } else if (want_to_try_smth_new < 4) {
            setComment($(this), 'Получается мы активничаем');
            hideElem($comment);
        } else {
            hideElem($comment);
        }
    });

    $('#id_general_comment').on('focusout click keyup', function () {
        clearField($(this));
        let data = getJsonData(this);

        let general_comment = data['general_comment'];

        if (!general_comment.length) {
            setComment($(this), 'Да оставь ты коммент');
        }
    });
});