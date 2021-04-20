var e = null, t = void 0, a = {}, n = null;

Page({
    data: {
        imageArray: [],
        clipSquare: "",
        templateNum: 6,
        selTemplate: 0
    },
    ad_set: function() {
        var t = this;
        wx.createRewardedVideoAd && ((e = wx.createRewardedVideoAd({
            adUnitId: "adunit-233748f2b18e4261"
        })).onLoad(function() {
            console.log("激励广告拉取成功");
        }), e.onError(function(e) {
            wx.showModal({
                title: "提示",
                content: "视频广告拉取失败"
            });
        }), e.onClose(function(e) {
            e && e.isEnded || void 0 === e ? (console.log("发放奖励"), t.btnSave()) : wx.showModal({
                title: "提示",
                content: "Sorry...您需要看完视频才能下载～",
                showCancel: !1,
                confirmText: "好的"
            });
        }));
    },
    onLoad: function() {
        this.ad_set();
        var e = wx.getStorageSync("clip_square");
        this.setData({
            clipSquare: e
        }), t = wx.createCanvasContext("myCanvas");
    },
    onReady: function() {
        this.clipImage(this.data.clipSquare);
    },
    btnSave1: function() {
        console.log("打开激励视频"), wx.showModal({
            title: "提示",
            content: "观看视频广告即可保存",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), e && e.show().catch(function() {
                    e.load().then(function() {
                        return e.show();
                    }).catch(function(e) {
                        console.log("激励视频 广告显示失败");
                    });
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    btnSave: function() {
        var e = this, t = this.data.imageArray;
        if (9 != t.length) return wx.showToast({
            title: "请先选择模板",
            image: "/images/icon_warn.png"
        }), 0;
        wx.showLoading({
            title: "保存中...",
            mask: !0
        }), wx.getSetting({
            success: function(a) {
                var n = a.authSetting["scope.writePhotosAlbum"];
                !1 === n ? (wx.hideLoading(), wx.openSetting({})) : (n || wx.hideLoading(), Promise.all([ e.saveImage(t[8]), e.saveImage(t[7]), e.saveImage(t[6]), e.saveImage(t[5]), e.saveImage(t[4]) ]).then(function() {
                    Promise.all([ e.saveImage(t[3]), e.saveImage(t[2]), e.saveImage(t[1]), e.saveImage(t[0]) ]).then(function() {
                        console.log("save comfirm"), wx.hideLoading(), wx.showModal({
                            title: "已按顺序保存到相册",
                            content: "去朋友圈分享你那牛逼的图片！",
                            showCancel: !1,
                            confirmText: "好的"
                        });
                    }).catch(function(e) {
                        console.log("err =", e);
                    });
                }).catch(function(e) {
                    console.log("err =", e);
                }));
            }
        });
    },
    saveImage: function(e) {
        return console.log("url =", e), new Promise(function(t) {
            wx.saveImageToPhotosAlbum({
                filePath: e.url,
                success: function(e) {
                    t(e);
                },
                fail: function(e) {
                    console.log("save 2 eer =", e);
                }
            });
        });
    },
    selTemplate: function(e) {
        var t = e.currentTarget.dataset;
        this.setData({
            selTemplate: t.index,
            imageArray: []
        }), this.clipImage(this.data.clipSquare, t.index);
    },
    clipImage: function(e) {
        var n = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        wx.getImageInfo({
            src: e,
            success: function(o) {
                a.width = 300, a.height = 300 * o.height / o.width, 300 > 300 * o.height / o.width && (o.height, 
                o.width), t.drawImage(e, 0, 0, 300, 300 * o.height / o.width), console.log("num =", i), 
                i > 0 && t.drawImage("/images/temp_" + i + "_has.png", 0, 0, 300, 300), t.drawImage("/images/word_logo.png", 225, 270, 75, 30), 
                t.draw(), setTimeout(function() {
                    wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: 300,
                        height: 300 * o.height / o.width,
                        destWidth: 300,
                        destHeight: 300 * o.height / o.width,
                        canvasId: "myCanvas",
                        success: function(e) {
                            console.log("= ", e), n.changeImage();
                        },
                        fail: function(e) {
                            console.log("err", e);
                        }
                    });
                }, 200);
            }
        });
    },
    selImage: function() {
        var e = this;
        wx.showActionSheet({
            itemList: [ "拍照片", "相册照片" ],
            success: function(t) {
                var a = [];
                a = 0 == t.tapIndex ? [ "camera" ] : [ "album" ], wx.chooseImage({
                    count: 1,
                    sizeType: [ "compressed" ],
                    sourceType: a,
                    success: function(t) {
                        e.setData({
                            imageArray: []
                        });
                        var a = t.tempFilePaths[0];
                        wx.setStorageSync("clip_page", {
                            url: a,
                            targetPath: "nine"
                        }), wx.navigateTo({
                            url: "/pages/clip_square/clip_square"
                        });
                    }
                });
            }
        });
    },
    changeImage: function() {
        var e = this;
        wx.showLoading({
            title: "裁切中...",
            mask: !0
        });
        var t = 0;
        n && clearInterval(n), n = setInterval(function() {
            if (t >= 9) return clearInterval(n), wx.hideLoading(), 0;
            t < 3 ? e.changeImage_2(100 * t, 0) : t < 6 ? e.changeImage_2(100 * (t - 3), a.height / 3) : e.changeImage_2(100 * (t - 6), a.height / 3 * 2), 
            t++;
        }, 320);
    },
    changeImage_2: function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = this.data.imageArray;
        wx.canvasToTempFilePath({
            x: t,
            y: n,
            width: 100,
            height: a.height / 3,
            destWidth: 2 * a.width,
            destHeight: 2 * a.height,
            canvasId: "myCanvas",
            success: function(t) {
                i.push({
                    url: t.tempFilePath
                }), e.setData({
                    imageArray: i
                });
            },
            fail: function(e) {
                console.log("err", e);
            }
        });
    },
    selImg: function(e) {
        wx.previewImage({
            urls: [ e.currentTarget.dataset.url ]
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