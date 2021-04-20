function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var a = null, t = null, n = require("../../utils/util.js");

Page({
    data: {
        tempImg: [],
        rawData: wx.getStorageSync("userInfo") || {},
        barList: [ {
            name: "热门配图",
            status: "sel",
            type: "liuyi"
        }, {
            name: "日常吐槽",
            status: "def",
            type: "tucao"
        } ],
        selBarIndex: 1,
        selTempIndex: 1,
        selTempType: "liuyi",
        imageArray: [ "", "", "", "", "", "", "", "", "" ],
        imageUrlVersion: "",
        myImg: "",
        defImg: "/images/add_image.png"
    },
    ad_set: function() {
        var e = this;
        wx.createRewardedVideoAd && ((a = wx.createRewardedVideoAd({
            adUnitId: "adunit-233748f2b18e4261"
        })).onLoad(function() {
            console.log("激励广告拉取成功");
        }), a.onError(function(e) {
            wx.showModal({
                title: "提示",
                content: "视频广告拉取失败"
            });
        }), a.onClose(function(a) {
            a && a.isEnded || void 0 === a ? (console.log("发放奖励"), e.btnSave()) : wx.showModal({
                title: "提示",
                content: "Sorry...您需要看完视频才能下载～",
                showCancel: !1,
                confirmText: "好的"
            });
        }));
    },
    onLoad: function(e) {
        this.ad_set(), t = wx.createCanvasContext("myCanvas"), this.setData({
            myImg: wx.getStorageSync("clip_square"),
            imageUrlVersion: n.getTime2()
        });
    },
    selBar: function(e) {
        var a = e.currentTarget.dataset;
        console.log(a);
        for (var t = this.data.barList, n = 0; n < t.length; n++) n == a.index ? t[n].status = "sel" : t[n].status = "def";
        console.log("barList =", t), this.setData({
            barList: t,
            selBarIndex: a.index + 1,
            selTempType: a.type,
            selTempIndex: 1
        });
    },
    selTemplate: function(e) {
        var a = e.currentTarget.dataset;
        this.setData({
            selTempIndex: a.index + 1
        });
    },
    getUserInfo: function(e) {
        var a = JSON.parse(e.detail.rawData);
        a.avatarUrl = a.avatarUrl.replace("132", "0"), wx.setStorageSync("userInfo", a), 
        this.setData({
            rawData: a
        });
    },
    preview: function(e) {
        wx.previewImage({
            urls: [ e.currentTarget.dataset.url ]
        });
    },
    btnSave2: function() {
        console.log("btnSave"), this.data.myImg ? this.btnSave1() : wx.showToast({
            title: "未添加照片",
            image: "/images/icon_warn.png"
        });
    },
    btnSave1: function() {
        console.log("打开激励视频"), wx.showModal({
            title: "提示",
            content: "观看视频广告即可保存",
            success: function(e) {
                e.confirm ? (console.log("用户点击确定"), a && a.show().catch(function() {
                    a.load().then(function() {
                        return a.show();
                    }).catch(function(e) {
                        console.log("激励视频 广告显示失败");
                    });
                })) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    btnSave: function() {
        var e = this;
        if (console.log("btnSave"), !this.data.myImg) return wx.showToast({
            title: "未添加照片",
            image: "/images/icon_warn.png"
        }), 0;
        wx.showLoading({
            title: "保存中...",
            mask: !0
        });
        var a = this.data.selTempType;
        wx.getSetting({
            success: function(n) {
                var o = n.authSetting["scope.writePhotosAlbum"];
                !1 === o ? (wx.hideLoading(), wx.openSetting({})) : (o || wx.hideLoading(), e.downImage("https://img.bazhuay.com/" + a + "_" + e.data.selTempIndex + "_5.png?t=" + e.data.imageUrlVersion, 5).then(function(n) {
                    t.drawImage(e.data.myImg, 0, 0, 300, 300), t.drawImage(n, 0, 0, 300, 300), t.draw(), 
                    setTimeout(function() {
                        wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: 300,
                            height: 300,
                            destWidth: 900,
                            destHeight: 900,
                            canvasId: "myCanvas",
                            success: function(t) {
                                e.setData({
                                    "imageArray[4]": t.tempFilePath
                                }), Promise.all([ e.downImage("https://img.bazhuay.com/" + a + "_" + e.data.selTempIndex + "_9.jpg?t=" + e.data.imageUrlVersion, 9), e.downImage("https://img.bazhuay.com/" + a + "_" + e.data.selTempIndex + "_8.jpg?t=" + e.data.imageUrlVersion, 8), e.downImage("https://img.bazhuay.com/" + a + "_" + e.data.selTempIndex + "_7.jpg?t=" + e.data.imageUrlVersion, 7), e.downImage("https://img.bazhuay.com/" + a + "_" + e.data.selTempIndex + "_6.jpg?t=" + e.data.imageUrlVersion, 6), e.downImage("https://img.bazhuay.com/" + a + "_" + e.data.selTempIndex + "_4.jpg?t=" + e.data.imageUrlVersion, 4), e.downImage("https://img.bazhuay.com/" + a + "_" + e.data.selTempIndex + "_3.jpg?t=" + e.data.imageUrlVersion, 3), e.downImage("https://img.bazhuay.com/" + a + "_" + e.data.selTempIndex + "_2.jpg?t=" + e.data.imageUrlVersion, 2), e.downImage("https://img.bazhuay.com/" + a + "_" + e.data.selTempIndex + "_1.jpg?t=" + e.data.imageUrlVersion, 1) ]).then(function() {
                                    console.log("down comfirm");
                                    var a = e.data.imageArray;
                                    Promise.all([ e.saveImage(a[8]), e.saveImage(a[7]), e.saveImage(a[6]) ]).then(function() {
                                        Promise.all([ e.saveImage(a[5]), e.saveImage(a[4]), e.saveImage(a[3]) ]).then(function() {
                                            Promise.all([ e.saveImage(a[2]), e.saveImage(a[1]), e.saveImage(a[0]) ]).then(function() {
                                                wx.hideLoading(), setTimeout(function() {
                                                    wx.showModal({
                                                        title: "已按顺序保存到相册",
                                                        content: "去朋友圈分享你那牛逼的图片！",
                                                        showCancel: !1,
                                                        confirmText: "好的"
                                                    });
                                                }, 200);
                                            }).catch(function(e) {
                                                console.log("err =", e);
                                            });
                                        }).catch(function(e) {
                                            console.log("err =", e);
                                        });
                                    }).catch(function(e) {
                                        console.log("err =", e);
                                    });
                                }).catch(function(e) {
                                    console.log("down err ", e);
                                });
                            },
                            fail: function(e) {
                                console.log("canvasToTempFilePath =", e);
                            }
                        });
                    }, 100);
                }));
            }
        });
    },
    saveImage: function(e) {
        return new Promise(function(a) {
            wx.saveImageToPhotosAlbum({
                filePath: e,
                success: function(e) {
                    console.log("saveImage =", e), a(e);
                },
                fail: function(e) {
                    console.log("save err =", e);
                }
            });
        });
    },
    downImage: function(a, t) {
        var n = this;
        return new Promise(function(o) {
            wx.downloadFile({
                url: a,
                success: function(a) {
                    n.setData(e({}, "imageArray[" + (t - 1) + "]", a.tempFilePath)), console.log(n.data.imageArray["" + (t - 1)]), 
                    o(a.tempFilePath);
                },
                fail: function(e) {
                    console.log("downFile =", e);
                }
            });
        });
    },
    selImage: function() {
        var e = this;
        wx.showActionSheet({
            itemList: [ "拍照片", "相册照片" ],
            success: function(a) {
                var t = [];
                t = 0 == a.tapIndex ? [ "camera" ] : [ "album" ], wx.chooseImage({
                    count: 1,
                    sizeType: [ "compressed" ],
                    sourceType: t,
                    success: function(a) {
                        e.setData({
                            imageArray: []
                        });
                        var t = a.tempFilePaths[0];
                        wx.setStorageSync("clip_page", {
                            url: t,
                            targetPath: "peitu"
                        }), wx.navigateTo({
                            url: "/pages/clip_square/clip_square"
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: "拿起配图神器，然后朋友圈走一波",
            imageUrl: "/images/share_image.png",
            path: "/pages/index/index"
        };
    }
});