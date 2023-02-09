$(document).ready(function () {
    function gameEnjoyed() {
        let choice = handleYesNoChoice(
            $('#id_game_enjoyed'),
            'game_enjoyed',
            'Да ладно, а ведь так хотела',
            'Игра про выбешивание соседа до смерти (девушки самые дружелюбные создания)',
        );

        if (choice) {
            if (choice === 'True') {
                showElem($('#id_comment_on_yes_enjoy'));
                hideElem($('#id_comment_on_not_enjoy'));
            } else if (choice === 'False') {
                hideElem($('#id_comment_on_yes_enjoy'));
                showElem($('#id_comment_on_not_enjoy'));
            } else {
                hideElem($('#id_comment_on_yes_enjoy'));
                hideElem($('#id_comment_on_not_enjoy'));
            }
        } else {
            hideElem($('#id_comment_on_yes_enjoy'));
            hideElem($('#id_comment_on_not_enjoy'));
        }
    }

    function commentOnYesEnjoy() {
        handleComment(
            $('#id_comment_on_yes_enjoy'),
            'comment_on_yes_enjoy',
        )
    }

    function commentOnNotEnjoy() {
        handleComment(
            $('#id_comment_on_not_enjoy'),
            'comment_on_not_enjoy',
        )
    }

    function gameEnjoyedRate() {
        handleChoice(
            $('#id_game_enjoyed_rate'),
            'game_enjoyed_rate',
            parseInt,
            [
                {
                    'condition': (value, data) => {
                        return value <= 2;
                    },
                    'comment': 'Мы против насилия и булинга',
                },
                {
                    'condition': (value, data) => {
                        return value > 2 && value < 4;
                    },
                    'comment': 'Мы не против насилия и булинга',
                },
                {
                    'condition': (value, data) => {
                        return value >= 4;
                    },
                    'comment': 'Мы за насилие и булинг',
                },
            ]
        )
    }

    function likedAspects() {
        handleMultipleChoice(
            $('#id_liked_aspects'),
            'liked_aspects',
            {
                'game_play': {
                    'on_selected': 'Геймплей: Насрать невинному человеку в доме наше любимое',
                },
                'story': {
                    'on_selected': 'Сюжет: Тут его нет, очнись',
                },
                'fight': {
                    'on_selected': 'Боёвка: Жаль что я в ней за этого персонажа всегда проигрываю',
                },
                'graphics': {
                    'on_selected': 'Графика: Тут её нет',
                },
                'controlling': {
                    'on_selected': 'Управление: Конечно одной мышкой прикольно клацать',
                },
            }
        )
    }

    function dislikedAspects() {
        handleMultipleChoice(
            $('#id_disliked_aspects'),
            'disliked_aspects',
            {
                'game_play': {
                    'on_selected': 'Геймплей: Нам не нравится гадить невинному человеку в его доме (кому ты врёшь!)',
                },
                'story': {
                    'on_selected': 'Сюжет: Тут его нет, очнись!',
                },
                'fight': {
                    'on_selected': 'Боёвка: А ты думала этот дрыщь вынесет такую тушу?',
                },
                'graphics': {
                    'on_selected': 'Графика: Игра 100 лет назад была придумана, не души её',
                },
                'controlling': {
                    'on_selected': 'Управление: Ты нервничаешь даже если управлять одной мышкой, не нравится ей',
                },
            }
        )
    }

    function enjoyedToPlay() {
        handleYesNoChoice(
            $('#id_enjoyed_to_play'),
            'enjoyed_to_play',
            'Не верю что тебе не нравилось доставать соседа',
            'Напоминаю, девушки самые дружелюбные создания',
        );
    }

    function enjoyedToWatch() {
        handleYesNoChoice(
            $('#id_enjoyed_to_watch'),
            'enjoyed_to_watch',
            'Вроде же сама предложила мне поиграть',
            'Ну ты была как настоящая болельщица',
        );
    }

    function wantToPlaySmthSimilar() {
        handleYesNoChoice(
            $('#id_want_to_play_smth_similar'),
            'want_to_play_smth_similar',
            'Трындишь',
            'Это намёк на ту игру в стиме про кота бэшкэтныка?',
        );
    }

    function commentOnWantToPlaySmthSimilar() {
        handleComment(
            $('#id_comment_on_want_to_play_smth_similar'),
            'comment_on_want_to_play_smth_similar',
        )
    }

    function comment() {
        handleComment(
            $('#id_comment'),
            'comment',
        )
    }

    function gameEnjoyedGameEnjoyedRateLogicalCollisions() {
        handleRelatedYesNoFields(
            getThisElem($(this), $('#id_game_enjoyed_rate')),
            'game_enjoyed', 'game_enjoyed_rate',
            null, null, null,
            [
                {
                    'condition': (value1, value2, data) => {
                        return value1 === 'True' && value2 <= 2;
                    },
                    'comment': 'Давай, поставь любимой игре детства низкую оценку!'
                },
                {
                    'condition': (value1, value2, data) => {
                        return value1 === 'False' && value2 >= 3;
                    },
                    'comment': 'Нам игра не нравится, но бесить соседа нам в кайф'
                },
            ]
        );
    }

    function gameEnjoyedEnjoyedToPlayLogicalCollisions() {
        handleRelatedYesNoFields(
            getThisElem($(this), $('#id_enjoyed_to_play')),
            'game_enjoyed', 'enjoyed_to_play',
            {
                'false-true': 'Поиграла в удовольствие, но игра НЕ нравится',
                'true-false': 'Ностальгия не сработала'
            }
        );
    }

    function gameEnjoyedEnjoyedToWatchLogicalCollisions() {
        handleRelatedYesNoFields(
            getThisElem($(this), $('#id_enjoyed_to_watch')),
            'game_enjoyed', 'enjoyed_to_watch',
            {
                'false-true': 'Игра нам не нравится, но посмотрела бы под пиво заебись',
                'true-false': 'Игра нам нравится, но это не фильм'
            }
        );
    }

    function gameEnjoyedWantToPlaySmthSimilarLogicalCollisions() {
        handleRelatedYesNoFields(
            getThisElem($(this), $('#id_want_to_play_smth_similar')),
            'game_enjoyed', 'want_to_play_smth_similar',
            {
                'false-true': 'Игра нам не нравится, но мы бы в чето похожее зарубились',
                'true-false': 'Ля, наигралась в издевательство над соседом?',
            }
        );
    }

    function likedOrDislikedAspects() {
        handleSameSelected(
            getThisElem($(this), $('#id_disliked_aspects')),
            'liked_aspects',
            'disliked_aspects',
            'Давай, добавь аспект и в нравится, и в не нравится. ИЛИ-ИЛИ'
        )
    }

    function init() {
        gameEnjoyed();
        commentOnYesEnjoy();
        commentOnNotEnjoy();
        gameEnjoyedRate();
        likedAspects();
        dislikedAspects();
        enjoyedToPlay();
        enjoyedToWatch();
        wantToPlaySmthSimilar();
        commentOnWantToPlaySmthSimilar();
        comment();

        gameEnjoyedGameEnjoyedRateLogicalCollisions();
        gameEnjoyedEnjoyedToPlayLogicalCollisions();
        gameEnjoyedEnjoyedToWatchLogicalCollisions();
        gameEnjoyedWantToPlaySmthSimilarLogicalCollisions();
        likedOrDislikedAspects();
    }

    init();

    $('#id_game_enjoyed').on('focusout click', gameEnjoyed);
    $('#id_comment_on_yes_enjoy').on('focusin focusout click keypress', commentOnYesEnjoy);
    $('#id_comment_on_not_enjoy').on('focusin focusout click keypress', commentOnNotEnjoy);
    $('#id_game_enjoyed_rate').on('focusout click', gameEnjoyedRate);
    $('#id_liked_aspects').on('focusout click change', likedAspects);
    $('#id_disliked_aspects').on('focusout click change', dislikedAspects);
    $('#id_enjoyed_to_play').on('focusout click', enjoyedToPlay);
    $('#id_enjoyed_to_watch').on('focusout click', enjoyedToWatch);
    $('#id_want_to_play_smth_similar').on('focusin focusout click', wantToPlaySmthSimilar);
    $('#id_comment_on_want_to_play_smth_similar').on('focusin focusout click keypress', commentOnWantToPlaySmthSimilar);
    $('#id_comment').on('focusout click keyup', comment);

    $('#id_game_enjoyed, #id_game_enjoyed_rate').on('focusout click', gameEnjoyedGameEnjoyedRateLogicalCollisions);
    $('#id_game_enjoyed, #id_enjoyed_to_play').on('focusout click', gameEnjoyedEnjoyedToPlayLogicalCollisions);
    $('#id_game_enjoyed, #id_enjoyed_to_watch').on('focusout click', gameEnjoyedEnjoyedToWatchLogicalCollisions);
    $('#id_game_enjoyed, #id_want_to_play_smth_similar').on('focusout click', gameEnjoyedWantToPlaySmthSimilarLogicalCollisions);
    $('#id_liked_aspects, #id_disliked_aspects').on('focusout click change', likedOrDislikedAspects);
});