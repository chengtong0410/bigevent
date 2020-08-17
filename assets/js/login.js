(function () {
    $("#link_reg").on('click', function () {
        $(this).parent().hide()
        $('.regexBox').show()
    })
    $('#link_log').on('click', function () {
        $(this).parent().hide()
        $('.loginBox').show()
    })
})()