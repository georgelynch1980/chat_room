(function () {
    APP.SomeView = Backbone.View.extend({
        el: $("body"),
        initialize: function () {
            var _self = this;
            console.log("SomeView!!!!!");
        },
        events: {
            "click #top_rule": "rule",
            "click #download_checkbox img": "rule",
            "click #success_close": "successClose",
            "click #err_close": "errClose",
            "click #rule_close": "ruleClose",
            "click #song-download_close": "songDownloadClose",
            "click #sound-download": "songDownload",
            "click #all-cb": "all",
            "click #video-err_close": "videoErr"
        },
        rule: function () {
            $("#rule").show();
        },
        successClose: function () {
            $("#success").hide();
        },
        errClose: function () {
            $("#err").hide();
        },
        ruleClose: function () {
            $("#rule").hide();
        },
        songDownloadClose: function () {
            $("#song-download").hide();
        },
        songDownload: function () {
            ga('send', 'event', 'button', 'click', '/download_final');
        },
        all: function () {
            ga('send', 'event', 'button', 'click', '/selectall');
        },
        videoErr: function () {
            $("#video-err").hide();
        }
    });
})();