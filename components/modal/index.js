var t = wx.createAnimation({
    duration: 200,
    timingFunction: "linear",
    delay: 0
});

Component({
    properties: {
        showStatus: {
            type: Boolean,
            value: !1,
            observer: function(e, a) {
                this.animation = t, t.opacity(0).step(), e ? (this.setData({
                    animationData: t.export(),
                    showStatus: e
                }), setTimeout(function() {
                    t.opacity(1).step(), this.setData({
                        animationData: t.export()
                    });
                }.bind(this), 200)) : (this.setData({
                    animationData: t.export()
                }), setTimeout(function() {
                    this.setData({
                        animationData: t.export(),
                        showStatus: !1
                    });
                }.bind(this), 200));
            }
        },
        type: {
            type: String,
            value: "",
            observer: function(t, e) {
                this.setData({
                    type: t
                });
            }
        },
        formItems: {
            type: Array,
            value: [],
            observer: function(t, e) {
                this.setData({
                    items: t
                });
            }
        },
        showCancel: {
            type: Boolean,
            value: !1,
            observer: function(t, e) {
                this.setData({
                    showCancel: t
                });
            }
        },
        title: {
            type: String,
            value: "",
            observer: function(t, e) {
                this.setData({
                    title: t
                });
            }
        },
        content: {
            type: String,
            value: "",
            observer: function(t, e) {
                this.setData({
                    content: t
                });
            }
        },
        cancelText: {
            type: String,
            value: "取消",
            observer: function(t, e) {
                this.setData({
                    cancelText: t
                });
            }
        },
        confirmText: {
            type: String,
            value: "好的",
            observer: function(t, e) {
                this.setData({
                    confirmText: t
                });
            }
        }
    },
    data: {
        animationData: {}
    },
    attached: function() {},
    ready: function() {},
    methods: {
        cancelFunc: function() {
            this.setData({
                showStatus: !1
            });
            var t = {
                confirm: !1
            }, e = {};
            this.triggerEvent("complete", t, e);
        },
        confirmFunc: function(t) {
            var e = this;
            this.setData({
                showStatus: !1
            });
            var a = {
                confirm: !0
            };
            "prompt" === this.data.type && (a.formData = t.detail.value, this.triggerEvent("complete", a)), 
            "openSetting" === this.data.type && wx.openSetting({
                success: function(t) {
                    a.authSetting = t.authSetting, e.triggerEvent("complete", a);
                }
            }), "getUserInfo" === this.data.type && (t.detail.userInfo ? (a.hasUserInfo = !0, 
            a.userInfo = t.detail.userInfo) : a.hasUserInfo = !1, this.triggerEvent("complete", a));
        }
    }
});