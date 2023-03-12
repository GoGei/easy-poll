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

    if ($elem.hasClass('select2')) {
        initSelect2($elem);
    }
}

function hideElem(elem) {
    let $elem = $(elem);
    $elem.closest('div.form-group').addClass('d-none');
    $elem.hide();
    $elem.val("");

    if ($elem.hasClass('select2')) {
        initSelect2($elem);
    }
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

function initSelect2($field) {
    /*
    function to init or re-init select2
    function used to init and re-init field with its properties after show/hide actions of parent with class d-none
    properties of width of select2 are related to parent.
    In case of select2 width related to parent -> width on hidden parent is set to 0px
    */
    let ajaxConfig = AJAX_DEFAULT_SETTINGS;
    try {
        let jsonString = $field?.data('select-2-config')?.replaceAll("'", "\"");
        if (jsonString) {
            ajaxConfig = JSON.parse(jsonString);
        }
    } catch (e) {
        console.log(e)
    }

    $field.select2(ajaxConfig);
}

function initRemoteSelect2DataChoices($field) {
    $field.select2({
        allowClear: true,
        placeholder: $field.data('placeholder'),
        width: '100%',
        ajax: {
            url: $field.data('ajax-url'),
            method: 'GET',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    search: params.term,
                    page: params.page,
                    limit: DEFAULT_PAGE_SIZE,
                    offset: DEFAULT_PAGE_SIZE * params.page || 0,
                    format: 'json'
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                console.log(data)
                return {
                    pagination: {
                        more: Boolean(data.next)
                    },
                    results: $.map(data.results, function (obj) {
                        return {
                            id: obj.id,
                            text: `${obj.label}`
                        };
                    })
                }
            }
        }
    })
}