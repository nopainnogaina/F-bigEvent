$(function() {
    // 调用getUserInfo获取用户基本信息
    getuserInfo();



    // 退出事件
    var layer = layui.layer;

    $('#btnLogout').on('click', function() {
        // console.log("ok");
        // 点击按钮提示是否退出  调用询问框layer.confirm  点击确定后执行回调函数的代码
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            // console.log("ok");
            // 因为登录成功后在本地存储里存了token，所以退出登录后需清除token回到登录页面
            //  1.清空token
            localStorage.removeItem('token');
            // 2.重新跳转到登录页面
            location.href = '/login.html';
            //3.关闭confirm询问框
            layer.close(index);
        })
    })
})

// 获取用户基本信息
function getuserInfo() {
    // 发ajax请求     该接口有权限
    $.ajax({
        method: 'GET',
        // 只写后边路径需调用文件baseAPI里$.ajaxPrefilter，需导入baseAPI
        url: '/my/userinfo',
        // headers请求头 配置对象  localStorage里有个token值需取过来
        // authorization字段 获取信息的    若没有值获取个空
        // 为什么用请求头headers？原因：那些以/my开头的请求路径需在请求头中携带authorization身份认证字段才可以访问成功
        // 因为有多个需要有权限的接口，所以统一在baseAPI里设置请求头headers 
        // headers: {
        //     authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvater渲染用户头像

            renderAvatar(res.data)

        },

        // 以后调用有权限接口都会用到，所以写到baseAPI里
        // 不论成功还是失败，最终都会调用complete回调函数
        // complete: function(res) {
        //     console.log("执行了complete回调");
        //     console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     // 这句话代表没有登录账户还想进后台  在上方输网址index.html不登录也进不去
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //  1.强制清空login
        //         localStorage.removeItem('token')
        //             // 2.强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户头像  需获取用户信息res.data  用user接收
// 渲染用户头像有优先级，若有昵称nickname显示昵称，没有昵称就显示用户名username
function renderAvatar(user) {
    // 1.获取用户名
    var name = user.nickname || user.username;
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3.渲染用户头像   若有头像user_pic显示头像，若没有就显示文本头像 text-avatar 
    if (user.user_pic !== null) { //代表有图片头像 就显示出来并隐藏文本图像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文本头像  图片头像隐藏
        $('.layui-nav-img').hide();
        // 获取文本头像首字母并转为大写
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}