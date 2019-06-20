window.onload = function () {
    /*1.顶部搜索*/
    search();
    /*2.轮播图效果*/
    banner();
    /*3.倒计时*/
    downTime();
};
let search = function () {
    /*1.默认固定顶部透明背景*/
    /*2.当页面滚动的时候，随着页面卷曲的高度变大透明度变大*/
    /*3.当页面滚动的时候，超过某一高度的时候透明度不变*/
    let banner = document.querySelector(".jd_banner");
    let opacity = 0;
    window.onscroll = function () {
        let height = document.documentElement.scrollTop + document.body.scrollTop;
        if (height < banner.clientHeight) {
            opacity = (height / banner.clientHeight) * 0.85;
        } else {
            opacity = 0.85;
        }
        document.querySelector(".jd_search_box").style.backgroundColor = "rgba(201,21,35," + opacity + ")";
    };

};
let banner = function () {
    let index = 1;
    let banner = document.querySelector(".jd_banner");
    let scrollImg = document.querySelector(".jd_banner ul:first-child");
    let width = banner.clientWidth;
    let points = document.querySelector(".jd_banner ul:last-child").querySelectorAll("li");
    let addTransition = function () {
        scrollImg.style.transition = "all 0.2s";
        scrollImg.style.webkitTransition = "all 0.2s";
    };
    let removeTransition = function () {
        scrollImg.style.transition = "none";
        scrollImg.style.webkitTransition = "none";
    };
    let setTranslateX = function (translateX) {
        scrollImg.style.transform = "translateX(" + translateX + "%)";
        scrollImg.style.webkitTransform = "translateX(" + translateX + "%)";
    };

    let isMove = false;

    /*自动滚动，无缝轮播*/
    let timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * 10);
    }, 1000);
    scrollImg.addEventListener("transitionend", function () {
        if (index >= 9) {
            index = 1;
            removeTransition();
            setTranslateX(-index * 10);
        } else if (index <= 0) {
            index = 8;
            removeTransition();
            setTranslateX(-index * 10);
        }
        setPoints();
    });
    let setPoints = function () {
        points.forEach(function (item, index) {
            item.classList.remove("now");
        });
        points[index - 1].classList.add("now");
    };

    /*触摸滚动事件：
    * 1.超过屏幕的1/3 切换上一张/下一张
    * 2.不超过屏幕1/3 吸附旁边
    * 3.按下的时候清除定时器，离开的时候重置定时器
    * */
    let startX = 0;
    let distanceX = 0;
    scrollImg.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    scrollImg.addEventListener("touchmove", function (e) {
        isMove = true;
        let moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        let rateX = distanceX / width * 10;
        /*测试*/
        // console.log(rateX);
        /*测试用*/
        // console.log(-index * 10 + rateX);
        addTransition();
        setTranslateX(-index * 10 + rateX);
    });
    scrollImg.addEventListener("touchend", function (e) {
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) {
                addTransition();
                setTranslateX(-index * 10);
            } else {
                addTransition();
                if (distanceX < 0) {
                    index++;
                } else {
                    index--;
                }
                setTranslateX(-index * 10);
            }
        }

        /*重置*/
        isMove = false;
        distanceX = 0;
        startX = 0;
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * 10);
        }, 1000);
    });


};
let downTime = function () {
    let time=2*60*60;
    setInterval(function (){
        time--;
        let h=Math.floor(time/3600);
        let m=Math.floor(time%3600/60);
        let s=Math.floor(time%60);

        let spans=document.querySelectorAll(".time span");

        spans[0].innerText=Math.floor(h/10);
        spans[1].innerText=h%10;

        spans[3].innerText=Math.floor(m/10);
        spans[4].innerText=m%10;

        spans[6].innerText=Math.floor(s/10);
        spans[7].innerText=s%10;
    },1000);

};