$(function() {
    // 获取layui
    var layer = layui.layer;
    // 初始化裁剪效果  完全按顺序复制过来
    // 1.1 获取（image标签）裁剪区域的 DOM 元素
    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比1即1:1  还可写成其他eg：1:2
        aspectRatio: 1,
        // 指定预览区域  在类名为img-preview区域预览
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域  调用cropper方法将配置对象传进去
    $image.cropper(options);


    // 创建裁剪区
    // 为上传文件按钮绑定 模拟点击事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    })


    // 为其绑定一个change事件，只要上传的图片发生改变就触发change事件
    $('#file').on('change', function(e) {
        // console.log(e);  //拿到选择的文件
        // 打印出来的e有个target属性 target里有个files属性  是个伪数组

        // e.target.files拿到用户选择的图片
        var filelist = e.target.files;
        // console.log(filelist);  //打印出用户选择的图片
        if (filelist.length === 0) { //代表没有选择图片
            return layer.msg('请选择照片！');
        }
        // 更换裁剪的图片
        // 1.先拿到用户选择的图片
        var file = e.target.files[0]
            // 2.将文件转为路径
        var newImgURL = URL.createObjectURL(file)
            // 3.销毁旧的裁剪区再重设图片路径最后再建立新的裁剪区域（即把文件赋值给裁剪区再初始化）
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })



    // 将裁减后的图像上传到服务器  
    // 为确定按钮绑定事件
    $('#btnUpload').on('click', function() {
        // 1.拿到用户裁剪后的图像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 2.调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！');
                window.parent.getUserInfo();
            }

        })
    })
})