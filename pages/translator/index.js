var t = require("../../utils/utils.js"), a = wx.createInnerAudioContext(), s = function(t, a) {
    wx.getSetting({
        success: function(s) {
            s.authSetting["scope.record"] ? t && t() : wx.authorize({
                scope: "scope.record",
                success: function() {
                    t && t();
                },
                fail: function() {
                    wx.startRecord({
                        success: function() {
                            return wx.stopRecord(), !1;
                        },
                        fail: function() {
                            a && a();
                        }
                    });
                }
            });
        }
    });
};

Component({
    data: {
        manTips: "长按录人话",
        petsTips: "长按录喵语",
        isCat: !0,
        changeLangTips: "",
        themeColor: "#FF95AC",
        audioList: [],
        sayingsList: [],
        voiceIndex: -1,
        touchStartTime: 0,
        isTranslator: !1,
        showModal: !1,
        type: "openSetting",
        showCancel: !1,
        title: "",
        content: "翻译器需要您的录音权限才能听懂您和喵/汪星人的话哦！",
        confirmText: "好的",
        items: [ {
            label: "请输入姓名",
            name: "name"
        } ]
    },
    pageLifetimes: {
        show: function() {
            var s = this;
            a.onPlay(function() {
                s.setData({
                    manTips: s.data.isTranslator ? "正在播放..." : "长按录人话"
                });
            }), a.onError(function(t) {
                console.log(t.errMsg), console.log(t.errCode);
            }), this.setData({
                changeLangTips: this.data.isCat ? "切换汪语" : "切换喵语",
                audioList: this.data.isCat ? t.catVoiceList : t.dogVoiceList,
                sayingsList: this.data.isCat ? t.catSaysList : t.dogSaysList,
                manTips: "长按录人话"
            }), "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
                selected: 0
            });
        }
    },
    methods: {
        onManSayingStart: function() {
            var t = this;
            s(function() {
                a.stop && a.stop(), t.setData({
                    manTips: "正在聆听...",
                    petsTips: t.data.isCat ? "长按录喵语" : "长按录汪语",
                    touchStartTime: Date.now(),
                    isTranslator: !0,
                    voiceIndex: -1
                }), wx.startRecord({
                    success: function(t) {
                        console.log(t);
                    },
                    fail: function() {}
                });
            }, function() {
                t.setData({
                    showModal: !0
                });
            });
        },
        onManSayingEnd: function() {
            var t = this;
            s(function() {
                if (Date.now() - t.data.touchStartTime < 1e3) return t.setData({
                    manTips: "录音时间太短，无法识别"
                }), !1;
                wx.stopRecord({
                    success: function() {},
                    fail: function() {}
                });
                var s = Math.floor(Math.random() * (1 + (t.data.isCat ? 11 : 13)));
                a.src = "https://res.maoyugou.cn/sound/translate/" + (t.data.isCat ? "cat" : "dog") + "/" + s + ".mp3", 
                a.onEnded(function() {
                    t.setData({
                        manTips: "长按录人话",
                        isTranslator: !1
                    });
                }), a.play();
            }, function() {
                t.setData({
                    showModal: !0
                });
            });
        },
        onManSayingCancel: function() {
            console.log("cancel"), this.setData({
                manTips: "长按录人话"
            }), wx.stopRecord({
                success: function() {},
                fail: function() {}
            });
        },
        onPetsSayingStart: function() {
            var t = this;
            s(function() {
                a.stop(), t.setData({
                    petsTips: "正在聆听...",
                    manTips: "长按录人话",
                    touchStartTime: Date.now()
                }), wx.startRecord({
                    success: function(t) {
                        console.log(t);
                    },
                    fail: function() {}
                });
            }, function() {
                t.setData({
                    showModal: !0
                });
            });
        },
        onPetsSayingEnd: function() {
            var a = this;
            s(function() {
                if (Date.now() - a.data.touchStartTime < 1e3) return a.setData({
                    petsTips: "录音时间太短，无法识别"
                }), !1;
                var s = Math.floor(Math.random() * (a.data.sayingsList.length + 1));
                a.setData({
                    petsTips: t.dogSaysList[s]
                }), wx.stopRecord({
                    success: function() {},
                    fail: function() {}
                });
            }, function() {
                a.setData({
                    showModal: !0
                });
            });
        },
        onPetsSayingCancel: function() {
            s(function() {}), this.setData({
                petsTips: this.data.isCat ? "长按录喵语" : "长按录汪语"
            }), wx.stopRecord({
                success: function() {},
                fail: function() {}
            });
        },
        onLangChange: function() {
            a.stop(), this.setData({
                isCat: !this.data.isCat,
                changeLangTips: this.data.isCat ? "切换喵语" : "切换汪语",
                themeColor: this.data.isCat ? "#53BDD5" : "#FF95AC",
                petsTips: this.data.isCat ? "长按录汪语" : "长按录喵语",
                manTips: "长按录人话",
                audioList: this.data.isCat ? t.dogVoiceList : t.catVoiceList,
                sayingsList: this.data.isCat ? t.catSaysList : t.dogSaysList,
                voiceIndex: -1
            });
        },
        onVoiceTapped: function(s) {
            var n = this, o = s.currentTarget.dataset.index;
            this.data.voiceIndex === o ? (a.stop(), this.setData({
                voiceIndex: -1
            })) : (this.setData({
                voiceIndex: o,
                manTips: "长按录人话",
                isTranslator: !1
            }), a.stop(), a.src = "https://res.maoyugou.cn/sound/normal/" + (this.data.isCat ? "cat" : "dog") + "/" + encodeURIComponent(this.data.isCat ? t.catVoiceList[o] : t.dogVoiceList[o]) + ".mp3", 
            console.log(a.src), a.onEnded(function() {
                a.stop(), n.setData({
                    voiceIndex: -1
                }), console.log("voiceEnd");
            }), a.onPlay(function() {
                console.log("voicePlaying");
            }), a.onError(function(t) {
                console.log(t);
            }), a.play());
        },
        preventBuble: function() {}
    }
});