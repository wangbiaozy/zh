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
    //是否是注册用户
    var register = true;
    //是否是本网用户 默认本网用户
    var CM = true;
    //物料个数
    //阳光
    var ygCount = 1;
    //水壶
    var shCount = 1;
    //肥料
    var flCount = 1;
    //花成长阶段
    var flower = [];
    //渲染花
    (function(){
        switch(flower.length){
            case 0: 
            $('#flower').attr('class','');
            break;
            case 1: 
            $('#flower').attr('class','cq');
            break;
            case 2: 
            $('#flower').attr('class','zq');
            break;
            case 3: 
               //$('#flower').attr('class','');
            break;
        }
        
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
                console.log($.inArray('yg',flower))
                flFlag = false;
                shFlag = false;
                ygCount--;
                showCountText();
                $("#sunEffects").attr('class', 'a-fadeoutBig act').siblings().hide();
                setTimeout(function () {
                    $('#sunEffects').attr('class', 'a-ring yg').show().siblings().show();
                    ygFlag = true;
                    flFlag = true;
                    shFlag = true;
                    $('#wl').text('添加了阳光');
                    $('.addModel').show();
                    showMask();
                }, 3000);
            }
        }
        ygFlag = false;
    });

    //肥料
    var flFlag = true;
    $('.fl').on('click',function(){
        if (flFlag) {
            if (flCount > 0) {
                ygFlag = false;
                shFlag = false;
                flCount--;
                showCountText();
                $("#fertilizerEffects").attr('class', 'shifeiaa').siblings().hide();
                setTimeout(function () {
                    $("#fertilizerEffects").attr('class', 'a-ring fl').siblings().show();
                    flFlag = true;
                    ygFlag = true;
                    shFlag = true;
                    $('#wl').text('施肥');
                    $('.addModel').show();
                    showMask();
                }, 2000);
            }
        }
        flFlag = false;
    });

    //浇水
    var shFlag = true;
    $('.sh').on('click', function () {
        if (shFlag) {
            if (shCount > 0) {
                ygFlag = false;
                flFlag = false;
                shCount--;
                showCountText();
                $('#bottle').attr('class', 'bottle-fadeIn').siblings().hide();
                setTimeout(function () {
                    $('#bottle').attr('class', 'a-ring sh').siblings().show();
                    shFlag = true;
                    ygFlag = true;
                    flFlag = true;
                    $('#wl').text('浇水');
                    $('.addModel').show();
                    showMask();
                }, 2000);
            }
        }
        shFlag = false;
    });


    //提示绑定手机号弹窗好的按钮
    $('.haode').on('click',function(){
        $('.tc-12').hide();
        $('.main').hide();
        hideMask();
        $('.telephone').show();
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
    


    //绑定手机号页提交按钮
    $('.submit').on('click',function(){
        register = true;
        $('.telephone').hide();
        $('.main').show();
        showMask();
        $('.tc-1').show();
        /* if(CM){//同网
            $('.tc-3').show();
        }else{//异网
            $('.tc-10').show();
        } */
    });

    //第一次获得奖励弹窗关闭&确定按钮  点亮一个部位 
    $('.firstLight').on('click',function(){
        $('.tc-3').hide();
        hideMask();
    });

    //主页点击抽奖按钮
    $('#game-btn').on('click',function(){
        if(finish){
            showMask();
            if($(this).hasClass('act')){
                if(CM){
                    $('.tc-5').show();
                }else {
                    if($(this).hasClass('act_ncm')){
                        $('.tc-9').show();
                    }else{
                        $('.tc-6').show();
                    }
                }
            }else{
                $('.tc-0').show();
                window.setTimeout(function(){
                    $('.fire').show();
                },1000);
            }
            
        }else{
            $('.tc-4').show();
            showMask();
        }
    });

    //点击主页查看按钮显示第一次得到奖励弹窗
    $('#look').on('click',function(){
        if(CM){//本网跳转活动链接
            window.location.href = '';
        }else{//异网
            showMask();
            if(quan){//兑换券
                $('.tc-10').show();
            }else{//流量转赠
                done === true ? $('.tc-9-1').show() : $('.tc-6-1').show();
            }
        }
    });

    //主页奖励花园按钮
    $('#toGiftPageBtn').on('click',function(){
        $('#main').hide();
        $('#gift').show();
    });
    //获取能量按钮
    $('#toFriendBtn').on('click',function(){
        $('.share').show();
        $('.main').css('position','fixed');
    });
    //点击分享浮层
    $('.share').on('click',function(){
        $('.share').hide();
        $('.main').css('position','unset');
    });
    //奖励花园页返回按钮
    $('#gift-back').on('click',function(){
        $('#gift').hide();
        $('#main').show();
    });

    //全部点亮弹窗领奖按钮
    $('#getBtn').on('click',function(){
        $('.tc-0').hide();
        $('.fire').hide();
        $('#game-btn').addClass('act');
        if(CM){
            $('.tc-5').show();
        }else{
            $('.tc-6').show();
        }
    });

    //异网弹窗获得流量后转赠按钮
    $('#giveBtn').on('click',function(){
        $('.tc-6').hide();
        $('.tc-7').show();
        $('#game-btn').addClass('act_ncm');
    });

    //异网弹窗输入转赠手机号后确定按钮
    $('#giveBtn_2').on('click',function(){
        if(istel($('#inputTel').val())){
            $('.tc-7').hide();
            $('.tc-8').show();
            $('.inputTel').text($('#inputTel').val());
        }else{
            alert('请输入正确北京移动手机号码');
        }
    });

    //异网弹窗信息确认修改按钮
    $('#revise').on('click',function(){
        $('.tc-8').hide();
        $('.tc-7').show();
    });
    //异网弹窗信息确认确认按钮
    $('#giveBtn_3').on('click',function(){
        $('.tc-8').hide();
        $('.tc-9').show();
    });


    //异网用户第一次点亮部位后没有兑换券改送流量转赠
    //1-取消
    $('.close-ncm').on('click',function(){
        $(this).parent().hide();
        hideMask();
    });
    //1-转赠
    $('#giveBtn-1').on('click',function(){
        $('.tc-6-1').hide();
        $('.tc-7-1').show();
    });
    //2-确定
    $('#giveBtn_2-1').on('click',function(){
        if(istel($('#inputTel-1').val())){
            $('.tc-7-1').hide();
            $('.tc-8-1').show();
            $('.inputTel-1').text($('#inputTel-1').val());
        }else{
            alert('请输入正确北京移动手机号码');
        }
    });
    //3-修改
    $('#revise-1').on('click',function(){
        $('.tc-8-1').hide();
        $('.tc-7-1').show();
    });
    //3-确认
    $('#giveBtn_3-1').on('click',function(){
        $('.tc-8-1').hide();
        $('.tc-9-1').show();
        done = true;
    });


/*     //好友入口为TA点亮按钮
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
    }); */


    



    //复制兑换码
    (function () {
        try {
            var clipboard = new ClipboardJS('#copy-btn');
            clipboard.on('success', function (e) {
                $('#copy-btn').addClass('act').text('已复制');
                e.clearSelection();
            });
        }catch(e){}
    })();

    //兑换码弹窗点击查看兑换方法按钮
    $('#lookWayBtn').on('click',function(){
        $('.tc-10').hide();
        $('.main').hide();
        hideMask();
        $('.way').show();
    });
    //点击查看兑换码方法页确定按钮
    $('#way-back').on('click',function(){
        $('.way').hide();
        $('.tc-10').show();
        $('.main').show();
        showMask();
    });
    

    //全部点亮弹窗光动画
    function move(){
        $('#guang').addClass('act')
        var timer = window.setTimeout(function(){
            $('#guang').removeClass('act');
            window.clearTimeout(timer);
        },500);
    }
    window.setInterval(function(){
        move();
    },1000);


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

    //获取验证码
    function getCodeStyle(btnId) {
        var orderTime = 60,
            timeLeft = orderTime,
            btn = btnId;
        function timeCount(){
            timeLeft-=1;
            if (timeLeft>0){
                btn.val(timeLeft+"s重新获取");
                setTimeout(timeCount,1000);
                btn.css({
                    color: '#ccc'
                });
            }
            else {
                btn.val("发送验证码");
                btn.css({
                    color: '#000000'
                });
                timeLeft = orderTime;
                btn.removeAttr("disabled");
            }
        }
        btn.on('click', function () {
            $(this).attr("disabled",true);
            timeCount();
        });
    }
    getCodeStyle($('#codeBtn'));




    //关闭弹窗
    $('.close').on('click',function(){
        $(this).parent().hide();
        hideMask();
        if($('.tc-0').css('display') === 'none'){
            $('.fire').hide();
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
