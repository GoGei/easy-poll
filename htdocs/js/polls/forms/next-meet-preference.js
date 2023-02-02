$(document).ready(function () {
    function alreadyBotTickets() {
        handleYesNoChoice(
            $('#id_already_bought_tickets'),
            'already_bought_tickets',
            'Как это ты ещё не купила?',
            'Отлично, я тебя очень жду'
        );
    }

    function newDressUp() {
        handleYesNoChoice(
            $('#id_new_dress_up'),
            'new_dress_up',
            'Ничего страшного, я тебя жду в любом',
            'Вау, жду твои новые приколяхи, а ты жди мои взгляды'
        );
    }

    function walkingPreference() {
        handleIntegerChoiceWithComment(
            $('#id_walking_preference'),
            $('#id_walking_preference_comment'),
            'walking_preference',
            'Это хорошо, что ты хочешь гулять',
            'Мы НЕ хотим гулять!',
            4
        );
    }

    function watchFilmsPreference() {
        handleIntegerChoiceWithComment(
            $('#id_watch_films_preference'),
            $('#id_watch_films_preference_comment'),
            'watch_films_preference',
            'Хорошо, я подберу что-то интересное )',
            'Мы не будем смотреть кинематограф?',
            4
        );
    }

    function justStayAtHome() {
        handleIntegerChoiceWithComment(
            $('#id_just_stay_at_home'),
            $('#id_just_stay_at_home_comment'),
            'just_stay_at_home',
            'Будем отдыхать дома',
            'Получается мы активничаем',
            4
        );
    }

    function wantToTrySmthNew() {
        handleIntegerChoiceWithComment(
            $('#id_want_to_try_smth_new'),
            $('#id_want_to_try_smth_new_comment'),
            'want_to_try_smth_new',
            'Будем отдыхать дома',
            'Получается мы активничаем',
            4
        );
    }

    function generalComment() {
        handleComment(
            $('#id_general_comment'),
            'general_comment',
            'Да оставь ты коммент')

    }

    $('#id_already_bought_tickets').on('focusout click', alreadyBotTickets);
    $('#id_new_dress_up').on('focusout click', newDressUp);
    $('#id_walking_preference').on('focusout click', walkingPreference);
    $('#id_watch_films_preference').on('focusout click', watchFilmsPreference);
    $('#id_just_stay_at_home').on('focusout click', justStayAtHome);
    $('#id_want_to_try_smth_new').on('focusout click', wantToTrySmthNew);
    $('#id_general_comment').on('focusout click keyup', generalComment);
});