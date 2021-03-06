(function () {
    Number.isInteger = Number.isInteger || function (value) {
        return typeof value === 'number' &&
            isFinite(value) &&
            Math.floor(value) === value;
    };
    var Cookie = require('tiny-cookie');

    var VueCookie = {

        install: function (Vue) {
            Vue.prototype.$cookie = this;
            Vue.cookie = this;
        },
        set: function (name, value, daysOrOptions) {
            var opts = daysOrOptions;
            if(Number.isInteger(daysOrOptions)) {
                opts = {expires: daysOrOptions};
            }

            return Cookie.set(name, value, opts);
        },
        setObject: function(name, value, daysOrOptions) {
            try {
                var result = JSON.stringify(value);
                if (/^[\{\[]/.test(result)) {
                    value = result;
                }
            } catch (e) {}

            return this.set(name, value, daysOrOptions);
        },
        get: function (name) {
            return Cookie.get(name);
        },
        getObject: function (name) {
            var cookie = this.get(name);

            try {
                cookie = JSON.parse(cookie);
            } catch (e) {}

            return cookie;
        },

        delete: function (name, options) {
            var opts = {expires: -1};
            if(options !== undefined) {
                opts = Object.assign(options, opts);
            }
            this.set(name, '', opts);
        }
    };

    if (typeof exports == "object") {
        module.exports = VueCookie;
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return VueCookie; })
    } else if (window.Vue) {
        window.VueCookie = VueCookie;
        Vue.use(VueCookie);
    }

})();
