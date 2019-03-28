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
    //活动第几天   每天一次  奖励页花朵第几个赋值
    var day = 1;
    //是否关注公众号
    var attention = true;
    //是否是注册用户
    var register = true;
    //是否是本网用户 默认本网用户
    var CM = true;
    //图片路径
    var imgPath = '../images';
    //首次随机赠送的物料   1 阳光  2肥料  3水壶
    var supplies = parseInt(Math.random(0,1)*(3-0)) + 0;
    //异网用户流量是否转赠完毕
    var done = false;
    //花成长阶段
    var flower = [];
    //成熟花朵种类  1风信子 2兰花 3雏菊 4马蹄莲 5牡丹 6郁金香
    var flowerType = parseInt(Math.random(0,1)*(6-0)) + 1;
    //物料个数
    //阳光
    var ygCount = 1;
    //水壶
    var shCount = 1;
    //肥料
    var flCount = 1;
    (function(){
        
    })();
    //渲染花圃状态
    function bindFlowerData(){
        switch(flower.length){
            case 0: 
            $('#flower').attr('class','');
            break;
            case 1: 
            $('#flower').attr('class','cq');
            $('#jd').text('初期');
            break;
            case 2: 
            $('#flower').attr('class','zq');
            $('#jd').text('中期');
            break;
            case 3: 
               $('#flower').attr('class','cs-'+flowerType);
               $('#hand').show();
               $('#jd').text('成熟期');
            break;
        }
    }
    bindFlowerData();

    //花圃内动画物料显示情况
    (function(){
        $.inArray('yg',flower) === -1 ? $('#sunEffects').show() : $('#sunEffects').hide();
        $.inArray('sh',flower) === -1 ? $('#bottle').show() : $('#bottle').hide();
        $.inArray('fl',flower) === -1 ? $('#fertilizerEffects').show() : $('#fertilizerEffects').hide();
    })();


    //本地存储访客是否第一次访问
    var firstLogin;
    var strModel = "firstLogin";  
    var storeDisplay = function () {
        var modelDisplay = 1;  
        window.localStorage.setItem(strModel, modelDisplay); 
    };
    if (window.localStorage.getItem(strModel) != "1") { 
        firstLogin = true;
    }else{
        firstLogin = false;
    }
    storeDisplay();
    
    //页面显示物料数量
    function showCountText(){
        $('#ygCountText').text(ygCount);
        $('#shCountText').text(shCount);
        $('#flCountText').text(flCount);
        if(ygCount !== 0){
            $('#ygCountText').show();
            $('#ygCountText').parent().removeClass('act');
        }else{
            $('#ygCountText').hide();
            $('#ygCountText').parent().addClass('act');
        }
        if(shCount !== 0){
            $('#shCountText').show();
            $('#shCountText').parent().removeClass('act');
        }else{
            $('#shCountText').hide();
            $('#shCountText').parent().addClass('act');
        }
        if(flCount !== 0){
            $('#flCountText').show();
            $('#flCountText').parent().removeClass('act');
        }else{
            $('#flCountText').hide();
            $('#flCountText').parent().addClass('act');
        }
    };
    showCountText();
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


    //点击活动规则按钮
    var ruleFlag;
    $('.rule-btn').on('click',function(){
        $('.rule').show().siblings().hide();
        if($(this).parent().parent().attr('id') === 'home'){
            ruleFlag = 0;
        }else{
            ruleFlag = 1;
        }
    });
    //活动规则页确定按钮
    $('.rule-back').on('click',function(){
        $('.rule').hide();
        if(!ruleFlag){
            $('#home').show();
        }else{
            $('#main').show();
        }
    });

    //首页种花按钮
    $('#start-btn').on('click',function(){
       $('#home').hide();
       if(firstLogin){//首次访问
          showCountText();
          $('#method').show();
       }else{
           showCountText();
           $('#main').show();
           $('.tc-0').show();
           $('#giveText').hide();
           showMask();
       }
       
    });

    //锦囊页确定按钮
    var methodFlag = false;
    $('#methodPageBtn').on('click',function(){
        if(!methodFlag){
            $('#method').hide();
            $('#main').show();
            $('.tc-0').show();
            showMask();
        }else{
            $('#method').hide();
            $('#main').show();
        }
    });
    
    //种子弹窗确定按钮
    $('#goMain').on('click',function(){
        $('.tc-0').hide();
        hideMask();
    });
    //主页玩法锦囊按钮
    $('.method-btn').on('click',function(){
        methodFlag = true;
        $('#main').hide();
        $('#method').show();
    });
    //主页活动通知开关按钮
    var onOffFlag = true;
    $('#switch-btn').on('click',function(){
        if(onOffFlag){//关
            $(this).addClass('off');
            onOffFlag = false;
        }else{//开
            $(this).removeClass('off');
            onOffFlag = true;
        }
    });

    
    //主页点击物料
    //阳光
    var ygFlag = true;
    $('.yg').on('click', function () {
        if (ygFlag) {
            if (ygCount > 0) {
                if($.inArray('yg',flower) === -1){
                    flower.push('yg');
                }
                flFlag = false;
                shFlag = false;
                ygCount--;
                showCountText();
                $("#sunEffects").attr('class', 'a-fadeoutBig');
                setTimeout(function () {
                    $("#sunEffects").attr('class', 'a-ring yg').hide();
                    ygFlag = true;
                    flFlag = true;
                    shFlag = true;
                    $('#wl').text('添加了阳光');
                    bindFlowerData();
                    $('.addModel').show();
                    showMask();
                }, 3000);
                ygFlag = false;
            }else{
                $('.to-friend').show();
                showMask();
            }
        }
        
    });

    //肥料
    var flFlag = true;
    $('.fl').on('click',function(){
        if (flFlag) {
            if (flCount > 0) {
                if($.inArray('fl',flower) === -1){
                    flower.push('fl');
                }
                ygFlag = false;
                shFlag = false;
                flCount--;
                showCountText();
                $("#fertilizerEffects").attr('class', 'shifeiaa');
                setTimeout(function () {
                    $("#fertilizerEffects").attr('class', 'a-ring fl').hide();
                    flFlag = true;
                    ygFlag = true;
                    shFlag = true;
                    $('#wl').text('施肥');
                    bindFlowerData();
                    $('.addModel').show();
                    showMask();
                }, 2000);
                flFlag = false;
            }else{
                $('.to-friend').show();
                showMask();
            }
        }
    });

    //浇水
    var shFlag = true;
    $('.sh').on('click', function () {
        if (shFlag) {
            if (shCount > 0) {
                if($.inArray('sh',flower) === -1){
                    flower.push('sh');
                }
                ygFlag = false;
                flFlag = false;
                shCount--;
                showCountText();
                $('#bottle').attr('class', 'bottle-fadeIn');
                setTimeout(function () {
                    $('#bottle').attr('class', 'a-ring sh').hide();
                    shFlag = true;
                    ygFlag = true;
                    flFlag = true;
                    $('#wl').text('浇水');
                    bindFlowerData();
                    $('.addModel').show();
                    showMask();
                }, 2000);
                shFlag = false;
            }else{
                $('.to-friend').show();
                showMask();
            }
        }
        
    });

    //阶段弹窗按钮
    $('#jd-tc').on('click',function(){
        //bindFlowerData();
        $(this).parent().hide();
        hideMask();
    });

    //我的奖励花园奖品内容 ../images/flower_'+flowerType+'.png
    var giftArr = [
        {
            giftImg : '../images/flower_0.png',
            aClassName : ''
        },
        {
            giftImg : '../images/flower_0.png',
            aClassName : ''
        },
        {
            giftImg : '../images/flower_0.png',
            aClassName : ''
        },
        {
            giftImg : '../images/flower_0.png',
            aClassName : ''
        },
        {
            giftImg : '../images/flower_0.png',
            aClassName : ''
        },
        {
            giftImg : '../images/flower_0.png',
            aClassName : ''
        },
        {
            giftImg : '../images/flower_0.png',
            aClassName : ''
        },
    ];
    function bindGift(){
        var str = '';
        for(var i = 0; i < giftArr.length; i++){
            str += '<li><img src="'+giftArr[i].giftImg+'">'+'<a class="'+giftArr[i].aClassName+'" javascript: void(0)></a>';
        }
        $('#giftList').html(str);
    }


    //同网异网弹窗内奖品信息
    //1风信子 2兰花 3雏菊 4马蹄莲 5牡丹 6郁金香
    (function(){
        switch(flowerType){
            case 1:
            $('.flowerName').text('风信子');
            $('.flowerPrice').text('100MB');
            break;
            case 2:
            $('.flowerName').text('兰花');
            $('.flowerPrice').text('200MB');
            break;
            case 3:
            $('.flowerName').text('雏菊');
            $('.flowerPrice').text('500MB');
            break;
            case 4:
            $('.flowerName').text('马蹄莲');
            $('.flowerPrice').text('1GB');
            break;
            case 5:
            $('.flowerName').text('牡丹');
            $('.flowerPrice').text('2GB');
            break;
            case 6:
            $('.flowerName').text('郁金香');
            $('.flowerPrice').text('3GB');
            break;
        }
        $('.tcFlowerType').attr('src',imgPath+'/flower_tc_'+flowerType+'.png');
    })();

    //收获小手点击
    $('#hand').on('click',function(){
        giftArr.splice(day-1,1,{
            giftImg : '../images/flower_'+flowerType+'.png',
            aClassName : 'act'
        });
        bindGift();
        if(attention){//关注
            if(register){//绑定手机号
                $('#hand').hide();
                if(CM){//同网
                    $('.tc-1').show();
                    showMask();
                }else{//异网
                    $('.tc-2').show();
                    showMask();
                }
            }else{//未绑定手机号
                
            }
        }else{//未关注
            window.location.href = 'https://mp.weixin.qq.com/s/L5sqfIUePU0ZWzL_eVwr_A';
        }
    });

    //奖励花园页查看按钮
    $('#giftList').on('click','a.act',function(){
        if(CM){
            $('.tc-1').show();
            showMask();
        }else{
            done === true ? $('.tc-5').show() : $('.tc-1').show();
        }
    });
    



    //好友助力列表
    var friendUserInfo = [
        {
            friendImg: '../images/fri_default.png',
            friendName: '小胖子',
            wl: '肥料',
            date: '2月2日'
        },
        {
            friendImg: '../images/fri_default.png',
            friendName: '小胖子',
            wl: '水壶',
            date: '2月2日'
        },
        {
            friendImg: '../images/fri_default.png',
            friendName: '小胖子',
            wl: '肥料',
            date: '2月2日'
        }
    ];
    (function(){
        var str = '';
        for(var i = 0; i < friendUserInfo.length; i++){
            str += '<li><div><img src="'+friendUserInfo[i].friendImg+'"></div><p>'+friendUserInfo[i].friendName+'</p><p>帮忙增加了'+friendUserInfo[i].wl+'</p><p>'+friendUserInfo[i].date+'</p></li>';
        }
        if(friendUserInfo.length !== 0){
            $('#friendList').html(str);
        }else{
            $('#friendList').html('<p>您还没有好友给您助力哦~</p>');
        }
    })();



    //主页奖励花园按钮
    $('#toGiftPageBtn').on('click',function(){
        $('#main').hide();
        $('#gift').show();
    });
    //获取能量按钮
    $('.toFriendBtn').on('click',function(){
        $('.share').show();
        $('.main').css('position','fixed');
        hideMask();
        $('.to-friend').hide();
    });
    //点击分享浮层
    $('.share').on('click',function(){
        $('.share').hide();
        $('.main').css('position','unset');
        hideMask();
        $('.to-friend').hide();
    });
    //奖励花园页返回按钮
    $('#gift-back').on('click',function(){
        $('#gift').hide();
        $('#main').show();
    });


    //异网弹窗获得流量后转赠按钮
    $('#giveBtn').on('click',function(){
        $('.tc-2').hide();
        $('.tc-3').show();
    });

    //异网弹窗输入转赠手机号后确定按钮
    $('#giveBtn_2').on('click',function(){
        if(istel($('#inputTel').val())){
            $('.tc-3').hide();
            $('.tc-4').show();
            $('.inputTel').text($('#inputTel').val());
        }else{
            alert('请输入正确北京移动手机号码');
        }
    });

     //3-修改
     $('#revise').on('click',function(){
        $('.tc-4').hide();
        $('.tc-3').show();
    });
    //3-确认
    $('#giveBtn_3').on('click',function(){
        $('.tc-4').hide();
        $('.tc-5').show();
        done = true;
    });


    //移动手机号码验证
    function istel(tel) {
        var rtn = false;
        //移动号段验证
        var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
        if (regtel.test(tel)) {
            rtn = true;
        }
        return rtn;
    }

    //关闭弹窗
    $('.close-2').on('click',function(){
        $(this).parent().parent().hide();
        hideMask();
    });
    $('.close').on('click',function(){
        $(this).parent().hide();
        hideMask();
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




    //测试按钮
    $('.test2').on('click',function(){
        attention = false;
    });
    $('.test3').on('click',function(){
        register = false;
    });
    $('.test4').on('click',function(){
        CM = false;
    });
    $('.test5').on('click',function(){
        finish = true;
        $('#dragon').find('li:not(:last-child)').each(function(index,ele){
            $(ele).addClass('act');
        });
    });
    $('.test6').on('click',function(){
        quan = false;
    });



});
