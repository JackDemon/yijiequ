/**
 * Created by Administrator on 2016/9/24 0024.
 */
(function () {
    var backgroundImage = [],index = 0,k;
    var partenerClassAllTitle=$($(".partener-class-allTitle")[0]),linklist=$($(".linklist")[0]);
    function addPartnerChange() {
        var titleBlock = $(".partner-class-title");
        var partnerIndex = $(".partnerIndex");
        for (var i = 0; i < titleBlock.length; i++) {
            titleBlock[i].setAttribute("title", i);
            titleBlock[i].onclick = function (event) {
                event=event||window.event;
                titleBlock[index].className = titleBlock[index].className.replace("partner-class-title-click", " ");
                partnerIndex[index].className = partnerIndex[index].className.replace("partnerPointer", " ");
                index = parseInt(event.srcElement.getAttribute("title"));
                // event.target.className = event.target.className + " " + "partner-class-title-click";
                event.srcElement.className=event.srcElement.className+" "+"partner-class-title-click";
                partnerIndex[index].className = partnerIndex[index].className + " " + "partnerPointer";
            }
        }
    }
    function createPartnerIcoBody() {
        var partnerIcoBody = $("<div class='partnerIcoBody'></div>")[0];
        $(".partner-All-ico")[0].appendChild(partnerIcoBody);
        return partnerIcoBody;
    }
    function init() {
        requestData("http://nbptznjj.iego.cn/mybatisForSpring3/QueryPartnerController.do",function (data) {
            backgroundImage["全部"]=[];
            for(var i=0;i<data.length;i++){
                backgroundImage[data[i].title]=[];
                partenerClassAllTitle.append($("<div class='partner-class-title'></div>").html(data[i].title));
            }
            requestData("http://nbptznjj.iego.cn/mybatisForSpring3/QueryAddPartnerController.do", function (data) {
                for (var i = 0; i < data.length; i++) {
                    backgroundImage["全部"].push(data[i]);
                    backgroundImage.hasOwnProperty(data[i].type)&&backgroundImage[data[i].type].push(data[i]);
                }
                var partnerIcoBody=createPartnerIcoBody();
                for( k in backgroundImage){
                    var partnerIndex=$("<div class='partnerIndex'></div>")[0];
                    $(partnerIcoBody).append(partnerIndex);
                    partnerIcoBody.childNodes[0].className = "partnerIndex partnerPointer";
                    for(var y=0;y<backgroundImage[k].length;y++){
                        if(backgroundImage[k][y]==undefined){
                            console.log(backgroundImage[k],k,y);
                            continue;
                        }
                        partnerIndex.appendChild($("<a class='partnerBlock' href='#'><img src='"+backgroundImage[k][y].picurl+"' alt=''></a>")[0]);
                    }
                }
                addPartnerChange();
                //通过类搜索出的多个元素，如果要针对他们某个节点的对象进行操作，要先[0]后套$()，相当于找到对应节点的对象
                //直接搜索，如果有多个，那么这个对象的this指向的是第一个的
            });
        });

        requestData("http://nbptznjj.iego.cn/mybatisForSpring3/QueryFriendlyLinkList.do",function (data) {
            for(var i=0;i<data.length;i++){
                linklist.append("<a href='"+data[i].url+"'>"+data[i].title+"</a>");
            }
        })
    }
    init();
})();