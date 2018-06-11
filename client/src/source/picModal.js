$(function () {
    if (!wx) {
        $('body').append("<div class='mb-wrapper imgShow'><img src='" + $(this).attr('src') + "'/></div>");
        window.setTimeout(function () {
            $('.imgShow>img').addClass('show');
        }, 50);
        $(".imgShow").one("click", function () {
            var _self = this;
            $(this).find("img").removeClass('show');
            window.setTimeout(function () {
                $(_self).remove();
            }, 300);

        });
    } else {
        // $("body").on('click', ".imgsWrap img", function () {
        //     //alert($(this).attr('src'));
        //     var curImageSrc = $(this).attr('src');
        //     var imgArray = [];
        //     $('.imgsWrap img').each(function (index, el) {
        //         var itemSrc = $(this).attr('src');
        //         imgArray.push(itemSrc);
        //     });
        //     wx.previewImage({
        //         current: curImageSrc,
        //         urls: imgArray
        //     });
        // });
        var imgArray = []
        $.each($('.imgsWrap img'), function (index, el) {
            if (el.src) {
                imgArray.push(el.src);
                $(el).click(function () {
                    wx.previewImage({
                        current: this.src,
                        urls: imgArray
                    });
                })
            }
        })
    }
})