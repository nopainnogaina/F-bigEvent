$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // 创建自定义验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    inituserInfo();
    // 初始化用户的基本信息
    function inituserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                console.log(res);
                // 调用form.val()快速为表单赋值
                // formUserInfo代表要给他赋值，res.data是存着的当前用户信息对象  获取过来的昵称和邮箱为空（这不是出错）
                form.val('formUserInfo', res.data);
            }
        })
    }



    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        // 阻止默认行为后需重新调用初始化 重新获取用户信息
        e.preventDefault();
        inituserInfo();
    })



    // 重置后需更新表单
    // 监听表单提交事件

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败');
                }
                layer.msg('更新用户信息成功');
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                // window代表iframe那个窗口  .parent代表父页面，既包含侧边又包含iframe的窗口
                window.parent.getuserInfo();
            }
        })

    })
})