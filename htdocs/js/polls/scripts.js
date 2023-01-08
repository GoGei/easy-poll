function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$.ajaxSetup({
    xhrFields: {withCredentials: true},
    headers: {'X-CSRFToken': getCookie('csrftoken')},
});

function getJsonData(elem) {
    $(elem).siblings('.custom-comment').remove();

    let form = $(elem).closest('form');

    return $(form)
        .serializeArray()
        .reduce(function (json, {name, value}) {
            json[name] = value;
            return json;
        }, {});
}

function setComment(elem, txt) {
    $('<div/>', {
        'class': 'text-right text-info custom-comment',
        'text': `${txt}`
    }).insertAfter($(elem));
}

function clearComment(elem) {
    $(elem).siblings('.custom-comment').remove();
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

$('.form-control').on('focusin focusout', function () {
    clearErrors($(this));
});