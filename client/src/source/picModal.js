$("body").on('click', ".imgsWrap img", function () {
    //alert($(this).attr('src'));
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
})