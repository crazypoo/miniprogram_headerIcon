var t = require("../../utils/promisify.js");
var videoAd = null;
let interstitialAd = null;

Page({
    data: {
        img_one: "",
        img_two: ""
    },
    onLoad: function(t) {
        console.log(t);
        var o = t.data, e = JSON.parse(o);
        console.log(e), this.setData({
            img_one: e.imgOne,
            img_two: e.imgTwo,
        });
    },
    onReady: function() {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    toIndex: function(t) {
        var o = getCurrentPages(), e = o[o.length - 1].route;
        console.log(e), "pages/lovers/lovers" !== e && wx.redirectTo({
            url: "/pages/lovers/lovers"
        });
    },
    saveImages: function() {
        for (var o = this, e = [ this.data.img_one, this.data.img_two ], n = 0; n < e.length; n++) (0, 
        t.promisify)(wx.getImageInfo)({
            src: e[n]
        }).then(function(e) {
            (0, t.promisify)(wx.saveImageToPhotosAlbum)({
                filePath: e.path
            }).then(function(t) {
                wx.showToast({
                    title: "保存成功"
                });
            }).catch(function(t) {
                o.showSystemError(t, "保存失败");
            });
        }).catch(function(t) {
            o.showSystemError(t, "图片信息获取失败");
        });
    },
    previewImages: function() {
        wx.previewImage({
            urls: [ this.data.img_one, this.data.img_two ]
        });
    },
    showSystemError: function(t, o) {
        var e = o || "系统出错了";
        console.log("something broken out", t), wx.showToast({
            title: e,
            icon: "none"
        });
    },
    backToLastPage: function() {
        wx.navigateBack();
    },

    
 

   







    
});