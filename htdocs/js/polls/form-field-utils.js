function handleYesNoChoice($field, form_field, comment_on_false, comment_on_true) {
    clearField($field);
    let data = getJsonData($field);
    let choice = data[form_field] || $field.val();

    if (choice === 'False') {
        setComment($field, comment_on_false);
    } else if (choice === 'True') {
        setComment($field, comment_on_true);
    }
}

function handleYesNoChoiceWithComment($field, $comment, form_field, comment_on_false, comment_on_true) {
    clearField($field);
    let data = getJsonData($field);
    let choice = data[form_field] || $field.val();

    if (choice === 'False') {
        setComment($field, comment_on_false);
        showElem($comment);
    } else if (choice === 'True') {
        setComment($field, comment_on_true);
        hideElem($comment);
    } else {
        hideElem($comment);
    }
}

function handleComment($field, form_field, comment, if_has_text) {
    clearField($field);
    let data = getJsonData($field);
    let comment_data = data[form_field] || $field.val();
    if (if_has_text && comment_data.length) {
        setComment($field, comment);
    } else if (!if_has_text && !comment_data.length) {
        setComment($field, comment);
    }
}

function handleChoice($field, form_field, parser, conditions, trigger_first_condition = true,
                      with_comment = false, $comment = null) {
    let data = getJsonData($field);
    let choice = data[form_field] || $field.val();
    clearField($field);

    if (!choice) {
        if ($comment) {
            hideElem($comment);
        }

        return
    } else {
        choice = parser(choice);
    }

    $.each(conditions, (index, item) => {
        if (item['condition'](choice, data)) {
            if (item['callback']) {
                item['callback'](choice);
            } else {
                showElem($comment);
                setComment($field, item['comment']);
            }

            if (trigger_first_condition) {
                return false;
            }
        }
    });
}

function handleDate($field, form_field, on_past, on_today, on_future, on_long_future) {
    let data = getJsonData($field);
    let selected_date = data[form_field] || $field.val();
    clearField($field);

    if (!selected_date) {
        return;
    } else {
        selected_date = new Date(selected_date).toISOString().split("T")[0];
    }

    let today = new Date().toISOString().split("T")[0];

    if (selected_date < today) {
        setComment($field, on_past);
    } else if (selected_date > today) {
        setComment($field, on_future);
    } else {
        setComment($field, on_today);
    }
}