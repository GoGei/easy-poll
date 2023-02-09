function getJsonData() {
    let form = $('form');
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
    return $(elem).closest('div.form-group');
}


function setComment(elem, txt, style = 'text-info') {
    $('<div/>', {
        'class': `text-right ${style} custom-comment`,
        'text': `${txt}`
    }).appendTo(getElemContainer(elem));
}

function clearComment(elem) {
    getElemContainer(elem).find('.custom-comment').remove();
}

function clearErrors(elem) {
    let $divWithErrors = $(elem).closest('div.has-error');
    $divWithErrors.find('div.error-message').remove();
    $divWithErrors.removeClass('has-error');
}

function clearField(elem) {
    clearComment($(elem));
    // clearErrors($(elem));
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
    $elem.val("");
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

function getThisElem($elem, $default) {
    if ($.isWindow($elem[0])) {
        return $($default);
    }
    return $elem
}