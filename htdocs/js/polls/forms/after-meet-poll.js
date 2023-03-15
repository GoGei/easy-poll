$(document).ready(function () {
    let $arrive_date = $('#id_arrive_date');
    let $departure_date = $('#id_departure_date');
    let $enjoy_meal = $('#id_enjoy_meal');
    let $enjoy_treat = $('#id_enjoy_treat');
    let $has_enough_free_time = $('#id_has_enough_free_time');
    let $enjoy_free_time = $('#id_enjoy_free_time');
    let $has_enough_busy_time = $('#id_has_enough_busy_time');
    let $enjoy_busy_time = $('#id_enjoy_busy_time');
    let $has_enough_devote_time = $('#id_has_enough_devote_time');
    let $enjoy_devote_time = $('#id_enjoy_devote_time');
    let $has_seen_reply_on_yoga = $('#id_has_seen_reply_on_yoga');
    let $has_enjoy_reply_on_yoga = $('#id_has_enjoy_reply_on_yoga');
    let $want_being_time_comment = $('#id_want_being_time_comment');
    let $being_time_comment = $('#id_being_time_comment');
    let $want_spend_time_comment = $('#id_want_spend_time_comment');
    let $spend_time_comment = $('#id_spend_time_comment');
    let $want_yoga_comment = $('#id_want_yoga_comment');
    let $yoga_comment = $('#id_yoga_comment');
    let $comment = $('#id_comment');

    function arriveDate() {
        handleDate(
            $arrive_date,
            'arrive_field',
            'Хоть ты и уехала, я всё равно скучаю',
            'Только приехала - уже заполяться "После встречи" опросник',
            'Ты не в том опроснике'
        )
    }

    function departureDate() {
        handleDate(
            $departure_date,
            'departure_date',
            'Хоть ты и уехала, я всё равно скучаю',
            'Только уехала - уже заполяться "После встречи" опросник',
            'Ты не в том опроснике'
        )
    }

    function enjoyMeal() {
        handleYesNoChoice(
            $enjoy_meal,
            'enjoy_meal',
            'Не нравится ей еда!',
            'Я старался'
        )
    }

    function enjoyTreat() {
        handleYesNoChoice(
            $enjoy_treat,
            'enjoy_treat',
            'Не нравится ей как с ней обращались!',
            'Конечно, я ждал тебя'
        )
    }

    function hasEnoughFreeTime() {
        handleYesNoChoice(
            $has_enough_free_time,
            'has_enough_free_time',
            'Намекает типо задушил её',
            'Ну если я работал, то оно и понятно'
        )
    }

    function enjoyFreeTime() {
        handleYesNoChoice(
            $enjoy_free_time,
            'enjoy_free_time',
            'Приемлемо, только если вы ждали меня',
            'Отлично, это хорошо, ведь мы не в цирке'
        )
    }

    function hasEnoughBusyTime() {
        handleYesNoChoice(
            $has_enough_busy_time,
            'has_enough_busy_time',
            'Типо заставили работать её!',
            'Надеюсь вы всё успели'
        )
    }

    function enjoyBusyTime() {
        handleYesNoChoice(
            $enjoy_busy_time,
            'enjoy_busy_time',
            'Надеюсь вы хотя бы отдохнули',
            'Это хорошо, что вы провели время продуктивно'
        )
    }

    function hasEnoughDevoteTime() {
        handleYesNoChoice(
            $has_enough_devote_time,
            'has_enough_devote_time',
            'Ненасытная',
            'Я старался'
        )
    }

    function enjoyDevoteTime() {
        handleYesNoChoice(
            $enjoy_devote_time,
            'enjoy_devote_time',
            'Я тут значит старался, а оно вот так вот',
            'Мне тоже нравится так проводить время'
        )
    }

    function hasSeenReplyOnYoga() {
        handleYesNoChoice(
            $has_seen_reply_on_yoga,
            'has_seen_reply_on_yoga',
            'Я очень надеюсь, что к этому моменту я его написал',
            'Я каждый раз подхожу к нему творчески'
        )
    }

    function hasEnjoyReplyOnYoga() {
        handleYesNoChoice(
            $has_enjoy_reply_on_yoga,
            'has_enjoy_reply_on_yoga',
            'Я тут значит как мировой писатель выдаю, а ей не понравилось?',
            'Не зря старался получается'
        )
    }

    function wantBeingTimeComment() {
        handleYesNoChoice(
            $want_being_time_comment,
            'want_being_time_comment',
            null,
            null,
            $being_time_comment
        )
    }

    function beingTimeComment() {
        handleComment(
            $being_time_comment,
            'being_time_comment'
        )
    }

    function wantSpendTimeComment() {
        handleYesNoChoice(
            $want_spend_time_comment,
            'want_spend_time_comment',
            null,
            null,
            $spend_time_comment
        )
    }

    function spendTimeComment() {
        handleComment(
            $spend_time_comment,
            'spend_time_comment'
        )
    }

    function wantYogaComment() {
        handleYesNoChoice(
            $want_yoga_comment,
            'want_yoga_comment',
            null,
            null,
            $yoga_comment
        )
    }

    function yogaComment() {
        handleComment(
            $yoga_comment,
            'yoga_comment'
        )
    }

    function comment() {
        handleComment(
            $comment,
            'comment'
        )
    }

    function arriveDepartureDate() {
        handleRelatedDates(
            $arrive_date, $departure_date,
            'arrive_date', 'departure_date',
            'Давай, укажи что ПРОШЛОЕ больше БУДУЩЕГО'
        )
    }


    function init() {
        arriveDate();
        departureDate();
        enjoyMeal();
        enjoyTreat();
        hasEnoughFreeTime();
        enjoyFreeTime();
        hasEnoughBusyTime();
        enjoyBusyTime();
        hasEnoughDevoteTime();
        enjoyDevoteTime();
        hasSeenReplyOnYoga();
        hasEnjoyReplyOnYoga();
        wantBeingTimeComment();
        beingTimeComment();
        wantSpendTimeComment();
        spendTimeComment();
        wantYogaComment();
        yogaComment();
        comment();

        arriveDepartureDate();
    }

    init();

    $arrive_date.on(ON_DATE, arriveDate);
    $departure_date.on(ON_DATE, departureDate);
    $enjoy_meal.on(ON_CLICK, enjoyMeal);
    $enjoy_treat.on(ON_CLICK, enjoyTreat);
    $has_enough_free_time.on(ON_CLICK, hasEnoughFreeTime);
    $enjoy_free_time.on(ON_CLICK, enjoyFreeTime);
    $has_enough_busy_time.on(ON_CLICK, hasEnoughBusyTime);
    $enjoy_busy_time.on(ON_CLICK, enjoyBusyTime);
    $has_enough_devote_time.on(ON_CLICK, hasEnoughDevoteTime);
    $enjoy_devote_time.on(ON_CLICK, enjoyDevoteTime);
    $has_seen_reply_on_yoga.on(ON_CLICK, hasSeenReplyOnYoga);
    $has_enjoy_reply_on_yoga.on(ON_CLICK, hasEnjoyReplyOnYoga);
    $want_being_time_comment.on(ON_CLICK, wantBeingTimeComment);
    $being_time_comment.on(ON_TEXT, beingTimeComment);
    $want_spend_time_comment.on(ON_CLICK, wantSpendTimeComment);
    $spend_time_comment.on(ON_TEXT, spendTimeComment);
    $want_yoga_comment.on(ON_CLICK, wantYogaComment);
    $yoga_comment.on(ON_TEXT, yogaComment);
    $comment.on(ON_TEXT, comment);

    $('#id_arrive_date,#id_departure_date').on(ON_DATE_SELECTED, arriveDepartureDate);
});