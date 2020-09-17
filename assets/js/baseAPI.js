// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候， 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象  拼接路径 自动添加根路径
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径  以后只需写后边即可不用写根路径
    // 当有多个根路径发生变化时只需改这里，整个页面的都会改
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);

    // 因为有多个需要有权限的接口，所以统一设置请求头headers
    //又因为只有/my开头的需请求权限所以用if判断
    // 索引不等于-1   indexOf（'字符'）根据字符返回位置
    if (options.url.indexOf('/my') !== -1) { //证明发起的是有权限的请求
        options.headers = {
            authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载complete函数  无论成功失败都会执行里面代码
    options.complete = function(res) {
        // console.log("执行了complete回调");
        console.log(res);
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        // 这句话代表没有登录账户还想进后台  在上方输网址index.html不登录也进不去
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //  1.强制清空login
            localStorage.removeItem('token')
                // 2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})