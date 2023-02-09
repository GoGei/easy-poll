$(document).ready(function () {
    function arriveDate() {
        handleDate(
            $('#id_arrive_date'),
            'arrive_date',
            'Да, давай, укажи ПРОШЛОЕ',
            'Ну буду тебя встречать получается',
            'Жду тебя'
        )
    }

    function departureDate() {
        handleDate(
            $('#id_departure_date'),
            'departure_date',
            'Типо ВЧЕРА уехала',
            'Жалко что ты уезжаешь',
            'Я буду по тебе скучать'
        )
    }

    function arriveDepartureDate() {
        let $arrive_date = $('#id_arrive_date');
        let $departure_date = $('#id_departure_date');

        let data = getJsonData();
        let arrive_date = data['arrive_date'] || $arrive_date.val();
        let departure_date = data['departure_date'] || $departure_date.val();

        if (!(arrive_date && departure_date)) {
            return
        }

        arrive_date = new Date(arrive_date).toISOString().split('T')[0]
        departure_date = new Date(departure_date).toISOString().split('T')[0]

        if (arrive_date > departure_date) {
            clearField($arrive_date);
            clearField($departure_date);
            setComment(getThisElem($(this), $departure_date), 'Давай, укажи что ты уехала раньше чем приехала!');
        }
    }

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
        let $field = $('#id_walking_preference');
        let $comment = $('#id_walking_preference_comment');

        hideElem($comment);

        handleChoice(
            $field,
            'walking_preference',
            parseInt,
            [
                {
                    'condition': (value, data) => {
                        return value < 3;
                    },
                    'callback': (value) => {
                        setComment($field, 'Мы НЕ хотим гулять!');
                        hideElem($comment);
                    }
                },
                {
                    'condition': (value, data) => {
                        return value >= 3 && value <= 4;
                    },
                    'callback': (value) => {
                        setComment($field, 'Это хорошо, что ты хочешь гулять. Обязательно сходим');
                        showElem($comment);
                    }
                },
                {
                    'condition': (value, data) => {
                        return value > 4;
                    },
                    'callback': (value) => {
                        setComment($field, 'Как она хочет чтоб её выгуляли, тогда точно идём гулять');
                        showElem($comment);
                    }
                },
            ],
            true,
            true,
        );
    }

    function watchFilmsPreference() {
        let $field = $('#id_watch_films_preference');
        let $comment = $('#id_watch_films_preference_comment');

        hideElem($comment);

        handleChoice(
            $field,
            'watch_films_preference',
            parseInt,
            [
                {
                    'condition': (value, data) => {
                        return value < 3;
                    },
                    'callback': (value) => {
                        setComment($field, 'Мы не будем смотреть кинематограф?');
                        hideElem($comment);
                    }
                },
                {
                    'condition': (value, data) => {
                        return value >= 3 && value <= 4;
                    },
                    'callback': (value) => {
                        setComment($field, 'Хорошо, я подберу что-то интересное )');
                        showElem($comment);
                    }
                },
                {
                    'condition': (value, data) => {
                        return value > 4;
                    },
                    'callback': (value) => {
                        setComment($field, 'Ну ты наверное очень хочешь посмотреть что-то');
                        showElem($comment);
                    }
                },
            ],
            true,
            true,
        );
    }

    function justStayAtHome() {
        let $field = $('#id_just_stay_at_home');
        let $comment = $('#id_just_stay_at_home_comment');

        hideElem($comment);

        handleChoice(
            $field,
            'just_stay_at_home',
            parseInt,
            [
                {
                    'condition': (value, data) => {
                        return value < 3;
                    },
                    'callback': (value) => {
                        setComment($field, 'Ты по городу бегать собралась?');
                        showElem($comment);
                    }
                },
                {
                    'condition': (value, data) => {
                        return value >= 3 && value <= 4;
                    },
                    'callback': (value) => {
                        setComment($field, 'Получается мы активничаем');
                        showElem($comment);
                    }
                },
                {
                    'condition': (value, data) => {
                        return value > 4;
                    },
                    'callback': (value) => {
                        setComment($field, 'Будем отдыхать дома');
                        hideElem($comment);
                    }
                },
            ],
            true,
            true,
        );
    }

    function wantToTrySmthNew() {
        let $field = $('#id_want_to_try_smth_new');
        let $comment = $('#id_want_to_try_smth_new_comment');

        hideElem($comment);

        handleChoice(
            $field,
            'want_to_try_smth_new',
            parseInt,
            [
                {
                    'condition': (value, data) => {
                        return value < 3;
                    },
                    'callback': (value) => {
                        setComment($field, 'Будем делать всё что отлажено получается');
                        hideElem($comment);
                    }
                },
                {
                    'condition': (value, data) => {
                        return value >= 3 && value <= 4;
                    },
                    'callback': (value) => {
                        setComment($field, 'И что же ты решила новое попробовать?');
                        showElem($comment);
                    }
                },
                {
                    'condition': (value, data) => {
                        return value > 4;
                    },
                    'callback': (value) => {
                        setComment($field, 'Я уже весь во внимании');
                        showElem($comment);
                    }
                },
            ],
            true,
            true,
        );
    }

    function generalComment() {
        handleComment(
            $('#id_general_comment'),
            'general_comment',
        )
    }

    function init() {
        arriveDate();
        departureDate();
        alreadyBotTickets();
        newDressUp();
        walkingPreference();
        watchFilmsPreference();
        justStayAtHome();
        wantToTrySmthNew();
        generalComment();
    }

    init();

    $('#id_arrive_date').on('change', arriveDate);
    $('#id_departure_date').on('change', departureDate);
    $('#id_arrive_date,#id_departure_date').on('change', arriveDepartureDate);
    $('#id_already_bought_tickets').on('focusout click', alreadyBotTickets);
    $('#id_new_dress_up').on('focusout click', newDressUp);
    $('#id_walking_preference').on('focusout click', walkingPreference);
    $('#id_watch_films_preference').on('focusout click', watchFilmsPreference);
    $('#id_just_stay_at_home').on('focusout click', justStayAtHome);
    $('#id_want_to_try_smth_new').on('focusout click', wantToTrySmthNew);
    $('#id_general_comment').on('focusout click keyup', generalComment);
});