var t = null, e = null, o = null, a = "";

Page({
    data: {
        content: "",
        words: "说正经事专用配图。",
        bgColor: [ "#fff", "#E1E1E1", "#FF5A5A", "#5B9AED", "#25B890", "#F7A633", "#8CD6FF", "#FE76B1", "#FFDFE3" ],
        bgColor2: [ "https://img.bazhuay.com/pt_bg_item_1.png", "https://img.bazhuay.com/pt_bg_item_2.png", "https://img.bazhuay.com/pt_bg_item_3.png", "https://img.bazhuay.com/pt_bg_item_4.png" ],
        bgColor3: [ "#fff", "#000", "#5B9AED", "#25B890", "#F7A633", "#8CD6FF", "#FE76B1", "#FFDFE3" ],
        bgColorSel: [ 2, -1, 0 ],
        bgImage: ""
    },
    ad_set: function() {
        var e = this;
        wx.createRewardedVideoAd && ((t = wx.createRewardedVideoAd({
            adUnitId: "adunit-233748f2b18e4261"
        })).onLoad(function() {
            console.log("激励广告拉取成功");
        }), t.onError(function(t) {
            wx.showModal({
                title: "提示",
                content: "视频广告拉取失败"
            });
        }), t.onClose(function(t) {
            t && t.isEnded || void 0 === t ? (console.log("发放奖励"), e.saveImage12()) : wx.showModal({
                title: "提示",
                content: "Sorry...您需要看完视频才能下载～",
                showCancel: !1,
                confirmText: "好的"
            });
        }));
    },
    onLoad: function(t) {
        this.ad_set(), wx.cloud.init(), e = wx.createCanvasContext("myCanvas"), o && clearInterval(o);
    },
    changeWord: function(t) {
        var e = t.currentTarget.dataset.words;
        e || (e = "现在请开始你的表演"), this.setData({
            words: e
        });
    },
    selBgColor: function(t) {
        var e = this, o = t.currentTarget.dataset, a = this.data.bgColorSel;
        "0" === o.item ? (a[0] = o.index, a[1] = -1) : "1" === o.item ? (a[0] = -1, a[1] = o.index) : "2" === o.item && (a[2] = o.index), 
        this.setData({
            bgColorSel: a
        }), console.log(o.url), o.url && wx.downloadFile({
            url: o.url,
            success: function(t) {
                e.setData({
                    bgImage: t.tempFilePath
                });
            },
            fail: function(t) {
                console.log(" --- ", t);
            }
        });
    },
    confirmInput: function(t) {
        var e = this;
        a && clearTimeout(a), a = setTimeout(function() {
            e.setData({
                wordsTemp: t.detail.value
            });
        }, 700), wx.cloud.callFunction({
            name: "ContentCheck",
            data: {},
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    saveImage: function() {
        console.log("打开激励视频"), wx.showModal({
            title: "提示",
            content: "观看视频广告即可保存",
            success: function(e) {
                e.confirm ? (console.log("用户点击确定"), t && t.show().catch(function() {
                    t.load().then(function() {
                        return t.show();
                    }).catch(function(t) {
                        console.log("激励视频 广告显示失败");
                    });
                })) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    saveImage12: function() {
        var t = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        });
        var e = this.data.bgColorSel, a = this.data.words, n = 0;
        o = setInterval(function() {
            if (n >= 9) return clearInterval(o), wx.hideLoading(), wx.showModal({
                title: "已按顺序保存到相册",
                content: "去朋友圈分享你那牛逼的图片！",
                showCancel: !1,
                confirmText: "好的"
            }), 0;
            -1 === e[1] ? t.drawColor(a.substr(8 - n, 1)) : t.drawImage(a.substr(8 - n, 1)), 
            n++;
        }, 300);
    },
    drawColor: function(t) {
        var o = this.data.bgColorSel, a = this.data.bgColor, n = this.data.bgColor3;
        e.setFillStyle(a[o[0]]), e.fillRect(0, 0, 156, 156), e.setTextAlign("center"), e.setFillStyle(n[o[2]]), 
        e.setFontSize(72), e.fillText(t, 78, 100), e.draw(), setTimeout(function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 156,
                height: 156,
                destWidth: 156,
                destHeight: 156,
                canvasId: "myCanvas",
                success: function(t) {
                    console.log("= ", t.tempFilePath), wx.saveImageToPhotosAlbum({
                        filePath: t.tempFilePath,
                        success: function(t) {
                            console.log("scc =", t);
                        },
                        fail: function(t) {
                            console.log("save 2 eer =", t);
                        }
                    });
                },
                fail: function(t) {
                    console.log("err", t);
                }
            });
        }, 200);
    },
    drawImage: function(t) {
        this.data.bgColor;
        var o = this.data.bgColor3, a = this.data.bgColorSel;
        e.drawImage(this.data.bgImage, 0, 0, 156, 156), e.setTextAlign("center"), e.setFillStyle(o[a[2]]), 
        e.setFontSize(72), e.fillText(t, 78, 100), e.draw(), setTimeout(function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 156,
                height: 156,
                destWidth: 156,
                destHeight: 156,
                canvasId: "myCanvas",
                success: function(t) {
                    console.log("= ", t.tempFilePath), wx.saveImageToPhotosAlbum({
                        filePath: t.tempFilePath,
                        success: function(t) {
                            console.log("scc =", t);
                        },
                        fail: function(t) {
                            console.log("save 2 eer =", t);
                        }
                    });
                },
                fail: function(t) {
                    console.log("err", t);
                }
            });
        }, 200);
    },
    onShareAppMessage: function() {
        return {
            title: "拿起配图神器，然后朋友圈走一波",
            imageUrl: "/images/share_image.png",
            path: "/pages/index/index"
        };
    }
});