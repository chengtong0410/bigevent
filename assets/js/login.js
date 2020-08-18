// login页面和reg页面切换
(function () {
    $("#link_reg").on('click', function () {
        $(this).parents('.loginBox').hide()
        $('.regexBox').show()
    })
    $('#link_log').on('click', function () {
        $(this).parents('.regexBox').hide()
        $('.loginBox').show()
    })
})()
// form用layUI表单校验
layui.form.verify({
    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
        if (value !== $('.regexBox input[name=password]').val()) {
            return '请两次密码输入不一致'
        }

    }
}

)
// 注册页面
$('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var datas = {
        username: $('#form_reg [name=userName]').val(),
        password: $('#form_reg [name=password]').val()
    }
    $.ajax({
        method: 'post',
        url: '/api/reguser',
        data: datas,
        success: function (res) {
            if (res.status !== 0) {
                console.log(res);
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message)
            $('#link_log').click()
            $('#form_reg')[0].reset()
        }
    })
})
//登录页面
$('#form_login').on('submit', function (e) {
    e.preventDefault()
    console.log($(this).serialize());
    $.ajax({
        method: 'post',
        url: '/api/login',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg('登录成功')
            localStorage.setItem('token', res.token)
            location.href = '/index.html'

        }

    })
})