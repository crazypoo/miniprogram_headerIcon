function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.HTTP = void 0;

var t = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), r = require("../config.js"), n = require("./tips.js"), o = function() {
    function o() {
        e(this, o);
    }
    return t(o, [ {
        key: "request",
        value: function(e) {
            var t = this;
            wx.request({
                url: r.config.api_base_url + e.url,
                method: e.method || "GET",
                data: e.data || {},
                header: {
                    "content-type": "application/json"
                },
                success: function(r) {
                    r.statusCode.toString().startsWith("2") ? e.success && e.success(r.data) : t._show_error();
                },
                fail: function(e) {
                    t._show_error(100);
                }
            });
        }
    }, {
        key: "_show_error",
        value: function(e) {
            e = e || 1, wx.showToast({
                title: n.tips[e],
                icon: "none",
                duration: 2e3
            });
        }
    } ]), o;
}();

exports.HTTP = o;