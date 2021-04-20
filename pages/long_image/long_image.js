var e = void 0;

Page({
    data: {
        longType: 3,
        longImage: [ "", "", "", "", "" ],
        canSave: !1
    },
    onLoad: function(a) {
        console.log("options == ", a.from);
        var t = wx.getStorageSync("longImage") || this.data.longImage, n = {};
        "clip_squaer" === a.from ? (t[(n = wx.getStorageSync("clip_page")).index] = n.url, 
        wx.setStorageSync("longImage", t)) : (t = this.data.longImage, n.longType = 3), 
        console.log("longImage == ", t), this.setData({
            longImage: t,
            canSave: this.checkLongImage(t),
            longType: n.longType || 3
        }), e = wx.createCanvasContext("myCanvas");
    },
    checkLongImage: function(e) {
        return console.log("longImage == ", e, this.data.longType), 3 == this.data.longType ? e.every(function(e, a) {
            return a > 2 || e;
        }) : e.every(function(e) {
            return e;
        });
    },
    longType: function(e) {
        console.log("666 =", this.data.longImage), this.setData({
            longType: Number.parseInt(e.currentTarget.dataset.type)
        }), this.setData({
            canSave: this.checkLongImage(this.data.longImage)
        });
    },
    toLongPreview: function() {
        wx.navigateTo({
            url: "/pages/long_to_preview/long_to_preview"
        });
    },
    selImage: function(e) {
        var a = this, t = e.currentTarget.dataset;
        console.log(t), wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album" ],
            success: function(e) {
                var n = e.tempFilePaths[0];
                wx.setStorageSync("clip_page", {
                    url: n,
                    targetPath: "long_image",
                    index: t.index,
                    longType: a.data.longType
                }), wx.navigateTo({
                    url: "/pages/clip_square/clip_square"
                });
            }
        });
    },
    saveImage: function() {
        var a = this;
        if (!this.data.canSave) return wx.showToast({
            image: "/images/icon_warn.png",
            title: "请先选满图"
        }), 0;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), e.drawImage(this.data.longImage[0], 0, 0, 300, 300), e.drawImage(this.data.longImage[1], 0, 300, 300, 300), 
        e.drawImage(this.data.longImage[2], 0, 600, 300, 300), 5 == this.data.longType && (e.drawImage(this.data.longImage[3], 0, 900, 300, 300), 
        e.drawImage(this.data.longImage[4], 0, 1200, 300, 300)), e.draw(), setTimeout(function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 300,
                height: 300 * a.data.longType,
                destWidth: 300,
                destHeight: 300 * a.data.longType,
                canvasId: "myCanvas",
                success: function(e) {
                    console.log("= ", e.tempFilePath), wx.hideLoading(), wx.saveImageToPhotosAlbum({
                        filePath: e.tempFilePath,
                        success: function(e) {
                            console.log("scc =", e);
                        },
                        fail: function(e) {
                            console.log("save 2 eer =", e);
                        }
                    });
                },
                fail: function(e) {
                    console.log("err", e);
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