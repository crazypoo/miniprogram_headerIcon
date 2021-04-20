Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.promisify = function(e) {
    return function(r) {
        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
        return new Promise(function(t, o) {
            e.apply(void 0, [ Object.assign({}, r, {
                success: t,
                fail: o
            }) ].concat(n));
        });
    };
};