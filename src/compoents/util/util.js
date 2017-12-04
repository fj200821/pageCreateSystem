import Request from './util.request';

const Util = {
    request: Request,
    isLogin: document.cookie.indexOf('esid') > -1,
    /**
     * 跳转到登录页面
     */
    redirectLogin: function () {
        if (window.location.href.indexOf('crmpre.') > -1) {
            window.location.href = '//crmpre.adbaitai.com/login.action?redirect=' + encodeURIComponent(window.location.href);
        } else {
            window.location.href = '//crm.adbaitai.com/login.action?redirect=' + encodeURIComponent(window.location.href);
        }
    },

    /**
     * 退出
     */
    redirectLogout: function () {
        let logoutUrl = '//crm.adbaitai.com/logout.action?redirect=' + encodeURIComponent(window.location.href);
        if (window.location.href.indexOf('crmpre.') > -1) {
            logoutUrl = '//crmpre.adbaitai.com/logout.action?redirect=' + encodeURIComponent(window.location.href);
        }
        window.location.href = logoutUrl;
    },

    /**
     * 获取用户信息
     */
    getUserInfo: function (callback) {
        this.request({
            url: "/api/op/user/getUserInfo",
            success: (res) => {
                callback && callback(res.data);
            }
        })
    },
    formItemLayout: {
        labelCol: {span: 4},
        wrapperCol: {span: 20},
    },
    tailFormItemLayout: {
        labelCol: {span: 4},
        wrapperCol: {span: 20,offset: 4},
    }
};


export default Util;