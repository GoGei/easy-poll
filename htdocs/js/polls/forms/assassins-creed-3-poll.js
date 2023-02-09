$(document).ready(function () {
        function gameEnjoyed() {
            let choice = handleYesNoChoice(
                $('#id_game_enjoyed'),
                'game_enjoyed',
                'Конечно, ведь это не "Assassins creed Odyssey" (Одисей, а не Одисея)',
                'Удивительно',
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
                        'comment': 'Ведь это не Одисея (Одисей)',
                    },
                    {
                        'condition': (value, data) => {
                            return value > 2 && value < 4;
                        },
                        'comment': 'Не Одисея (Одисей), но под пиво пойдёт',
                    },
                    {
                        'condition': (value, data) => {
                            return value >= 4;
                        },
                        'comment': 'Если ты врёшь, то ладно - это ложь во благо',
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
                        'on_selected': 'Геймплей: Ты поиграла 15 мин, как ты успела заченить геймплей?',
                    },
                    'story': {
                        'on_selected': 'Сюжет: Да, за 15 мин мы успели понять историю',
                    },
                    'fight': {
                        'on_selected': 'Боёвка: Не петух конечно, но тоже неплохо',
                    },
                    'graphics': {
                        'on_selected': 'Графика: На моём компе тебе понравилась графика?',
                    },
                    'controlling': {
                        'on_selected': 'Управление: Даже при том, что оно сложное?',
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
                        'on_selected': 'Геймплей: Не Одисея (Одисей), по этому нам не нравится (один хер одно и то же)',
                    },
                    'story': {
                        'on_selected': 'Сюжет: В Одисее (Одисее только муж.род) он богаче!',
                    },
                    'fight': {
                        'on_selected': 'Боёвка: Ведь в Одисее (Одисее только муж.род) есть петух!',
                    },
                    'graphics': {
                        'on_selected': 'Графика: Тонечно, на моих дровах оно и понятно',
                    },
                    'controlling': {
                        'on_selected': 'Управление: В Одисее (Одисее только муж.род) оно проще (уверен такое же)',
                    },
                }
            )
        }

        function enjoyedToPlay() {
            handleYesNoChoice(
                $('#id_enjoyed_to_play'),
                'enjoyed_to_play',
                'Не удивительно',
                'Да ладно, мне кажется чешешь',
            );
        }

        function enjoyedToWatch() {
            handleYesNoChoice(
                $('#id_enjoyed_to_watch'),
                'enjoyed_to_watch',
                'Нам настолько не нравится, что даже смотреть противно',
                'Конечно, ведь легче смотреть чем играть',
            );
        }

        function wantToPlaySmthSimilar() {
            handleYesNoChoice(
                $('#id_want_to_play_smth_similar'),
                'want_to_play_smth_similar',
                'Всё, мы теперь линейку асассинов не уважаем?',
                'Конечно, ведь есть ещё Одисея (Одисей)',
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
                        'comment': 'Т.е тебе игра понравилась, но оценку ты поставила низкую?'
                    },
                    {
                        'condition': (value1, value2, data) => {
                            return value1 === 'False' && value2 >= 3;
                        },
                        'comment': 'Т.е тебе игра не понравилась, но оценку ты поставила выше средней?'
                    },
                ]
            );
        }

        function gameEnjoyedEnjoyedToPlayLogicalCollisions() {
            handleRelatedYesNoFields(
                getThisElem($(this), $('#id_enjoyed_to_play')),
                'game_enjoyed', 'enjoyed_to_play',
                {
                    'false-true': 'Т.е тебе игра не понравилась, но играть понравилось?',
                    'true-false': 'Т.е тебе игра понравилась, но играть не понравилось?'
                }
            );
        }

        function gameEnjoyedEnjoyedToWatchLogicalCollisions() {
            handleRelatedYesNoFields(
                getThisElem($(this), $('#id_enjoyed_to_watch')),
                'game_enjoyed', 'enjoyed_to_watch',
                {
                    'false-true': 'Т.е тебе игра не понравилась, но посмотреть тебе норм?',
                    'true-false': 'Т.е тебе игра понравилась, но посмотреть не тебе норм?'
                }
            );
        }

        function gameEnjoyedWantToPlaySmthSimilarLogicalCollisions() {
            handleRelatedYesNoFields(
                getThisElem($(this), $('#id_want_to_play_smth_similar')),
                'game_enjoyed', 'want_to_play_smth_similar',
                {
                    'false-true': 'Т.е тебе игра не понравилась, но ты бы поиграла во что-то похожее? (Конечно же это Одисея (Одисей))',
                    'true-false': 'Всё, мы уже в Одисею (Одисея) не играем?',
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
    }
);