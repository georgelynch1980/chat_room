(function () {
    APP.HomeView = Backbone.View.extend({
        el: $("body"),
        initialize: function () {
            var _self = this;
            console.log("HomeView!!!!!");

            this.$image = $(".cropper"),
            this.cropper,
            this.$inputImage = $("#inputImage"),
            this.blobURL;
            _self.fileUpload();
            
            APP.socket.on('ToCount', function (data) {
                $("#count").html(data.toString);
            });
        },
        events: {
            "click #getDataURL3": "getDataURL",
            "click #startChat": "startChat",
            "focusin #nickname": "nickNameFocusIn",
            "focusout #nickname": "nickNameFocusOut",
            "focusout #count_btn": "count"
        },
        count:function(){
             var counter = { var: 0 };
             TweenMax.to(counter, 1, {
                  var: 9999, 
                  onUpdate: function () {
                      
                      APP.socket.emit('COUNT', {
                          counter: Math.ceil(counter.var)
                      });
                      
                      //console.log(Math.ceil(counter.var));
                  },
                  ease:Circ.easeOut
              });
        },
        nickNameFocusIn: function (e) {
            if ($("#nickname").val() == "我們要怎麼稱呼您呢") $("#nickname").val("");
        },
        nickNameFocusOut: function (e) {
            if ($("#nickname").val() == "") $("#nickname").val("我們要怎麼稱呼您呢");
        },
        fileUpload: function () {
            var _self = this;
            if (window.URL) {
                _self.$inputImage.change(function () {
                    if (!_self.cropper) {
                        _self.initCropper();
                    }
                    var files = this.files,
                        file;

                    if (files && files.length) {
                        file = files[0];

                        if (/^image\/\w+$/.test(file.type)) {
                            if (_self.blobURL) {
                                URL.revokeObjectURL(_self.blobURL); // Revoke the old one
                            }

                            _self.blobURL = URL.createObjectURL(file);
                            _self.$image.cropper("reset", true).cropper("replace", _self.blobURL);
                            _self.$inputImage.val("");
                        }
                    }
                });
            } else {
                _self.$inputImage.parent().remove();
            }
        },
        initCropper: function () {
            var _self = this;
            _self.$image.cropper({
                aspectRatio: 1 / 1,
                autoCropArea: 1,
                data: {
                    x: 420,
                    y: 50,
                    width: 9999,
                    height: 9999
                },
                //preview: ".preview",
                // multiple: true,
                // autoCrop: false,
                // dragCrop: false,
                // dashed: false,
                // modal: false,
                // movable: false,
                resizable: false,
                zoomable: false,
                // rotatable: false,
                // checkImageOrigin: false,
                //maxWidth: 9999,
                //maxHeight: 9999,
                //minWidth: 9999,
                //minHeight: 9999,
                done: function (data) {
                    console.log(data.x);
                    console.log(data.y);
                    console.log(data.height);
                    console.log(data.width);
                },

                build: function (e) {
                    console.log(e.type);
                },

                built: function (e) {
                    console.log(e.type);
                },

                dragstart: function (e) {
                    console.log(e.type);
                },

                dragmove: function (e) {
                    console.log(e.type);
                },

                dragend: function (e) {
                    console.log(e.type);
                }
            });

            _self.cropper = _self.$image.data("cropper");

            _self.$image.on({
                "build.cropper": function (e) {
                    console.log(e.type);
                    // e.preventDefault();
                },
                "built.cropper": function (e) {
                    console.log(e.type);
                    // e.preventDefault();
                },
                "dragstart.cropper": function (e) {
                    console.log(e.type);
                    // e.preventDefault();
                },
                "dragmove.cropper": function (e) {
                    console.log(e.type);
                    // e.preventDefault();
                },
                "dragend.cropper": function (e) {
                    console.log(e.type);
                    // e.preventDefault();
                }
            });
        },
        startChat: function () {
            var _self = this;
            console.log("ok");
            if (!_self.cropper) {
                alert("放張照片可以嗎");
                return;
            }
            _self.getDataURL();
            $("#home").hide();
            APP.socket.emit('add user', {
                username: $('#nickname').val(),
                imgData: _self.imgData
            });
            console.log(_self.imgData);
            $("#all_room img").attr("src",_self.imgData);
            //alert("安安~幾歲住那呢？有照嗎？如果您不想聊天的話題都是這些，請加上基本資訊吧");
        },
        getDataURL: function () {
            var _self = this;
            var dataURL = _self.$image.cropper("getDataURL", {
                width: 40,
                height: 40
            });
            _self.imgData=dataURL;

            //$("#showDataURL").html('<img src="' + dataURL + '">');
        }
    });
})();