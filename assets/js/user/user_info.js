$(function () {
    //  自定义验证规则
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1-6位之间!"
            }
        }
    })
    initUserInfo();
    // 用户渲染
    let layer = layui.layer;

    function initUserInfo() {

        $.ajax({
            url: '/my/userinfo',
            method: 'get',

            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('forUserInfo', res.data)
            }
        })
    }

    // 表单重置
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        initUserInfo();
    })

    // 修改用户信息
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();

        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                }
                layer.msg("恭喜您,用户信息修改成功!", {
                    icon: 6
                })
                window.parent.getUserInfo();
            }
        })
    })
})