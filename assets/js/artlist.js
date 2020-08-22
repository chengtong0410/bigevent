$(function () {
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                console.log(res);
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
        template.defaults.imports.dataFormat = function (date) {
            const dt = new Date(date)
            // 定义补零的函数
            function padZero(n) {
                return n > 9 ? n : '0' + n
            }
            var y = dt.getFullYear()
            var m = padZero(dt.getMonth() + 1)
            var d = padZero(dt.getDate())

            var hh = padZero(dt.getHours())
            var mm = padZero(dt.getMinutes())
            var ss = padZero(dt.getSeconds())

            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        }


    }
    initTable()
    initCate()

    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通过 layui 重新渲染表单区域的UI结构
                layui.form.render()
            }
        })
    }
    //筛选功能实现
    $('.formSaixuan').on('submit', function (e) {
        e.preventDefault()
        var cateid = $('[name=cate_id]').val();
        var state = $('[name=state]').val()
        q.cate_id = cateid // 文章分类的 Id
        q.state = state   // 文章的发布状态
        // q.pagesize = 10
        initTable()
    })
    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        layui.laypage.render({
            elem: 'page', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发 jump 回调
            // 触发 jump 回调的方式有两种：
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function (obj, first) {
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                q.pagesize = obj.limit
                // 根据最新的 q 获取对应的数据列表，并渲染表格
                if (!first) {
                    initTable()
                }
            }

        })
    }

    //删除功能
    $('tbody').on('click', '.btn-delete', function () {
        // 获取到文章的 id
        var id = $(this).attr('data-id')
        var len = $('.btn-delete').length
        var lens = document.querySelectorAll('.btn-delete').length
        console.log(lens);
        // 询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 2, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    // if (len === 1) {
                    //     // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                    //     // 页码值最小必须是 1
                    //     q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    // }
                    if (len === 1 && q.pagenum > 1) q.pagenum--
                    initTable()
                }
            })

            layer.close(index)
        })
    })
    //编辑功能
    $('tbody').on('click', '.btnedit', function () {
        var artlis = $(this).attr('data-id')

        location.href = '/article/artedit.html?id=' + artlis
    })
})