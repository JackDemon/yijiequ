$(function () {
    var hoverMap = $('.hoverMap');
    var cityImg = $('.cityImg');
    var shop_list_panel = $('.shop_list_panel');
    var map_city_list = $('.map_city_list');
    var province = $('.ShengFen');


    hoverMap.attr("href", "javascript:;");

    hoverMap.click(function (event) {

        $(".city").empty();
        $(".community").empty();

        $.ajax({
            url: "http://123.56.24.109/mybatisForSpring3/QueryAreaController.do",
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                var i=0;
                for (i in data) {

                    $(".city").append("<div class='cityDetial'></div>");
                    $(".cityDetial").eq(i).append(data[i].title);
                }
                console.log(data);
            },
            error: function (error) {
                alert("加载失败，请重试！");
            }
        });
        $.ajax({
            url: "http://123.56.24.109/mybatisForSpring3/QueryAreaDetialController.do",
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                var i=0;
                for (i in data) {
                    $(".community").append("<div class='communityDetial'></div>");
                    $(".communityDetial").eq(i).append(data[i].title);
                }
                console.log(data);
            },
            error: function (error) {
                alert("加载失败，请重试！");
            }
        });

        now_sh = $(this).attr('id');
        // now_name=$(this).attr('name');
        province.html(now_sh);
        map_city_list.show();
    });
});