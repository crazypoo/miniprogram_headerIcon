getApp(), Page({
    data: {},
    toNine: function(e) {
		//源码来自山河源码 www.52shanhe.com
        var a = e.currentTarget.dataset;
        if (console.log(a), wx.getStorageSync("clip_square") || "peitu" == a.page || "word" == a.page || "long_image" == a.page) return wx.navigateTo({
            url: "/pages/" + a.page + "/" + a.page
        }), 0;
        wx.showActionSheet({
            itemList: [ "拍照片", "相册照片" ],
            success: function(e) {
                var t = [];
                t = 0 == e.tapIndex ? [ "camera" ] : [ "album" ], wx.chooseImage({
                    count: 1,
                    sizeType: [ "compressed" ],
                    sourceType: t,
                    success: function(e) {
                        var t = e.tempFilePaths[0];
                        wx.setStorageSync("clip_page", {
                            url: t,
                            targetPath: "" + a.page
                        }), wx.navigateTo({
                            url: "/pages/clip_square/clip_square"
                        });
                    }
                });
            }
        });
    },
    
    toClip: function() {
        wx.chooseImage({
            success: function(e) {
                wx.navigateTo({
                    url: "/pages/clip_square/clip_square?url=" + e.tempFilePaths[0] + "&targetPath=logs"
                });
            }
        });
    },
    onLoad: function() {},
    getUserInfo: function(e) {
        if (console.log(e.detail), e.detail.errMsg.includes("ok")) {
            var a = JSON.parse(e.detail.rawData);
            a.avatarUrl = a.avatarUrl.replace("/132", "/0"), wx.setStorageSync("userInfo", a), 
            wx.navigateTo({
                url: "/pages/avatar/avatar?target=userInfo"
            });
        } else console.log("ee =", e), this.toNine(e);
    },
    toPuzzle: function(e) {
        wx.navigateTo({
            url: "/pages/puzzle/puzzle"
        });
    },
    toPeitu: function() {
        wx.navigateTo({
            url: "/pages/peitu/peitu"
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