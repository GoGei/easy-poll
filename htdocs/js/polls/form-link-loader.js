$(document).ready(function () {
    $('#formLinksSearch').on('keyup', function () {
        let value = this.value;
        let formLinks = $('.form-link-row');
        $.map(formLinks, function (formLink) {
            let element = $(formLink);
            let label = element.data('label');
            if (label.toLowerCase().includes(value.toLowerCase())) {
                element.show();
            } else {
                element.hide();
            }
        });
    });
});