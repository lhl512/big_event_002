$(function () {
    //  自定义验证规则
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/, '密码必须6-16位，且不能出现空格!'
        ],
        samePwd: function (value) {
            if (value == $("[name = oldPwd]").val()) {
                return '原密码和旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $("[name = newPwd]").val()) {
                return '两次输入的密码不一致'
            }
        }
    });
    // 表单提交
    let layer = layui.layer;
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                }
                layer.msg(res.message, {
                    icon: 6
                })
                $(".layui-form")[0].reset();
            }
        })
    })

})