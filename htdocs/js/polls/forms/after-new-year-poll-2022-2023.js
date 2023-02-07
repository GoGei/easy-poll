$(document).ready(function () {
    function isEnjoyYourTime() {
        handleYesNoChoice(
            $('#id_is_enjoy_your_time'),
            'is_enjoy_your_time',
            'Что значит нет?',
            'Конечно, я готовился',
        );
    }

    function isYouLikeWayTreated() {
        handleYesNoChoiceWithComment(
            $('#id_is_you_like_way_treated'),
            $('#id_comment_on_treated'),
            'is_you_like_way_treated',
            'Давай, нажалуйся )',
            'То тебе повезло',
        )
    }

    function commentOnTreated() {
        handleComment(
            $('#id_comment_on_treated'),
            'comment_on_treated',
            'Жалуется, жалуется',
            true
        )
    }

    function isLikeMoviesGenerally() {
        handleYesNoChoice(
            $('#id_is_like_movies_generally'),
            'is_like_movies_generally',
            'Я уверен, что это всё из-за Бруно (я знаю что он тебе понравился)!',
            'Я уверен, что это всё из-за Бруно (я знал, что он тебе понравится)!',
        );
    }

    function likedOrDislikedFilms() {
        let $liked = $('#id_liked_films');
        let $disliked = $('#id_disliked_films');
        clearField($liked);
        clearField($disliked);

        let data = getJsonData($liked);
        let liked_films = toArray(data['liked_films']);
        let disliked_films = toArray(data['disliked_films']);

        // in same categories film
        if (liked_films && disliked_films) {
            if (liked_films.some(n => disliked_films.some(h => h === n))) {
                setComment($(this),
                    'Давай, добавь фильм и в нравится, и в не нравится. ИЛИ-ИЛИ',
                    'text-danger');
            }
        }

        // liked films
        if (inArray('bruno', liked_films)) {
            setComment($liked, 'Бруно: Конечно же тебе понравился Бруно!');
        }
        if (inArray('wednesday', liked_films)) {
            setComment($liked, 'Уэнсдэй: Конечно, ведь ты его сама выбрала! (мне тоже понравился)');
        }
        if (inArray('my_boyfriend_from_zoo', liked_films)) {
            setComment($liked, 'Мой парень из зоопарка: Да, давай, теперь мне придётся ещё профессионально с сутулыми общаться');
        }
        if (inArray('how_i_met_your_mom', liked_films)) {
            setComment($liked, 'Как я встретил вашу маму: Ха-ха-ха, закадровый смех решает');
        }

        // disliked films
        if (inArray('bruno', disliked_films)) {
            setComment($disliked, 'Бруно: Я знаю, что в глубине души тебе понравился Бруно!');
        }
        if (inArray('wednesday', disliked_films)) {
            setComment($disliked, 'Уэнсдэй: А мне понравился, хотя просмотр других женщин любого контекста МЫ осуждаем');
        }
        if (inArray('my_boyfriend_from_zoo', disliked_films)) {
            setComment($disliked, 'Мой парень из зоопарка: Спасибо, теперь мне придётся ещё профессионально с сутулыми общаться');
        }
        if (inArray('how_i_met_your_mom', disliked_films)) {
            setComment($disliked, 'Как я встретил вашу маму: Тебе не понравился закадровый смех?');
        }
    }

    function helpInSignatureSalad() {
        handleYesNoChoice(
            $('#id_help_in_signature_salad'),
            'help_in_signature_salad',
            'Это ещё что значит?',
            'Конечно, надеюсь я хорошо рубал',
        );
    }

    function enjoyOtherSalads() {
        handleYesNoChoice(
            $('#id_enjoy_other_salads'),
            'enjoy_other_salads',
            'А нахера я их стругал?',
            'Это хорошо, что мимоза всё вывозит',
        );
    }

    function enjoyedOtherSalads() {
        let $field = $('#id_enjoyed_salads');
        clearField($field);
        let data = getJsonData($field);
        let enjoyed_salads = toArray(data['enjoyed_salads'] || $field.val());

        if (!enjoyed_salads || !enjoyed_salads.length) {
            setComment($field, 'Выбери что-то');
            return
        }

        if (inArray('olivie', enjoyed_salads)) {
            setComment($field, 'Оливье: Самое интересное, что оливье мы съели последним');
        } else {
            setComment($field, 'Оливье: Интересно почему оливье главный салат, но его всегда оставляют на потом?');
        }

        if (inArray('green_salad', enjoyed_salads)) {
            setComment($field, 'Салат из зелени: Да, я бегал, искал эти ингредиенты и старался всё это сделать утром');
        } else {
            setComment($field, 'Салат из зелени: Походу ты салат от меня больше не получишь');
        }

        if (inArray('mimosa', enjoyed_salads)) {
            setComment($field, 'Мимоза: Не зря фиячил всё это получается');
        } else {
            setComment($field, 'Мимоза: Я что, зря фиячил?');
        }

        if (inArray('chicken_pineapple', enjoyed_salads)) {
            setComment($field, 'Салат с курицей и ананасами и др. ингредиентами: Ну кто бы сомневался (всем понравился)');
        } else {
            setComment($field, 'Салат с курицей и ананасами и др. ингредиентами: Тю, странно как-то твой салат и самой не нравится. Осуждаю!');
        }
    }

    function isEnjoyedDate() {
        handleYesNoChoice(
            $('#id_is_enjoyed_date'),
            'is_enjoyed_date',
            'Ты смотри, а то больше не будет',
            'Я очень рад',
        );
    }

    function isEnjoyedDateMeal() {
        handleYesNoChoice(
            $('#id_is_enjoyed_date_meal'),
            'is_enjoyed_date_meal',
            'Понавыбирала блин',
            'Твоему вкусу я доверяю (НЕ курица и ананасы)',
        );
    }

    function isEnjoyedDateSelectedPizza() {
        handleYesNoChoice(
            $('#id_is_enjoyed_date_selected_pizza'),
            'is_enjoyed_date_selected_pizza',
            'В следующий раз пиццу выбираешь ты (не курица и ананасы)',
            'Я знаю что нравится моей женщине',
        );
    }

    function isEnjoyedWaitressSmile() {
        handleYesNoChoice(
            $('#id_is_enjoyed_waitress_smile'),
            'is_enjoyed_waitress_smile',
            'Конечно, ведь мы такую красивую улыбку осуждаем (большие сиськи)',
            'Мне кажется она всем понравилась (мне нельзя)',
        );
    }

    function howOftenLookedAtHer() {
        handleIntegerChoice(
            $('#id_how_often_looked_at_her'),
            'how_often_looked_at_her',
            'Ты посмотри как тебя её улыбка тревожила',
            'Я рад что наше свидание тебе дороже её улыбки',
            4
        )
    }

    function howOfterLookedAtMeToSeeMyReaction() {
        // let $field = $('#id_how_ofter_looked_at_me_to_see_my_reaction');
        // clearField($field);
        // let data = getJsonData($field);
        //
        // let how_ofter_looked_at_me_to_see_my_reaction = data['how_ofter_looked_at_me_to_see_my_reaction'] || $field.val();
        //
        // if (!how_ofter_looked_at_me_to_see_my_reaction) {
        //     return
        // } else {
        //     how_ofter_looked_at_me_to_see_my_reaction = parseInt(how_ofter_looked_at_me_to_see_my_reaction);
        // }
        //
        // if (how_ofter_looked_at_me_to_
        // see_my_reaction <= 2) {
        //     setComment($(this), 'Я рад, что ты во мне уверена');
        // } else if (2 < how_ofter_looked_at_me_to_see_my_reaction && how_ofter_looked_at_me_to_see_my_reaction < 5) {
        //     setComment($(this), 'Ты посмотри какая ревнивая');
        // } else if (how_ofter_looked_at_me_to_see_my_reaction == 5) {
        //     setComment($(this), 'Очень ревнивая');
        // }
        console.log('there');

        let $field = $('#id_how_ofter_looked_at_me_to_see_my_reaction');
        handleIntegerChoiceMultipleOneCondtion(
            $field,
            'id_how_ofter_looked_at_me_to_see_my_reaction',
            [
                {
                    'condition': function (value) {
                        return value <= 2;
                    },
                    'on_condition': function () {
                        setComment($field, 'Я рад, что ты во мне уверена');
                    },
                },
                {
                    'condition': function (value) {
                        return 2 < value && value < 5;
                    },
                    'on_condition': function () {
                        setComment($field, 'Ты посмотри какая ревнивая');
                    },
                },
                {
                    'condition': function (value) {
                        return value == 5;
                    },
                    'on_condition': function () {
                        setComment($field, 'Очень ревнивая');
                    },
                },

                {
                    'condition': function (value) {
                        return value == 3;
                    },
                    'on_condition': function () {
                        setComment($field, '3');
                    },
                },
            ]
        );
    }

    function howOftenBothHandler() {
        let $fieldLookAtHer = $('#id_how_often_looked_at_her');
        let $fieldLookAtMe = $('#id_how_ofter_looked_at_me_to_see_my_reaction');
        let data = getJsonData($fieldLookAtHer);
        let look_at_her = data['how_often_looked_at_her'] || $fieldLookAtHer.val();
        let check_i_looked_at_her = data['how_ofter_looked_at_me_to_see_my_reaction'] || $fieldLookAtMe.val();

        if ((look_at_her && check_i_looked_at_her) &&
            look_at_her >= 4 && check_i_looked_at_her >= 4) {
            setComment($(this), 'Какая глазастая! И сама смотрела, и за мной следила. Один глаз на нас, другой на Кавказ');
        }
    }

    function massageSessions() {
        handleYesNoChoice(
            $('#id_massage_sessions'),
            'massage_sessions',
            'На колени и извиняться! Иначе больше массама же будет!',
            'Мне тоже понравился',
        );
    }

    function massageSessionRate() {
        let $field = $('#id_massage_sessions_rate');
        clearField($field);
        let data = getJsonData($field);

        let massage_sessions_rate = data['massage_sessions_rate'] || $field.val();

        if (!massage_sessions_rate) {
            return
        } else {
            massage_sessions_rate = parseInt(massage_sessions_rate);
        }

        let massage_sessions = data['massage_sessions'];
        if (massage_sessions === 'False' && massage_sessions_rate >= 3) {
            setComment($(this), 'А как это тебе не нравится, но оно лучше чем "Нормально"?');
        } else if (massage_sessions_rate < 5) {
            setComment($(this), 'Это мне ещё расти куда-то надо получается надо она мне хочет намекнуть (но претензий не имею, главное чтоб нам нравилось)');
        } else if (massage_sessions_rate == 5) {
            setComment($(this), 'Да, это наши сеансы обновления души и тела, ниже быть не может');
        }
    }

    function wereMandarinsGood() {
        handleYesNoChoice(
            $('#id_were_mandarins_good'),
            'were_mandarins_good',
            'Я значит с ней стоял выбирал самые вкусные, а оно всё равно не нравится!',
            'Я старался выбирал у лоточка вместе с тобой',
        );
    }

    function wereEnoughMandarins() {
        handleYesNoChoice(
            $('#id_were_enough_mandarins'),
            'were_enough_mandarins',
            'Её не прокормить...',
            'Ещё бы столько мандаринов не хватило',
        );
    }

    function wereWalksWarm() {
        handleYesNoChoice(
            $('#id_were_walks_warm'),
            'were_walks_warm',
            'Она даже в +30 замёрзла однажды...',
            'В моей кофте всегда тепло (но в этот раз ты молодец и сама смогла одеться)',
        );
    }

    function wereGamesGood() {
        handleYesNoChoice(
            $('#id_were_games_good'),
            'were_games_good',
            'Для нас Assassin 3 - сложная игра (МЫ не можем нормально передвигаться)',
            'Напоминаю - мирные девушки любят играть в игру, где надо довести сосведа до инфаркта',
        );
    }

    function comment() {
        handleComment(
            $('#id_comment'),
            'comment',
            'Да оставь ты коммент'
        )
    }

    function init() {
        isEnjoyYourTime();
        isYouLikeWayTreated();
        commentOnTreated();
        isLikeMoviesGenerally();
        likedOrDislikedFilms();
        helpInSignatureSalad();
        enjoyOtherSalads();
        enjoyedOtherSalads();
        isEnjoyedDate();
        isEnjoyedDateMeal();
        isEnjoyedDateSelectedPizza();
        isEnjoyedWaitressSmile();
        howOftenLookedAtHer();
        howOfterLookedAtMeToSeeMyReaction();
        howOftenBothHandler();
        massageSessions();
        massageSessionRate();
        wereMandarinsGood();
        wereEnoughMandarins();
        wereWalksWarm();
        wereGamesGood();
        comment();
    }

    init();

    $('#id_is_enjoy_your_time').on('focusout click', isEnjoyYourTime);
    $('#id_is_you_like_way_treated').on('focusout click', isYouLikeWayTreated);
    $('#id_comment_on_treated').on('focusout click keyup', commentOnTreated);
    $('#id_is_like_movies_generally').on('focusout click', isLikeMoviesGenerally);
    $('#id_liked_films,#id_disliked_films').on('focusout click change', likedOrDislikedFilms);
    $('#id_help_in_signature_salad').on('focusout click', helpInSignatureSalad);
    $('#id_enjoy_other_salads').on('focusout click', enjoyOtherSalads);
    $('#id_enjoyed_salads').on('focusout click change', enjoyedOtherSalads);
    $('#id_is_enjoyed_date').on('focusout click', isEnjoyedDate);
    $('#id_is_enjoyed_date_meal').on('focusout click', isEnjoyedDateMeal);
    $('#id_is_enjoyed_date_selected_pizza').on('focusout click', isEnjoyedDateSelectedPizza);
    $('#id_is_enjoyed_waitress_smile').on('focusout click', isEnjoyedWaitressSmile);
    $('#id_how_often_looked_at_her').on('focusout click', howOftenLookedAtHer);
    $('#id_how_ofter_looked_at_me_to_see_my_reaction').on('focusout click', howOfterLookedAtMeToSeeMyReaction);
    $('#id_how_often_looked_at_her,#id_how_ofter_looked_at_me_to_see_my_reaction').on('focusout click', howOftenBothHandler);
    $('#id_massage_sessions').on('focusout click', massageSessions);
    $('#id_massage_sessions_rate').on('focusout click', massageSessionRate);
    $('#id_were_mandarins_good').on('focusout click', wereMandarinsGood);
    $('#id_were_enough_mandarins').on('focusout click', wereEnoughMandarins);
    $('#id_were_walks_warm').on('focusout click', wereWalksWarm);
    $('#id_were_games_good').on('focusout click', wereGamesGood);
    $('#id_comment').on('focusout click keyup', comment);
});