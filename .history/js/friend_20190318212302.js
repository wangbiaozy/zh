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
    //好友随机获取的部位
    var friendPart = parseInt(Math.random(0,1)*(3-0)) + 0;
    //图片路径
    var imgPath = '../images';

    //倒计时
    var box = document.getElementById('countDown');
    var timer = null;
    function countDown(){
        window.clearTimeout(timer);
        var curDate = new Date();
        var targetDate = new Date('2019/4/14 24:00:00');
        var time = targetDate.getTime() - curDate.getTime();
        var day = Math.floor(time/(1000*60*60*24));
        var hour = Math.floor((time - day*24*3600*1000)/(1000*60*60));
        var min = Math.floor((time - day*24*3600*1000 - hour*1000*3600)/(1000*60));
        var s = Math.floor((time - day*24*3600*1000 - hour*3600*1000 - min*60*1000)/1000);
        box.innerHTML ='<i>倒计时：</i>' + '<span>'+ day +'</span>天' + '<span>' + addZero(hour) + '</span>小时' + '<span>'+ addZero(min) + '</span>分' + '<span>' + addZero(s) + '</span>秒';
        timer = window.setTimeout(countDown,1000);
    }
    countDown();
    function addZero(n){
        return n < 10 ? '0' + n : n;
    }

    //为TA助力按钮
    $('#start-btn').on('click',function(){
        $('.fri-tc').show();
        showMask();
    });
    //活动规则按钮
    $('.rule-btn').on('click',function(){
        $('.fri-home').hide();
        $('#rule').show();
    });
    //活动规则页确定按钮
    $('#rule-back').on('click',function(){
        $('#rule').hide();
        $('.fri-home').show();
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