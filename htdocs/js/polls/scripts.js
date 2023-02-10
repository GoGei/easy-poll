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

$('.form-control').on('focusin focusout', function () {
    clearErrors($(this));
});

$('.select2').on('change select2:open', function () {
    clearErrors($(this));
});

$(document).ready(function () {
    // try to parse JSON string of select2 settings of field in there any
    $('.select2').each(function () {
        initSelect2($(this));
    });
});
