window.onload=function (){
    document.querySelector('.jd_cateLeft').addEventListener('touchmove',function(e){
        e.preventDefault();
    });
    document.querySelector('.jd_cateRight').addEventListener('touchmove',function(e){
        e.preventDefault();
    });
    new IScroll(document.querySelector(".jd_cateLeft"),{
        scrollX:false,
        scrollY:true
    });
    new IScroll(document.querySelector(".jd_cateRight"),{
        scrollX:true
    });
};