$(function () {
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度应在1到6个之间'
            }
        }
    })

    function useInit() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                layui.form.val('userInfoVal', res.data)
            }
        })
    }
    useInit()
    $('#resetBtn').on('click', function (e) {
        e.preventDefault()
        useInit()
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('修改用户信息失败')
                }
                layui.layer.msg('修改用户信息成功')
                window.parent.getuser()
            }
        })
    })




})