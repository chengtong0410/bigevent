// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)
$('.upbtn').on('click', () => {
    $('#file').click()

}

)
$('#file').on('change', function (e) {
    var filelist = e.target.files
    if (filelist.length <= 0) {
        layui.layer.msg('请上传你照片')
        return
    }
    var imgUrl = URL.createObjectURL(filelist[0])
    $image.cropper('destroy').prop('src', imgUrl).cropper(options) // 重新初始化裁剪区域

})
$('#upload').on('click', function () {
    var dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更换头像失败！')
            }
            layer.msg('更换头像成功！')
            window.parent.getuser()
        }
    })
})