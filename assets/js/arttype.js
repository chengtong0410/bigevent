$(function () {
    // 1.渲染列表
    function Getdata() {
        $.ajax({
            method: 'Get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    layui.layer.msg('获取表单数据失败')

                }
                console.log(res);
                var artType = template('tpl-table', res)
                // console.log(artType);
                $('#list').html(artType)

            }
        })
    }
    Getdata()
    // 2.添加按钮弹出表单

    var indexadd = null
    $('#add').on('click', function () {
        indexadd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })




    })
    // 3.添加按钮弹出表单,提交表单,发送请求到后台

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('添加分类失败')
                }
                layui.layer.msg('添加分类成功')
                Getdata()
                layui.layer.close(indexadd)

            }
        })
    })

    // 4.删除功能
    $('#list').on('click', '#del', function () {
        var ind = $(this).attr('data-id')
        layui.layer.confirm('是否确认删除', { icon: 2, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + ind,
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layui.layer.msg('删除分类失败')
                    }
                    layui.layer.msg('删除分类成功')
                    Getdata()
                }
            })

            layer.close(index);
        });


    })
    //5 .编辑功能
    var indexedit = null
    $('#list').on('click', '#edit', function () {
        indexedit = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        })
        indexa = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + indexa,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取分类信息失败')
                }
                layui.form.val('form-edit', res.data)
            }
        })



    })

    //6.提交修改文章类型内容
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        console.log(2)
        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('添加分类失败')
                }
                layui.layer.msg('更新分类数据成功')
                layui.layer.close(indexedit)
                Getdata()


            }
        })
    })
})