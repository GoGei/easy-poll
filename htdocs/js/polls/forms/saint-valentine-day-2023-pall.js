$(document).ready(function () {
    function haveCouple() {
        let choice = handleYesNoChoice(
            $('#id_have_couple'),
            'have_couple',
            'А вот сейчас не понял',
            'Кто бы сомневался',
        );

        let fieldsOnTrue = [
            'will_meet_each_other',
            'activities',
            'present_preferences',
            'want_to_guess_your_present',
        ];
        let fieldsOnFalse = [
            'comment_on_dont_have_couple'
        ];
        let allFields = [
            'will_meet_each_other',
            'activities',
            'present_preferences',
            'want_to_guess_your_present',
            'your_guess',
            'want_to_see_right_answer',
            'right_answer',
            'comment_on_dont_have_couple',
        ];

        if (choice === 'False') {
            $.each(allFields, (index, field) => {
                if (inArray(field, fieldsOnFalse)) {
                    showElem($(`#id_${field}`));
                } else {
                    hideElem($(`#id_${field}`));
                }
            });
        } else if (choice === 'True') {
            $.each(allFields, (index, field) => {
                if (inArray(field, fieldsOnTrue)) {
                    showElem($(`#id_${field}`));
                } else {
                    hideElem($(`#id_${field}`));
                }
            });
        } else {
            $.each(allFields, (index, field) => {
                hideElem($(`#id_${field}`));
            });
        }
    }

    function willMeetEachOther() {
        handleYesNoChoice(
            $('#id_will_meet_each_other'),
            'will_meet_each_other',
            'Ну приедешь ты 17ого, ничего страшного',
            'Да, 17ого числа отпразднуем задним числом',
        );
    }

    function activities() {
        handleMultipleChoice(
            $('#id_activities'),
            'activities',
            {
                'watch_films': {
                    'on_selected': 'Смотреть фильмы: тогда пойду подготовлю что-то интересное'
                },
                'walking': {
                    'on_selected': 'Гулять: хорошо, иду колдовать хорошую погоду и тебе тёплые вещи'
                },
                'yoga': {
                    'on_selected': 'Йога: ну как же без неё'
                },
                'play_games': {
                    'on_selected': 'Играть в игры: да, ты не ко мне, а к компу едешь'
                },
                'go_to_date': {
                    'on_selected': 'Пойти на свидание: кто бы сомневался'
                },
                'cooking': {
                    'on_selected': 'Готовить: ты мне что-то интересное приготовишь?'
                },
                'travelling': {
                    'on_selected': 'Путешествовать: это нам на будущее, но пускай в этом опроснике тоже будет'
                },
                'lay_at_home': {
                    'on_selected': 'Валяться дома: после всех дел нам надо хорошень отдохнуть'
                },
                'other_activities': {
                    'on_selected': 'Заниматься другими делами: Очевидно, но заниматься другими делами'
                }
            }
        )
    }

    function presentPreferences() {
        handleComment(
            $('#id_present_preferences'),
            'present_preferences',
            'Я учту в следующий раз',
            'Если что подарок уже есть, но ты можешь указать что бы могло быть как вариант'
        )
    }

    function wantToGuessYourPresent() {
        let choice = handleYesNoChoice(
            $('#id_want_to_guess_your_present'),
            'want_to_guess_your_present',
            'Правильно, пусть будет сюрпризом',
            'Ну попробуй',
        );

        let $yourGuess = $('#id_your_guess');
        let $wantToGuessYourPresent = $('#id_want_to_see_right_answer');

        if (choice === 'True') {
            showElem($yourGuess);
            showElem($wantToGuessYourPresent);
        } else {
            hideElem($yourGuess);
            hideElem($wantToGuessYourPresent);
        }
    }

    function yourGuess() {
        handleComment(
            $('#id_your_guess'),
            'your_guess',
            'Пытается, не терпится ей уже узнать что это за подарок',
            ''
        )
    }

    function wantToSeeRightAnswer() {
        let choice = handleYesNoChoice(
            $('#id_want_to_see_right_answer'),
            'want_to_see_right_answer',
            'Правильно, пусть будет сюрпризом',
            'Ладно, щас покажу',
        );

        let $comment = $('#id_right_answer');
        if (choice === 'True') {
            showElem($comment);
        } else {
            hideElem($comment);
        }

    }

    function commentOnDontHaveCouple() {
        handleComment(
            $('#id_comment_on_dont_have_couple'),
            'comment_on_dont_have_couple',
            'Пиши-пиши, это мы с тобой ещё обсудим!',
            'Пиши давай, нет у неё пары'
        )
    }

    function init() {
        haveCouple();
        willMeetEachOther();
        activities();
        presentPreferences();
        wantToGuessYourPresent();
        yourGuess();
        wantToSeeRightAnswer();
        commentOnDontHaveCouple();
    }

    init();

    $('#id_have_couple').on(ON_CLICK, haveCouple);
    $('#id_will_meet_each_other').on(ON_CLICK, willMeetEachOther);
    $('#id_activities').on(ON_SELECT, activities);
    $('#id_present_preferences').on(ON_TEXT, presentPreferences);
    $('#id_want_to_guess_your_present').on(ON_CLICK, wantToGuessYourPresent);
    $('#id_your_guess').on(ON_TEXT, yourGuess);
    $('#id_want_to_see_right_answer').on(ON_CLICK, wantToSeeRightAnswer);
    $('#id_comment_on_dont_have_couple').on(ON_TEXT, commentOnDontHaveCouple);

    $('#id_right_answer').popover({
        trigger: 'click',
        content: 'Ну ты можешь везде поклацать в целом, может чето получится'
    });
});
