(function () {

    getuser()
    $('#Exits').on('click', function (e) {
        e.preventDefault()
        layui.layer.confirm('是否退出', { icon: 2, title: '提示' }, function (index) {
            //do something
            // 1.清除缓存
            localStorage.removeItem('token')
            // 2.跳转页面
            location.href = '/login.html'
            layui.layer.close(index);
        });


    })
})()
// 获取用户信息
function getuser() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',

        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    })
}
// 渲染头像/名字
function renderAvatar(data) {
    var name = data.nickname || data.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (data.user_pic !== null) {
        $('.layui-nav-img').prop('src', data.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()

        $('.text-avatar').html(name[0].toUpperCase()).show()
    }

}
