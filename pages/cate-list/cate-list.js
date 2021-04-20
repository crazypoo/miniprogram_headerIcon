var t = require("../../model/baseModel.js"), e = (require("../../utils/promisify.js"), 
new t.baseModel());

Page({
    data: {
        profileList: [],
        showMore: !1,
        scroll: !1
    },
    onLoad: function(t) {
        var o = this, a = t.title || "热门情头";
        e.getProfileList(function(t) {
            o.setData({
                profileList: t.list,
                title: a
            });
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
    onReachBottom: function() {
        var t = this;
        this.setData({
            showMore: !0
        }), e.getProfileList(function(e) {
            var o = t.data.profileList;
            o = o.concat(e.list), t.setData({
                profileList: o,
                showMore: !1
            });
        });
    },
    backToLastPage: function() {
        wx.navigateBack({});
    },
    toIndex: function(t) {
        var e = getCurrentPages();
        "pages/lovers/lovers" !== e[e.length - 1].route && wx.redirectTo({
            url: "/pages/lovers/lovers"
        });
    },
    backTop: function(t) {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        });
    },
    detailAction: function(t) {
        var e = t.currentTarget.dataset.imgOne, o = t.currentTarget.dataset.imgTwo, a = JSON.stringify({
            imgOne: e,
            imgTwo: o
        });
        wx.navigateTo({
            url: "/pages/detail/detail?data=" + a
        });
    },
    onPageScroll: function(t) {
        var e = !1;
        t.scrollTop >= 388 && (e = !0), this.setData({
            scroll: e
        });
    },
    onShareAppMessage: function() {}
});