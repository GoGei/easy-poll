$(document).ready(function () {
    let $arrive_date = $('#id_arrive_date');
    let $departure_date = $('#id_departure_date');
    let $enjoy_meet = $('#id_enjoy_meet');
    let $enjoy_food = $('#id_enjoy_food');
    let $enjoy_food_you_cooked = $('#id_enjoy_food_you_cooked');
    let $devote_enough_time = $('#id_devote_enough_time');
    let $time_change_request = $('#id_time_change_request');
    let $want_things_to_do = $('#id_want_things_to_do');
    let $enjoy_movies = $('#id_enjoy_movies');
    let $movies_comment = $('#id_movies_comment');
    let $places_to_go = $('#id_places_to_go');

    function arriveDate() {
        handleDate(
            $arrive_date,
            'arrive_field',
            'Я рад что ты приехала',
            'Я рад что ты приехала',
            'Да, приедь в этом опроснике в БУДУЩЕМ'
        )
    }

    function departureDate() {
        handleDate(
            $departure_date,
            'departure_date',
            'Да, приедь в этом уедь в ПРОШЛОМ',
            'Жалько что ты уезжаешь',
            'Хоть бы подальше'
        )
    }

    function arriveDepartureDate() {
        handleRelatedDates(
            $arrive_date, $departure_date,
            'arrive_date', 'departure_date',
            'Давай, укажи что ПРОШЛОЕ больше БУДУЩЕГО'
        )
    }

    function enjoyMeet() {
        handleYesNoChoice(
            $enjoy_meet,
            'enjoy_meet',
            'Я в следущий раз не встречу походу',
            'Ведь вкусняшки всегда радуют'
        )
    }

    function enjoyFood() {
        handleYesNoChoice(
            $enjoy_food,
            'enjoy_food',
            'Я значит готовил, а тут вот так',
            'Старался, готовил'
        )
    }

    function enjoyFoodYouCook() {
        handleYesNoChoice(
            $enjoy_food_you_cooked,
            'enjoy_food_you_cooked',
            'Хоть и ладно что нет, но я очень люблю когда ты что-то готовишь',
            'Спасибо большое, мне было очень вкусно'
        )
    }

    function devoteEnoughTime() {
        handleYesNoChoice(
            $devote_enough_time,
            'devote_enough_time',
            'Ненасытная',
            'Я старался'
        )
    }

    function timeChangeRequest() {
        handleComment(
            $time_change_request,
            'time_change_request'
        )
    }

    function wantThingsToDo() {
        handleMultipleChoice(
            $want_things_to_do,
            'want_things_to_do',
            {
                'walk': {
                    'on_selected': 'Бежим гулять'
                },
                'stay_home': {
                    'on_selected': 'Лежим дома, МЫ устали'
                },
                'play_games': {
                    'on_selected': 'Приехала она ко мне ака поиграть в игры'
                },
                'watch_movies': {
                    'on_selected': 'Нравится ей Netflix and chill'
                },
                'go_date': {
                    'on_selected': 'Конечно, было бы странно, если ты не выбрала',
                    'on_not_selected': 'Жду пока ты найдёшь этот вариант (Эта фраза сразу исчезнет)'
                },
                'yoga': {
                    'on_selected': 'Как же без йоги',
                    'on_not_selected': 'Этот вариант само собой разумеещееся (Эта фраза сразу исчезнет)'
                },
                'study': {
                    'on_selected': 'Та ладно'
                },
            }
        )
    }

    function enjoyMovies() {
        handleYesNoChoice(
            $enjoy_movies,
            'enjoy_movies',
            'Я щас всё удалю',
            'Я старался, искал (типо Борат)',
            $movies_comment,
        )
    }

    function moviesComment() {
        handleComment(
            $movies_comment,
            'movies_comment'
        )
    }

    function placesToGo() {
        handleMultipleChoice(
            $places_to_go,
            'places_to_go',
            {
                'katowice_center': {
                    'on_selected': 'Центр Катовице: та мы там везде уже прошлись, но походим'
                },
                'cafe': {
                    'on_selected': 'Кафе: как же без кафе'
                },
                'restaurant': {
                    'on_selected': 'Ресторан: МЫ хотим в ресторан'
                },
                'park': {
                    'on_selected': 'Парк: Ну пока мы там не были'
                },
                'cinema': {
                    'on_selected': 'Кино: я это тут просто написал. Какое нахер кино'
                },
                'other_city': {
                    'on_selected': 'Другой город: А на это уже отдельный опросник и желательно заранее'
                },
                'sushi': {
                    'on_selected': 'Суши: суши это прикольно, но и стоит 150зл'
                },
                'bar': {
                    'on_selected': 'Бар: какой нахер бар'
                },
            }
        )
    }

    function init() {
        arriveDate();
        departureDate();
        enjoyMeet();
        enjoyFood();
        enjoyFoodYouCook();
        devoteEnoughTime();
        timeChangeRequest();
        wantThingsToDo();
        enjoyMovies();
        moviesComment();
        placesToGo();

        arriveDepartureDate();
    }

    init();

    $arrive_date.on(ON_DATE, arriveDate);
    $departure_date.on(ON_DATE, departureDate);
    $enjoy_meet.on(ON_SELECT, enjoyMeet);
    $enjoy_food.on(ON_SELECT, enjoyFood);
    $enjoy_food_you_cooked.on(ON_SELECT, enjoyFoodYouCook);
    $devote_enough_time.on(ON_SELECT, devoteEnoughTime);
    $time_change_request.on(ON_TEXT, timeChangeRequest);
    $want_things_to_do.on(ON_SELECT, wantThingsToDo);
    $enjoy_movies.on(ON_SELECT, enjoyMovies);
    $movies_comment.on(ON_SELECT, moviesComment);
    $places_to_go.on(ON_SELECT, placesToGo);

    $('#id_arrive_date,#id_departure_date').on(ON_DATE_SELECTED, arriveDepartureDate);
});