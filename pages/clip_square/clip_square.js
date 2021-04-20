var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../we-cropper/we-cropper.js")), o = wx.getSystemInfoSync(), t = o.windowWidth, r = o.windowHeight - 50, c = "";

Page({
    data: {
        cropperOpt: {
            id: "cropper",
            width: t,
            height: r,
            scale: 2.5,
            zoom: 8,
            cut: {
                x: (t - 300) / 2,
                y: (r - 300) / 2,
                width: 300,
                height: 300
            }
        }
    },
    touchStart: function(e) {
        this.wecropper.touchStart(e);
    },
    touchMove: function(e) {
        this.wecropper.touchMove(e);
    },
    touchEnd: function(e) {
        this.wecropper.touchEnd(e);
    },
    getCropperImage: function() {
        this.wecropper.getCropperImage(function(e) {
            e ? (console.log("clip_square =", e), wx.setStorageSync("clip_square", e), wx.redirectTo({
                url: "/pages/" + c + "/" + c + "?from=clip_squaer"
            })) : console.log("获取图片地址失败，请稍后重试");
        });
    },
    uploadTap: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(o) {
                var t = o.tempFilePaths[0];
                e.wecropper.pushOrign(t);
            }
        });
    },
    onLoad: function(o) {
        var t = this.data.cropperOpt;
        new e.default(t).on("ready", function(e) {}).on("beforeImageLoad", function(e) {
            wx.showToast({
                title: "上传中",
                icon: "loading",
                duration: 2e4
            });
        }).on("imageLoad", function(e) {
            wx.hideToast();
        }).on("beforeDraw", function(e, o) {}).updateCanvas();
        var r = wx.getStorageSync("clip_page");
        this.wecropper.pushOrign(r.url), c = r.targetPath;
    }
});