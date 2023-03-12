$(document).ready(function () {
    let $enjoy_polls = $('#id_enjoy_polls');
    let $poll_choices = $('#id_poll_choices');
    let $preferable_amount_of_questions = $('#id_preferable_amount_of_questions');
    let $change_requests = $('#id_change_requests');
    let $new_poll_themes = $('#id_new_poll_themes');

    function enjoyPolls() {
        handleYesNoChoice(
            $enjoy_polls,
            'enjoy_polls',
            'Я сейчас дам тебе, я с душой, а тут вон как',
            'Это правильно',
        )
    }

    function pollChoices() {
        initRemoteSelect2DataChoices($poll_choices);
        handleMultipleChoice(
            $poll_choices,
            'poll_choices',
            null,
            null,
            'Я обязательно посмотрю что я в них писал'
        );
    }

    function preferableAmountOfQuestions() {
        handleChoice(
            $preferable_amount_of_questions,
            'preferable_amount_of_questions',
            parseInt,
            [
                {
                    'condition': (value, data) => {
                        return value <= 2
                    },
                    'comment': 'На самом деле это удобно т.к он не огромный и мне легче его делать и придумывать'
                },
                {
                    'condition': (value, data) => {
                        return value > 2 && value < 4;
                    },
                    'comment': 'Такие по сложнее конечно, но реальны (тем более такие есть)',
                },
                {
                    'condition': (value, data) => {
                        return value >= 4;
                    },
                    'comment': 'Ради тебя я постараюсь, но ты не офигеешь его проходить?',
                },
            ]
        )
    }

    function changeRequests() {
        handleComment(
            $change_requests,
            'change_requests',
        )
    }

    function newPollThemes() {
        handleComment(
            $new_poll_themes,
            'new_poll_themes',
        )
    }

    function init() {
        enjoyPolls();
        pollChoices();
        preferableAmountOfQuestions();
        changeRequests();
        newPollThemes();
    }

    init();

    $enjoy_polls.on(ON_SELECT, enjoyPolls);
    $poll_choices.on(ON_SELECT, pollChoices);
    $preferable_amount_of_questions.on(ON_SELECT, preferableAmountOfQuestions);
    $change_requests.on(ON_TEXT, changeRequests);
    $new_poll_themes.on(ON_TEXT, newPollThemes);
});