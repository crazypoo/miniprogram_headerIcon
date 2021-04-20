var e = require("./utils/config.js"), n = require("./utils/aes.js");

App({
    onLaunch: function() {
        this.updateVersion(), this.getUserInfo(), wx.removeStorageSync("clip_square");
    },
    
    globalData: {
        userInfo: null
    },
    globalData: {},
    onLaunch: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                var e = 68;
                -1 !== a.model.indexOf("iPhone X") ? e = 88 : -1 !== a.model.indexOf("iPhone") && (e = 64), 
                t.globalData.statusBarHeight = a.statusBarHeight, t.globalData.titleBarHeight = e - a.statusBarHeight;
            },
            failure: function() {
                t.globalData.statusBarHeight = 0, t.globalData.titleBarHeight = 0;
            }
        });
    },
    updateVersion: function() {
        var e = wx.getSystemInfoSync();
        if (e.model && (e.model.toLowerCase().includes("iphone x") ? e.isX = "isX" : e.isX = ""), 
        e.SDKVersion && (e.SDKVersion2 = e.SDKVersion.replace(".", "") - 0), e.system.toLowerCase().includes("android") ? e.isAndroid = !0 : e.isAndroid = !1, 
        wx.setStorageSync("system", e), e.SDKVersion2 <= 19.9) return console.log("updateVersion is  unsupport"), 
        0;
        var n = wx.getUpdateManager();
        n.onCheckForUpdate(function(e) {
            console.log("updateVersion =", e.hasUpdate);
        }), n.onUpdateReady(function() {
            n.applyUpdate();
        }), n.onUpdateFailed(function() {});
    },
    getRelation: function() {
        this.pApi("/shunpai/intf/common/relateapps.jsp", {
            appId: e.customAppId
        }).then(function(e) {
            if (0 === e.data.code) {
                for (var o = e.data.data, t = 0; t < o.length; t++) o[t].wxappId = n.Decrypt(o[t].wxappId);
                wx.setStorageSync("relationData", o);
            }
        });
    },
    getUserInfo: function() {
        var n = this;
        return new Promise(function() {
            wx.login({
                success: function(o) {
                    var t = {};
                    t.code = o.code, t.appId = e.customAppId, n.pApi("/shunpai/intf/pushInfo.do", t).then(function(e) {
                        console.log("pushInfo =", e), 0 === e.data.errorcode ? wx.setStorageSync("userId", e.data.userId) : wx.setStorageSync("userId", "");
                    });
                },
                fail: function(e) {}
            });
        });
    },
    censor: function() {
        var n = this, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return o.uId = wx.getStorageSync("userId"), o.appId = e.customAppId, new Promise(function(e) {
            n.pApi("/shunpai/intf/common/censor.jsp", o).then(function(n) {
                "imgcensor" == o.act && 1 === n.data.code ? wx.showModal({
                    title: "审核不过",
                    content: "图片内容审核不通过，换一张试试",
                    showCancel: !1,
                    confirmText: "知道了"
                }) : "msgcensor" == o.act && 1 === n.data.code && wx.showModal({
                    title: "审核不过",
                    content: "文字内容审核不通过，换一句试试",
                    showCancel: !1,
                    confirmText: "知道了"
                }), e(n.data);
            });
        });
    },
    pApi: function(n) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return new Promise(function(t, i) {
            wx.request({
                url: "" + e.apiUrlTest + n,
                data: o,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(e) {
                    t(e);
                },
                fail: function(e) {
                    t(e), console.log("apiUrl fail = ", e);
                }
            });
        });
    },
    gApi: function(n) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return new Promise(function(t, i) {
            wx.request({
                url: "" + e.apiUrlTest + n,
                data: o,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(e) {
                    t(e);
                },
                fail: function(e) {
                    t(e), console.log("apiUrl fail = ", e);
                }
            });
        });
    }
});