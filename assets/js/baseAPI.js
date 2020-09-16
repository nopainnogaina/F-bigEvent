// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候， 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象  拼接路径
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径  以后只需写后边即可不用写根路径
    // 当有多个根路径发生变化时只需改这里整个页面的都会改
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);

})