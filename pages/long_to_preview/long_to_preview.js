Page({
    data: {},
    onLoad: function(e) {},
    toIndex: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    toBack: function() {
        wx.navigateBack({});
    },
    toPreview: function(e) {
        var n = e.currentTarget.dataset;
        console.log(n), wx.previewImage({
            urls: [ "https://img.bazhuay.com/long_image_preview_" + (n.index + 1) + ".png" ]
        });
    },
    onShareAppMessage: function() {}
});