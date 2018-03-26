/**
 * Created by newuser on 2017/11/16.
 */
window.onload = function () {
//    搜索框
    search();
//    广告栏
    banner();
//    倒计时
    downTime();

}

//    搜索框
function search(){
   /*老三步*/
   var searchBox = document.querySelector(".jd_header_box")
   var bannerBox = document.querySelector(".jd_banner")
    /*监听页面滚动 onscroll()  调用者：window*/
    window.onscroll = function () {
        //定义变量 接收 被卷去的部分高度
        var sTop = document.body.scrollTop || document.documentElement.scrollTop;
        //这是广告栏的高度
        var height = bannerBox.offsetHeight;
        //定义透明度
        var num = 0 ;
        //被卷去的部分高度 如果小于 广告栏的高度
        if(sTop <  height){
            num = sTop/height; //透明度随着滚动变化
            searchBox.style.background = "rgba(201,21,35,"+num+")";
        }else {
            //否则是就是0.85
            searchBox.style.background = "rgba(201,21,35,0.85)";
        }
    }
}

//    广告栏
function banner(){
    /*老三步*/

    var box = document.querySelector(".jd_banner");
    var imgBox = box.querySelector("ul:first-child"); //通过伪类选择指定的元素
    var imgs = box.querySelectorAll("ul:first-child li"); //通过伪类选择指定的元素
    var pointBox = box.querySelector("ul:last-child");
    var points = pointBox.querySelectorAll("li");
    points[0].className = "now";
    var width = box.offsetWidth;
    /* 准备工具  ： 1.索引   2.定时器 */
    var index = 0 ;
    var timer = null;
    timer = setInterval(function () {

        index ++ ;
        if(index>imgs.length - 1){
            index = 0;
        }
        // imgBox.style.webkitTransition= "all .5s";
        // imgBox.style.transition= "all .5s";
        addTransition(imgBox);

        // imgBox.style.webkitTransform ="translateX("+(-index*width)+"px)";
        // imgBox.style.transform ="translateX("+(-index*width)+"px)";
        setTranslateX(imgBox,-index*width);

        // for(var i = 0 ; i<points.length;i++){
        //     points[i].className = "";
        // }
        // points[index].className = "now";
        setPoints(index);
    },1000);
    /* 公共函数 start*/
    //添加过渡
    function addTransition(dom){
        dom.style.webkitTransition= "all .5s";
        dom.style.transition= "all .5s";
    }
    //删除过渡
    function remvoeTransition(dom){
        dom.style.webkitTransition= "none";
        dom.style.transition= "none";
    }
    //设置轮播
    function  setTranslateX(dom ,speed ) {
        dom.style.webkitTransform ="translateX("+speed+"px)";
        dom.style.transform ="translateX("+speed+"px)";
    }
    //设置小圆点的背景色
    function setPoints(key){
        for(var i = 0 ; i<points.length;i++){
            points[i].className = "";
        }
        points[key].className = "now";
    }

    /* 公共函数 end*/



}


//    倒计时

function downTime (){
    var spans = document.querySelectorAll(".sk_time span");

    var time = 2*60*60;
    // var time = 10;

    var timer = setInterval(function (){
        time--;
        if(time<=0){
            clearInterval(timer)
        }

        var h = Math.floor(time/60/60);
        var m = Math.floor(time/60%60);
        var s = Math.floor(time%60);

        console.log(h+"小时-"+m+"分钟-"+ s+ "秒钟");

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;



    },1000)


}