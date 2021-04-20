Component({
    properties: {
        openType: {
            type: String
        }
    },
    options: {
        multipleSlots: !0
    },
    data: {},
    methods: {
        onGetUserInfo: function(t) {
            this.triggerEvent("getuserinfo", t.detail, {});
        }
    }
});