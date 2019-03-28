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
    //好运龙5个部位是否全部点亮
    var finish = false;
    //兑换券是否还有存量 
    var quan = true;
    //异网用户第一次点亮获得的是流量 是否转赠完成  兑换券发完的情况
    var  done = false;

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
    $('#rule-back').on('click',function(){
        $('.rule').hide();
        if(!ruleFlag){
            $('.home').show();
        }else{
            $('.main').show();
        }
    });

    //首页开始按钮
    $('#start').on('click',function(){
        if(attention){
            showMask();
            $('.tc-11').show();
        }else{
            $('.home').hide();
            $('.attention').show();
        }
    });
    //引导弹窗清楚了按钮
    $('#knowBtn').on('click',function(){
        $('.home').hide();
        $('.main').show();
        $('.tc-11').hide();
        $('.tc-1').show();
    });

    //选择部位
    var partNum, // 0 头 1 角 2 身 3 爪 4 尾
        partChecked = false;
    $('#partList').on('click','li',function(){
        var $this = $(this);
        $this.addClass('act').siblings().removeClass('act');
        partNum = $this.index();
        partChecked = true;
    });
    //选择部位弹窗确定按钮
    $('#firstModelBtn').on('click', function () {
        if (partChecked) {
            $('.tc-1').hide();
            if (register) {
                var _part = '';
                switch (partNum) {
                    case 0:
                        $('.part').text('龙头');
                        _part = '龙头';
                        $('#dragon').children('li:nth-child(1)').addClass('act');
                        break;
                    case 1:
                        $('.part').text('龙角');
                        _part = '龙角';
                        $('#dragon').children('li:nth-child(2)').addClass('act');
                        break;
                    case 2:
                        $('.part').text('龙身');
                        _part = '龙身';
                        $('#dragon').children('li:nth-child(3)').addClass('act');
                        break;
                    case 3:
                        $('.part').text('龙爪');
                        _part = '龙爪';
                        $('#dragon').children('li:nth-child(4)').addClass('act');
                        break;
                    case 4:
                        $('.part').text('龙尾');
                        _part = '龙尾';
                        $('#dragon').children('li:nth-child(5)').addClass('act');
                        break;
                }
                $('#ownPartBox>a').before('<p>我点亮了'+_part+'</p>');
                if(CM){//同网
                    $('.tc-3').show();
                }else{//异网
                    if(quan){
                        $('.tc-10').show();
                    }else{
                        $('.tc-6-1').show();
                    }
                }
            } else {
                $('.tc-12').show();
            }
        }else{
            alert('请先选择一个部位点亮\n再点击领奖！');
        }
    });

    //提示绑定手机号弹窗好的按钮
    $('.haode').on('click',function(){
        $('.tc-12').hide();
        $('.main').hide();
        hideMask();
        $('.telephone').show();
    });


    //点亮记录列表
    var friendUserInfo = [
        {
            friendName: '小胖子',
            friendPart: '龙头',
            date: '2月2日'
        },
        {
            friendName: '小胖子',
            friendPart: '龙头',
            date: '2月2日'
        },
        {
            friendName: '小胖子',
            friendPart: '龙头',
            date: '2月2日'
        }
    ];
    (function(){
        var str = '';
        for(var i = 0; i < friendUserInfo.length; i++){
            str += '<li><span>'+friendUserInfo[i].friendName+'</span><span>'+friendUserInfo[i].friendPart+'</span><span>'+friendUserInfo[i].date+'</span></li>';
        }
        if(friendUserInfo.length !== 0){
            $('#friendGiftList').html(str);
        }else{
            $('#friendGiftList').html('<p>还没有好友为您点亮哦~</p>');
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

    //发送好友按钮
    $('.toFriendBtn').on('click',function(){
        $('.tc-4').hide();
        hideMask();
        $('.share').show();
        $('.main').css('position','fixed');
    });
    //点击分享浮层
    $('.share').on('click',function(){
        $('.share').hide();
        $('.main').css('position','relative');
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
