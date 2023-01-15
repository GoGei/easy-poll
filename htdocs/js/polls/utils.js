function getJsonData(elem) {
    $(elem).siblings('.custom-comment').remove();

    let form = $(elem).closest('form');
    return $(form)
        .serializeArray()
        .reduce(function (json, {name, value}) {
            // set as array if multiple items
            if (json[name]) {
                let currentValue = json[name];
                if ($.type(currentValue) === $.type([])) {
                    json[name].push(value);
                } else {
                    json[name] = [currentValue, value];
                }
            } else {
                json[name] = value;
            }

            return json;
        }, {});
}


function getElemContainer(elem) {
    return $(elem).closest('div');
}


function setComment(elem, txt) {
    $('<div/>', {
        'class': 'text-right text-info custom-comment',
        'text': `${txt}`
    }).appendTo(getElemContainer(elem));
}

function clearComment(elem) {
    getElemContainer(elem).siblings('.custom-comment').remove();
}

function clearErrors(elem) {
    let $divWithErrors = $(elem).closest('div.has-error');
    $divWithErrors.find('div.error-message').remove();
    $divWithErrors.removeClass('has-error');
}

function clearField(elem) {
    clearComment($(elem));
    clearErrors($(elem));
}

function showElem(elem) {
    let $elem = $(elem);
    $elem.closest('div.form-group').removeClass('d-none');
    $elem.show();
}

function hideElem(elem) {
    let $elem = $(elem);
    $elem.closest('div.form-group').addClass('d-none');
    $elem.hide();
}

function toArray(data) {
    if (typeof data == 'string') {
        data = [data]
    }
    return data
}

function inArray(item, data) {
    if (!data) {
        return false
    }
    data = toArray(data);
    return data.indexOf(item) !== -1
}