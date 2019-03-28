(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(function(){
    //是否关注公众号
    var attention = true;
    //好友随机获取的部位
    var friendPart = parseInt(Math.random(0,1)*(5-0)) + 0;
    //图片路径
    var imgPath = '../images';
    //好友入口为TA点亮按钮
    $('#friendStartBtn').on('click',function(){
        if(attention){
            switch(friendPart){
                case 0:
                $('.friendPartText').text('龙头');
                break;
                case 1:
                $('.friendPartText').text('龙角');
                break;
                case 2:
                $('.friendPartText').text('龙身');
                break;
                case 3:
                $('.friendPartText').text('龙爪');
                break;
                case 4:
                $('.friendPartText').text('龙尾');
                break;
            }
            $('.friendPartPic').attr('src',imgPath + '/card_' + Number(friendPart+1) + '.png');
            $('.tc-fri').show();
            showMask();
        }else{
            $('.fri-home').hide();
            $('.attention').show();
        }
    });


    //显示遮罩层
    function showMask(){
        $("#mask").css("height",$(document).height());
        $("#mask").css("width",$(document).width());
        $("#mask").show();
        $('body').css('position','fixed');
    }
    //隐藏遮罩层
    function hideMask(){
        $("#mask").hide();
        $('body').css('position','unset');
    }
});