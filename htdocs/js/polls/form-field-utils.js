function handleYesNoChoice($field, form_field, comment_on_false, comment_on_true, $comment = null) {
    clearField($field);
    let data = getJsonData();
    let choice = data[form_field] || $field.val();

    if (choice === 'False') {
        setComment($field, comment_on_false);
        if ($comment) {
            showElem($comment);
        }
    } else if (choice === 'True') {
        setComment($field, comment_on_true);
        if ($comment) {
            hideElem($comment);
        }
    } else {
        if ($comment) {
            hideElem($comment);
        }
    }

    return choice;
}

function handleComment($field, form_field,
                       comment_on_has_text='Благодарю вас за комментарий',
                       comment_on_not_has_text='Оставьте пожалуйста комментарий') {
    clearField($field);
    let data = getJsonData();
    let comment_data = data[form_field] || $field.val();
    if (comment_on_has_text && comment_data.length) {
        setComment($field, comment_on_has_text);
    } else if (comment_on_not_has_text && !comment_data.length) {
        setComment($field, comment_on_not_has_text);
    }

    return comment_data;
}

function handleChoice($field, form_field, parser, conditions, trigger_first_condition = true,
                      with_comment = false, $comment = null) {
    let data = getJsonData();
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

    return choice;
}

function handleDate($field, form_field, on_past, on_today, on_future) {
    let data = getJsonData();
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

    return selected_date;
}

function handleMultipleChoice($field, form_field, conditions, on_empty = null) {
    clearField($field);
    let data = getJsonData();
    let selected = toArray(data[form_field] || $field.val());

    if (!selected || !selected.length) {
        if (on_empty) {
            setComment($field, on_empty);
        }
        return;
    }

    $.each(selected, (index, choice) => {
        let on_selected = conditions[choice]['on_selected'];
        let on_not_selected = conditions[choice]['on_not_selected'];
        let is_selected = inArray(choice, selected);

        if (on_selected && is_selected) {
            setComment($field, on_selected);
        } else if (on_not_selected && !is_selected) {
            setComment($field, on_not_selected);
        }

    });

    return selected;
}

function handleSameSelected($field, form_field1, form_field2, comment) {
    let data = getJsonData();
    let first = toArray(data[form_field1]);
    let second = toArray(data[form_field2]);

    if ((!first || !second) || (!first.length || !second.length)) {
        return;
    }

    if (first && second) {
        if (first.some(n => second.some(h => h === n))) {
            setComment(
                $field,
                comment,
                'text-danger');
        }
    }
}

function handleRelatedYesNoFields($current, form_field1, form_field2, comments,
                                  $field1 = null, $field2 = null,
                                  conditions = null, trigger_first_condition = true,
                                  with_clear = false) {
    if ($field1 && $field2 && with_clear) {
        clearField($field1);
        clearField($field2);
    }

    let data = getJsonData();

    let formField1 = data[form_field1];
    let formField2 = data[form_field2];

    if (!formField1 || !formField2) {
        return;
    }

    if (conditions) {
        $.each(conditions, (index, item) => {
            if (item['condition'](formField1, formField2, data)) {
                if (item['callback']) {
                    item['callback'](formField1, formField2, data);
                } else {
                    setComment($current, item['comment']);
                }

                if (trigger_first_condition) {
                    return false;
                }
            }
        });
    }

    if (formField1 === 'True' && formField2 === 'True' && comments['true-true']) {
        setComment($current, comments['true-true']);
    } else if (formField1 === 'True' && formField2 === 'False' && comments['true-false']) {
        setComment($current, comments['true-false']);
    } else if (formField1 === 'False' && formField2 === 'True' && comments['false-true']) {
        setComment($current, comments['false-true']);
    } else if (formField1 === 'False' && formField2 === 'False' && comments['false-false']) {
        setComment($current, comments['false-false']);
    }
}