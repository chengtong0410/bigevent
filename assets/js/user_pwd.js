$(function () {
    var form = layui.form
    form.verify({
        repwd: function () {

            if ($('#newPwd').val() !== $('#rePwd').val()) {
                return '两次密码输入不相同'
            }
        },
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
    })
    $('#resetBtn').on('click', function (e) {
        e.preventDefault()
        $('.layui-form')[0].reset()
    })
    $('.layui-btn').on('click', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function (res) {
                console.log(res);
                if (res.status === 1) {
                    layui.layer.msg('原密码错误 更新密码失败')
                    $('.layui-form')[0].reset()
                    return
                } else {
                    layui.layer.msg('密码修改成功 即将退出登录')
                    $('.layui-form')[0].reset()
                    setTimeout(function () {
                        window.parent.retlogin()
                    }, 3000)

                }
            }
        })
    })
})