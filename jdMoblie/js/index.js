window.onload = function(){
    /*去执行我们需要执行的代码*/
    search();
    banner();
    downTime ();
};
/*搜索栏js效果*/
function search(){
    
    /*
     * 1.当我们滑动页面的时候   不超过轮播图的高度的时候  颜色需要爱随着高度区去改变的
     * 2.当我们超过的时候  是不需需要去改变的
     * */


    /*搜索栏*/
    var search = document.querySelector('.jd_header_box');
    /*banner*/
    var banner = document.querySelector('.jd_banner');
    /*获取高度限制*/
    var height = banner.offsetHeight;


    /*透明度*/
    var opacity = 0;

    window.onscroll = function(){
        /*IE document.documentElement.scrollTop*/
        //console.log(document.body.scrollTop);
        var distTop = 0;
        if(document.documentElement){
            distTop=document.documentElement.scrollTop;
        }else {
            distTop=document.body.scrollTop;
        }
        
        /*超过的时候  */
        if(distTop > height){
            opacity = 0.85;
        }
        /*不超过的时候*/
        else{
            opacity = 0.85 * (distTop/height);
        }

        /*操作dom*/
        search.style.background = "rgba(201,21,35,"+opacity+")";
    }
}
/*轮播图*/

function banner () {
    
    var banner = document.querySelector(".jd_banner");
    var imgBox =document.querySelector(".jd_banner ul:first-child");
    var points =document.querySelectorAll(".jd_banner ul:last-child li");
  
    var width = banner.offsetWidth;
    var index = 0;
    var timer = null;

    /*公共的方法*/
    var addTransition = function (){
        imgBox.style.webkitTransition="all .5s";
        imgBox.style.transition="all .5s";
    }

    var removeTransition = function (){
        imgBox.style.webkitTransition="none";
        imgBox.style.transition="none";
    }
    var setTranslateX = function(translate){
        imgBox.style.webkitTransform ="translateX("+translate+"px)";
        imgBox.style.transform ="translateX("+translate+"px)";
       
    }

    var setPoints =function (){
        for(var i = 0 ; i<points.length; i++){
            points[i].className="";
        }
          points[index-1].className="now";
    }


    timer = setInterval(function(){
        index ++ ;
        if(index>5){
            index=1;
        }
        
        addTransition();
        setTranslateX(-index*width);
        setPoints();
    },1000);


    var startX=0;
    var endX=0;
    var isMove=false;
    var distance=0;

    imgBox.addEventListener("transitionend",function(){
        if(index>=6){
            index=1;
        }else if(index<=0){
            index=5;
        }
        setPoints();
        console.log(index)
    });

    imgBox.addEventListener('touchstart',function(e){
        clearInterval(timer);
        startX=e.touches[0].clientX;
    });
    imgBox.addEventListener('touchmove',function(e){

        isMove = true;
        endX=e.touches[0].clientX;
        distance=endX - startX;

        // 定义将改变的位置 = 当前的位置 + 你要滑动的位置
        var translate = -index*width+distance;

     
        removeTransition();
        setTranslateX(translate);


    });
    imgBox.addEventListener('touchend',function(e){
            
            if(Math.abs(distance)>(width/3)&&isMove==true){

                 /*往右  正  往左  负*/

                 if(distance>0){
                    index--;
                 }else {
                    index++;
                 }

                addTransition();
                setTranslateX(-index*width);
            }
            else{
                 addTransition();
                 setTranslateX(-index*width);
            }

    });
    console.log(width)


}

/*倒计时*/

function downTime () {

    var time = 5*60*60;

    var timer =null;

    timer=setInterval(function(){

        time--;

        var h = Math.floor(time/3600);
        var m =Math.floor((time%3600)/60);
        var s = time%60;

        console.log(time)
    },1000)
}

