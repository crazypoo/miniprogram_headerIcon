var e = require("./sign.js"), t = require("./config.js"), n = require("./qiniuUploader-min.js"), o = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    formatTime: function(e) {
        var t = e.getFullYear(), n = e.getMonth() + 1, r = e.getDate(), i = e.getHours(), a = e.getMinutes(), u = e.getSeconds();
        return [ t, n, r ].map(o).join("/") + " " + [ i, a, u ].map(o).join(":");
    },
    uploader: function(o) {
        return new Promise(function(r, i) {
            var a = Math.random(), u = new Date().getTime(), g = [ [ "nonceStr", a ], [ "timestamp", u ] ], c = e.createSign(g, "QNAoXUqcIZfg1t2YKS2"), m = t.apiUrlTest + "/shunpai/intf/getQiniuUpToken.do?spsign=" + c + "&nonceStr=" + a + "&timestamp=" + u;
            n.upload(o, function(e) {
                r(e);
            }, function(e) {
                i(e), console.log("error: " + e);
            }, {
                region: "ECN",
                key: new Date().getTime() + "" + Math.floor(99 * Math.random()) + ".jpg",
                domain: "http://img.bazhuay.com",
                uptokenURL: m
            });
        });
    },
    getTime: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date().getTime(), t = new Date(e), n = {
            year: t.getFullYear(),
            month: t.getMonth() + 1,
            day: t.getDate(),
            hour: t.getHours(),
            minute: t.getMinutes()
        };
        for (var o in n) n[o] < 10 && (n[o] = "0" + n[o]);
        return n.year + "-" + n.month + "-" + n.day + " " + n.hour + ":" + n.minute;
    },
    getTime2: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date().getTime(), t = new Date(e), n = {
            year: t.getFullYear(),
            month: t.getMonth() + 1,
            day: t.getDate()
        };
        for (var o in n) n[o] < 10 && (n[o] = "0" + n[o]);
        return n.year + "-" + n.month + "-" + n.day;
    },
    getMiniCode: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return e.width || (e.width = 50), e.auto_color || (e.auto_color = !1), e.line_color || (e.line_color = '{ "r": "0", "g": "0", "b": "0" }'), 
        e.scene || (e.scene = "scene"), new Promise(function(n, o) {
            wx.request({
                url: t.apiUrlTest + "/shunpai/intf/getMiniCode.do",
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: e,
                success: function(e) {
                    n(e);
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    }
};