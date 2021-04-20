function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.baseModel = void 0;

var o = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), r = require("../utils/http.js"), s = (require("../utils/util3.js"), function(s) {
    function i() {
        return e(this, i), t(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments));
    }
    return n(i, r.HTTP), o(i, [ {
        key: "getProfileList",
        value: function(e) {
            var t = parseInt(80 * Math.random() + 1);
            console.log("the number is :", t), this.request({
                url: "content/wxapp/loversProfile/json/lovers-" + t + ".json",
                success: function(t) {
                    e(t);
                }
            });
        }
    }, {
        key: "getBannerList",
        value: function(e) {
            this.request({
                url: "content/json/smallapp/lovers-banner.json",
                success: function(t) {
                    e(t);
                }
            });
        }
    } ]), i;
}());

exports.baseModel = s;