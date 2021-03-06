var t = t || function(t, n) {
    var i = {}, e = i.lib = {}, r = function() {}, s = e.Base = {
        extend: function(t) {
            r.prototype = this;
            var n = new r();
            return t && n.mixIn(t), n.hasOwnProperty("init") || (n.init = function() {
                n.$super.init.apply(this, arguments);
            }), n.init.prototype = n, n.$super = this, n;
        },
        create: function() {
            var t = this.extend();
            return t.init.apply(t, arguments), t;
        },
        init: function() {},
        mixIn: function(t) {
            for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
            t.hasOwnProperty("toString") && (this.toString = t.toString);
        },
        clone: function() {
            return this.init.prototype.extend(this);
        }
    }, o = e.WordArray = s.extend({
        init: function(t, n) {
            t = this.words = t || [], this.sigBytes = void 0 != n ? n : 4 * t.length;
        },
        toString: function(t) {
            return (t || c).stringify(this);
        },
        concat: function(t) {
            var n = this.words, i = t.words, e = this.sigBytes;
            if (t = t.sigBytes, this.clamp(), e % 4) for (var r = 0; r < t; r++) n[e + r >>> 2] |= (i[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 24 - (e + r) % 4 * 8; else if (65535 < i.length) for (r = 0; r < t; r += 4) n[e + r >>> 2] = i[r >>> 2]; else n.push.apply(n, i);
            return this.sigBytes += t, this;
        },
        clamp: function() {
            var n = this.words, i = this.sigBytes;
            n[i >>> 2] &= 4294967295 << 32 - i % 4 * 8, n.length = t.ceil(i / 4);
        },
        clone: function() {
            var t = s.clone.call(this);
            return t.words = this.words.slice(0), t;
        },
        random: function(n) {
            for (var i = [], e = 0; e < n; e += 4) i.push(4294967296 * t.random() | 0);
            return new o.init(i, n);
        }
    }), a = i.enc = {}, c = a.Hex = {
        stringify: function(t) {
            var n = t.words;
            t = t.sigBytes;
            for (var i = [], e = 0; e < t; e++) {
                var r = n[e >>> 2] >>> 24 - e % 4 * 8 & 255;
                i.push((r >>> 4).toString(16)), i.push((15 & r).toString(16));
            }
            return i.join("");
        },
        parse: function(t) {
            for (var n = t.length, i = [], e = 0; e < n; e += 2) i[e >>> 3] |= parseInt(t.substr(e, 2), 16) << 24 - e % 8 * 4;
            return new o.init(i, n / 2);
        }
    }, u = a.Latin1 = {
        stringify: function(t) {
            var n = t.words;
            t = t.sigBytes;
            for (var i = [], e = 0; e < t; e++) i.push(String.fromCharCode(n[e >>> 2] >>> 24 - e % 4 * 8 & 255));
            return i.join("");
        },
        parse: function(t) {
            for (var n = t.length, i = [], e = 0; e < n; e++) i[e >>> 2] |= (255 & t.charCodeAt(e)) << 24 - e % 4 * 8;
            return new o.init(i, n);
        }
    }, h = a.Utf8 = {
        stringify: function(t) {
            try {
                return decodeURIComponent(escape(u.stringify(t)));
            } catch (t) {
                throw Error("Malformed UTF-8 data");
            }
        },
        parse: function(t) {
            return u.parse(unescape(encodeURIComponent(t)));
        }
    }, f = e.BufferedBlockAlgorithm = s.extend({
        reset: function() {
            this._data = new o.init(), this._nDataBytes = 0;
        },
        _append: function(t) {
            "string" == typeof t && (t = h.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes;
        },
        _process: function(n) {
            var i = this._data, e = i.words, r = i.sigBytes, s = this.blockSize, a = r / (4 * s);
            if (n = (a = n ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0)) * s, r = t.min(4 * n, r), 
            n) {
                for (var c = 0; c < n; c += s) this._doProcessBlock(e, c);
                c = e.splice(0, n), i.sigBytes -= r;
            }
            return new o.init(c, r);
        },
        clone: function() {
            var t = s.clone.call(this);
            return t._data = this._data.clone(), t;
        },
        _minBufferSize: 0
    });
    e.Hasher = f.extend({
        cfg: s.extend(),
        init: function(t) {
            this.cfg = this.cfg.extend(t), this.reset();
        },
        reset: function() {
            f.reset.call(this), this._doReset();
        },
        update: function(t) {
            return this._append(t), this._process(), this;
        },
        finalize: function(t) {
            return t && this._append(t), this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function(t) {
            return function(n, i) {
                return new t.init(i).finalize(n);
            };
        },
        _createHmacHelper: function(t) {
            return function(n, i) {
                return new l.HMAC.init(t, i).finalize(n);
            };
        }
    });
    var l = i.algo = {};
    return i;
}(Math);

!function(n) {
    function i(t, n, i, e, r, s, o) {
        return ((t = t + (n & i | ~n & e) + r + o) << s | t >>> 32 - s) + n;
    }
    function e(t, n, i, e, r, s, o) {
        return ((t = t + (n & e | i & ~e) + r + o) << s | t >>> 32 - s) + n;
    }
    function r(t, n, i, e, r, s, o) {
        return ((t = t + (n ^ i ^ e) + r + o) << s | t >>> 32 - s) + n;
    }
    function s(t, n, i, e, r, s, o) {
        return ((t = t + (i ^ (n | ~e)) + r + o) << s | t >>> 32 - s) + n;
    }
    for (var o = t, a = (u = o.lib).WordArray, c = u.Hasher, u = o.algo, h = [], f = 0; 64 > f; f++) h[f] = 4294967296 * n.abs(n.sin(f + 1)) | 0;
    u = u.MD5 = c.extend({
        _doReset: function() {
            this._hash = new a.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
        },
        _doProcessBlock: function(t, n) {
            for (o = 0; 16 > o; o++) c = t[a = n + o], t[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8);
            var o = this._hash.words, a = t[n + 0], c = t[n + 1], u = t[n + 2], f = t[n + 3], l = t[n + 4], p = t[n + 5], d = t[n + 6], g = t[n + 7], y = t[n + 8], _ = t[n + 9], v = t[n + 10], w = t[n + 11], B = t[n + 12], m = t[n + 13], x = t[n + 14], S = t[n + 15], H = o[0], z = o[1], M = o[2], C = o[3], z = s(z = s(z = s(z = s(z = r(z = r(z = r(z = r(z = e(z = e(z = e(z = e(z = i(z = i(z = i(z = i(z, M = i(M, C = i(C, H = i(H, z, M, C, a, 7, h[0]), z, M, c, 12, h[1]), H, z, u, 17, h[2]), C, H, f, 22, h[3]), M = i(M, C = i(C, H = i(H, z, M, C, l, 7, h[4]), z, M, p, 12, h[5]), H, z, d, 17, h[6]), C, H, g, 22, h[7]), M = i(M, C = i(C, H = i(H, z, M, C, y, 7, h[8]), z, M, _, 12, h[9]), H, z, v, 17, h[10]), C, H, w, 22, h[11]), M = i(M, C = i(C, H = i(H, z, M, C, B, 7, h[12]), z, M, m, 12, h[13]), H, z, x, 17, h[14]), C, H, S, 22, h[15]), M = e(M, C = e(C, H = e(H, z, M, C, c, 5, h[16]), z, M, d, 9, h[17]), H, z, w, 14, h[18]), C, H, a, 20, h[19]), M = e(M, C = e(C, H = e(H, z, M, C, p, 5, h[20]), z, M, v, 9, h[21]), H, z, S, 14, h[22]), C, H, l, 20, h[23]), M = e(M, C = e(C, H = e(H, z, M, C, _, 5, h[24]), z, M, x, 9, h[25]), H, z, f, 14, h[26]), C, H, y, 20, h[27]), M = e(M, C = e(C, H = e(H, z, M, C, m, 5, h[28]), z, M, u, 9, h[29]), H, z, g, 14, h[30]), C, H, B, 20, h[31]), M = r(M, C = r(C, H = r(H, z, M, C, p, 4, h[32]), z, M, y, 11, h[33]), H, z, w, 16, h[34]), C, H, x, 23, h[35]), M = r(M, C = r(C, H = r(H, z, M, C, c, 4, h[36]), z, M, l, 11, h[37]), H, z, g, 16, h[38]), C, H, v, 23, h[39]), M = r(M, C = r(C, H = r(H, z, M, C, m, 4, h[40]), z, M, a, 11, h[41]), H, z, f, 16, h[42]), C, H, d, 23, h[43]), M = r(M, C = r(C, H = r(H, z, M, C, _, 4, h[44]), z, M, B, 11, h[45]), H, z, S, 16, h[46]), C, H, u, 23, h[47]), M = s(M, C = s(C, H = s(H, z, M, C, a, 6, h[48]), z, M, g, 10, h[49]), H, z, x, 15, h[50]), C, H, p, 21, h[51]), M = s(M, C = s(C, H = s(H, z, M, C, B, 6, h[52]), z, M, f, 10, h[53]), H, z, v, 15, h[54]), C, H, c, 21, h[55]), M = s(M, C = s(C, H = s(H, z, M, C, y, 6, h[56]), z, M, S, 10, h[57]), H, z, d, 15, h[58]), C, H, m, 21, h[59]), M = s(M, C = s(C, H = s(H, z, M, C, l, 6, h[60]), z, M, w, 10, h[61]), H, z, u, 15, h[62]), C, H, _, 21, h[63]);
            o[0] = o[0] + H | 0, o[1] = o[1] + z | 0, o[2] = o[2] + M | 0, o[3] = o[3] + C | 0;
        },
        _doFinalize: function() {
            var t = this._data, i = t.words, e = 8 * this._nDataBytes, r = 8 * t.sigBytes;
            i[r >>> 5] |= 128 << 24 - r % 32;
            var s = n.floor(e / 4294967296);
            for (i[15 + (r + 64 >>> 9 << 4)] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), 
            i[14 + (r + 64 >>> 9 << 4)] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8), 
            t.sigBytes = 4 * (i.length + 1), this._process(), i = (t = this._hash).words, e = 0; 4 > e; e++) r = i[e], 
            i[e] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);
            return t;
        },
        clone: function() {
            var t = c.clone.call(this);
            return t._hash = this._hash.clone(), t;
        }
    }), o.MD5 = c._createHelper(u), o.HmacMD5 = c._createHmacHelper(u);
}(Math), module.exports = {
    createSign: function(n, i) {
        n = n.sort();
        for (var e = "", r = 0; r < n.length; r++) null !== n[r][1] && void 0 !== n[r][1] && "" !== n[r][1] && (e += n[r][0] + "=" + n[r][1] + "&");
        return e += "key=" + i, ("" + t.MD5(e)).toUpperCase();
    }
};