$(function() {
    // 点击去注册账号 登录区隐藏 注册区显示
    $("#link_reg").on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登录 登录区显示 注册区隐藏
    $("#link_login").on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    // 从layui中获取form对象  导入了layui可以用layui
    var form = layui.form;
    // 从layui里导入layer
    var layer = layui.layer;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 先定义校验密码的规则  采用键值对形式  ^[\S]不能有空格
        // pwd:[规则,'错误提示语']
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        // 此时输的密码不一致也能注册，需给确认密码定义校验规则
        // 校验两次密码是否一致  value是用户输的确认密码框的值
        repwd: function(value) {
            // 1.通过形参value拿到确认框的值
            // 2.拿到密码框的值
            // 3.比较两个框的值是否一致  不一致return错误提示消息
            var pwd = $('.reg-box [name = password]').val()
            if (pwd !== value) {
                return "两次密码不一致，请重新输入"
            }

        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止默认的提交行为
        e.preventDefault();
        //  data太长为了方便可以单独声明出来 再写post里
        var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            // 发起ajax的post请求 
        $.post("/api/reguser", data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg("注册成功，请登录！")
                // 模拟人的点击行为  注册成功自动跳到登录界面
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // $(this)当前表单   serialize（）快速获取表单中所有数据
            data: $(this).serialize(),
            success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('登录失败');
                    }
                    layer.msg('登录成功！');
                    // 将登陆成功后得到的token字符串存到localstorage里，以后用到可以去取
                    // 存数据setItem
                    localStorage.setItem('token', res.token)
                        // console.log(res.token);
                        // 登录成功后跳转到后台主页  login.html
                    location.href = '/index.html';
                }
                // token用于有权限接口的身份验证
        })
    })
})