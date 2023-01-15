$(document).ready(function () {
    $('#id_is_enjoy_your_time').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);
        let is_enjoy_your_time = data['is_enjoy_your_time'];

        if (is_enjoy_your_time === 'False') {
            setComment($(this), 'Что значит нет?');
        } else if (is_enjoy_your_time === 'True') {
            setComment($(this), 'Конечно, я готовился');
        }
    });

    $('#id_is_you_like_way_treated').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let is_you_like_way_treated = data['is_you_like_way_treated'];
        let $comment = $('#id_comment_on_treated');

        if (is_you_like_way_treated === 'False') {
            setComment($(this), 'Давай, нажалуйся )');
            showElem($comment);
        } else if (is_you_like_way_treated === 'True') {
            setComment($(this), 'То тебе повезло');
            hideElem($comment);
        } else {
            hideElem($comment);
        }
    });

    $('#id_comment_on_treated').on('focusout click keyup', function () {
        clearField($(this));
        let data = getJsonData(this);

        let comment_on_treated = data['comment_on_treated'];

        if (comment_on_treated.length) {
            setComment($(this), 'Жалуется, жалуется');
        }
    });

    $('#id_is_like_movies_generally').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let is_like_movies_generally = data['is_like_movies_generally'];

        if (is_like_movies_generally === 'False') {
            setComment($(this), '*ТЕКСТ РАЗНЫЙ*');
            setComment($(this), 'Я уверен, что это всё из-за Бруно (я знаю что он тебе понравился)!');
        } else if (is_like_movies_generally === 'True') {
            setComment($(this), '*ТЕКСТ РАЗНЫЙ*');
            setComment($(this), 'Я уверен, что это всё из-за Бруно (я знал, что он тебе понравится)!');
        }
    });

    $('#id_liked_films,#id_disliked_films').on('focusout click change', function () {
        let data = getJsonData(this);

        let liked_films = toArray(data['liked_films']);
        let disliked_films = toArray(data['disliked_films']);

        let $liked = $('#id_liked_films');
        let $disliked = $('#id_disliked_films');
        clearField($liked);
        clearField($disliked);

        // in same categories film
        if (liked_films && disliked_films) {
            if (liked_films.some(n => disliked_films.some(h=> h===n))) {
                setComment($(this),
                    'Давай, добавь фильм и в нравится, и в не нравится. ИЛИ-ИЛИ',
                    'text-danger');
            }
        }

        // liked films
        if (inArray('bruno', liked_films)) {
            setComment($liked, 'Конечно же тебе понравился Бруно!');
        }
        if (inArray('wednesday', liked_films)) {
            setComment($liked, 'Конечно, ведь ты его сама выбрала! (мне тоже понравился)');
        }
        if (inArray('my_boyfriend_from_zoo', liked_films)) {
            setComment($liked, 'Да, давай, теперь мне придётся ещё профессионально с сутулыми общаться');
        }
        if (inArray('how_i_met_your_mom', liked_films)) {
            setComment($liked, 'Ха-ха-ха, закадровый смех решает');
        }

        // disliked films
        if (inArray('bruno', disliked_films)) {
            setComment($disliked, 'Я знаю, что в глубине души тебе понрвился Бруно!');
        }
        if (inArray('wednesday', disliked_films)) {
            setComment($disliked, 'А мне понравился, хотя просмотр других женщин любого контекста МЫ осуждаем');
        }
        if (inArray('my_boyfriend_from_zoo', disliked_films)) {
            setComment($disliked, 'Спасибо, теперь мне придётся ещё профессионально с сутулыми общаться');
        }
        if (inArray('how_i_met_your_mom', disliked_films)) {
            setComment($disliked, 'Тебе не понравился закадровый смех?');
        }
    });

    $('#id_help_in_signature_salad').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let help_in_signature_salad = data['help_in_signature_salad'];

        if (help_in_signature_salad === 'False') {
            setComment($(this), 'Это ещё что значит?');
        } else if (help_in_signature_salad === 'True') {
            setComment($(this), 'Конечно, надеюсь я хорошо рубал');
        }
    });

    $('#id_enjoy_other_salads').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let enjoy_other_salads = data['enjoy_other_salads'];

        if (enjoy_other_salads === 'False') {
            setComment($(this), 'А нахера я их стругал?');
        } else if (enjoy_other_salads === 'True') {
            setComment($(this), 'Это хорошо, что мимоза всё вывозит');
        }
    });

    $('#id_enjoyed_salads').on('focusout click change', function () {
        clearField($(this));
        let data = getJsonData(this);

        let enjoyed_salads = toArray(data['enjoyed_salads']);

        if (!enjoyed_salads) {
            return
        }

        if (inArray('olivie', enjoyed_salads)) {
            setComment($(this), 'Самое интересное, что оливье мы съели последним');
        } else {
            setComment($(this), 'Интересно почему оливье главный салат, но его всегда оставляют на потом?');
        }

        if (inArray('green_salad', enjoyed_salads)) {
            setComment($(this), 'Да, я бегал, искал эти ингредиенты и старался всё это сделать утром');
        } else {
            setComment($(this), 'Походу ты салат от меня больше не получишь');
        }

        if (inArray('mimosa', enjoyed_salads)) {
            setComment($(this), 'Не зря фиячил всё это получается');
        } else {
            setComment($(this), 'Я что, зря фиячил?');
        }

        if (inArray('chicken_pineapple', enjoyed_salads)) {
            setComment($(this), 'Ну кто бы сомневался (всем понравился)');
        } else {
            setComment($(this), 'Тю, странно как-то твой салат и самой не нравится. Осуждаю!');
        }
    });

    $('#id_is_enjoyed_date').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let is_enjoyed_date = data['is_enjoyed_date'];

        if (is_enjoyed_date === 'False') {
            setComment($(this), 'Ты смотри, а то больше не будет');
        } else if (is_enjoyed_date === 'True') {
            setComment($(this), 'Я очень рад');
        }
    });

    $('#id_is_enjoyed_date_meal').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let is_enjoyed_date_meal = data['is_enjoyed_date_meal'];

        if (is_enjoyed_date_meal === 'False') {
            setComment($(this), 'Понавыбирала блин');
        } else if (is_enjoyed_date_meal === 'True') {
            setComment($(this), 'Твоему вкусу я доверяю (НЕ курица и ананасы)');
        }
    });

    $('#id_is_enjoyed_date_selected_pizza').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let is_enjoyed_date_selected_pizza = data['is_enjoyed_date_selected_pizza'];

        if (is_enjoyed_date_selected_pizza === 'False') {
            setComment($(this), 'В следующий раз пиццу выбираешь ты (не курица и ананасы)');
        } else if (is_enjoyed_date_selected_pizza === 'True') {
            setComment($(this), 'Я знаю что нравится моей женщине');
        }
    });

    $('#id_is_enjoyed_waitress_smile').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let is_enjoyed_waitress_smile = data['is_enjoyed_waitress_smile'];

        if (is_enjoyed_waitress_smile === 'False') {
            setComment($(this), 'Конечно, ведь мы такую красивую улыбку осуждаем (большие сиськи)');
        } else if (is_enjoyed_waitress_smile === 'True') {
            setComment($(this), 'Мне кажется она всем понравилась (мне нельзя)');
        }
    });

    $('#id_how_often_looked_at_her').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let how_often_looked_at_her = data['how_often_looked_at_her'];

        if (!how_often_looked_at_her) {
            return
        } else {
            how_often_looked_at_her = parseInt(how_often_looked_at_her);
        }

        if (how_often_looked_at_her <= 4) {
            setComment($(this), 'Я рад что наше свидание тебе дороже её улыбки');
        } else if (how_often_looked_at_her > 4) {
            setComment($(this), 'Ты посмотри как тебя её улыбка тревожила');
        }
    });

    $('#id_how_ofter_looked_at_me_to_see_my_reaction').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let how_ofter_looked_at_me_to_see_my_reaction = data['how_ofter_looked_at_me_to_see_my_reaction'];

        if (!how_ofter_looked_at_me_to_see_my_reaction) {
            return
        } else {
            how_ofter_looked_at_me_to_see_my_reaction = parseInt(how_ofter_looked_at_me_to_see_my_reaction);
        }

        if (how_ofter_looked_at_me_to_see_my_reaction <= 2) {
            setComment($(this), 'Я рад, что ты во мне уверена');
        } else if (2 < how_ofter_looked_at_me_to_see_my_reaction && how_ofter_looked_at_me_to_see_my_reaction < 5) {
            setComment($(this), 'Ты посмотри какая ревнивая');
        } else if (how_ofter_looked_at_me_to_see_my_reaction == 5) {
            setComment($(this), 'Очень ревнивая');
        }
    });

    $('#id_how_often_looked_at_her,#id_how_ofter_looked_at_me_to_see_my_reaction').on('focusout click', function () {
        let data = getJsonData(this);
        let look_at_her = data['how_often_looked_at_her'];
        let check_i_looked_at_her = data['how_ofter_looked_at_me_to_see_my_reaction'];

        if ((look_at_her && check_i_looked_at_her) &&
            look_at_her > 4 && check_i_looked_at_her > 4) {
            setComment($(this), 'Какая глазастая! И сама смотрела, и за мной следила. Один глаз на нас, другой на Кавказ');
        }
    });

    $('#id_massage_sessions').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let massage_sessions = data['massage_sessions'];

        if (massage_sessions === 'True') {
            setComment($(this), 'Мне тоже понравился');
        } else if (massage_sessions === 'False') {
            setComment($(this), 'На колени и извиняться! Иначе больше массама же будет!');
        }
    });

    $('#id_massage_sessions_rate').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let massage_sessions_rate = data['massage_sessions_rate'];

        if (!massage_sessions_rate) {
            return
        } else {
            massage_sessions_rate = parseInt(massage_sessions_rate);
        }

        let massage_sessions = data['massage_sessions'];
        if (massage_sessions === 'False' && massage_sessions_rate >= 3) {
            setComment($(this), 'А как это тебе не нравится, но оно лучше чем "Нормально"?');
        } else if (massage_sessions_rate < 5) {
            setComment($(this), 'Это мне ещё рости куда-то надо получается надо она мне хочет намекнуть (но претензий не имею, главное чтоб нам нравилось)');
        } else if (massage_sessions_rate == 5) {
            setComment($(this), 'Да, это наши сеансы обновления души и тела, ниже быть не может');
        }
    });

    $('#id_were_mandarins_good').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let were_mandarins_good = data['were_mandarins_good'];

        if (were_mandarins_good === 'True') {
            setComment($(this), 'Я старался выбирал у лоточка вместе с тобой');
        } else if (were_mandarins_good === 'False') {
            setComment($(this), 'Я значит с ней стоял выбирал самые вкусные, а оно всё равно не нравится!');
        }
    });

    $('#id_were_enough_mandarins').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let were_enough_mandarins = data['were_enough_mandarins'];

        if (were_enough_mandarins === 'True') {
            setComment($(this), 'Ещё бы столько мандаринов не хватило');
        } else if (were_enough_mandarins === 'False') {
            setComment($(this), 'Её не прокормить...');
        }
    });

    $('#id_were_walks_warm').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let were_walks_warm = data['were_walks_warm'];

        if (were_walks_warm === 'True') {
            setComment($(this), 'В моей кофте всегда тепло (но в этот раз ты молодец и сама смогла одеться)');
        } else if (were_walks_warm === 'False') {
            setComment($(this), 'Она даве в +30 замёрзла однажды...');
        }
    });

    $('#id_were_games_good').on('focusout click', function () {
        clearField($(this));
        let data = getJsonData(this);

        let were_games_good = data['were_games_good'];

        if (were_games_good === 'True') {
            setComment($(this), 'Напоминаю - мирные девушки любят играть в игру, где надо довести сосведа до инфаркта');
        } else if (were_games_good === 'False') {
            setComment($(this), 'ДЛя нас Assassin 3 - сложная игра (МЫ не можем нормально передвигаться)');
        }
    });

    $('#id_comment').on('focusout click keyup', function () {
        clearField($(this));
        let data = getJsonData(this);

        let comment = data['comment'];

        if (!comment.length) {
            setComment($(this), 'Да оставь ты коммент');
        }
    });
});