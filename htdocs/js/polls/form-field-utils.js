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

function handleComment($field, form_field, comment, on_length) {
    clearField($field);
    let data = getJsonData($field);
    let comment_data = data[form_field] || $field.val();

    if (on_length && comment_data.length) {
        setComment($field, comment);
    } else if (!on_length && !comment_data.length) {
        setComment($field, comment);
    }
}

function handleIntegerChoice($field, form_field, comment_on_less, comment_on_greater, bound) {
    let data = getJsonData($field);
    let integer_choice = data[form_field] || $field.val();
    clearField($field);

    if (!integer_choice) {
        return
    } else {
        integer_choice = parseInt(integer_choice);
    }

    if (integer_choice >= bound) {
        setComment($field, comment_on_less);
    } else if (integer_choice < bound) {
        setComment($field, comment_on_greater);
    }
}

function handleIntegerChoiceWithComment($field, $fieldComment, form_field, comment_on_less, comment_on_greater, bound) {
    let data = getJsonData($field);

    let integer_choice = data[form_field] || $field.val();

    clearField($field);
    clearField($fieldComment);

    if (!integer_choice) {
        return
    } else {
        integer_choice = parseInt(integer_choice);
    }

    if (integer_choice >= bound) {
        setComment($field, comment_on_less);
        showElem($fieldComment);
    } else if (integer_choice < bound) {
        setComment($field, comment_on_greater);
        hideElem($fieldComment);
    } else {
        hideElem($fieldComment);
    }
}

function handleBoundYesNoChoice($current, $firstField, $secondField,
                                first_form_field, second_form_field,
                                both_true, both_false, different) {
    clearField($firstField);
    clearField($secondField);
    let data = getJsonData($current);

    let first_form_field_data = data[first_form_field];
    let second_form_field_data = data[second_form_field];

    if (!first_form_field_data && !second_form_field_data) {
        return;
    }

    if (first_form_field_data === 'True' && second_form_field_data === 'True') {
        setComment($current, both_true);
    } else if (first_form_field_data === 'False' && second_form_field_data === 'False') {
        setComment($current, both_false);
    } else {
        setComment($current, different);
    }
}