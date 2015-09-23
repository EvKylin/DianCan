define(['jquery','variable','mixin','initialization'],function($, variable,mixin,initialization){
    'use strict';
    // 计算器模块
    var $calculatorEnter = variable.$calculatorEnter;
    var $calculatorStatus = variable.$calculatorStatus;
    var $calculatorDecimal = variable.$calculatorDecimal;

    var dishQueryData = '';// 查询添加的菜品数据
    var dishQueryNum = 1;   // 添加的份数

    var tableNumber = '';  //  要换的餐桌号

    // 给当前计算器 td 元素不带类名为 disabled 和 属性data-key不是discount，tip的元素添加点击事件
    //:not([data-key="discount"])
    variable.$calculatorTable.on('click','tbody tr td:not(.disabled):not([data-key="tip"])',function(){
        var $this = $(this);
        var dataKey = $this.attr('data-key');
        switch (dataKey){
            case '0':case '1':case '2': case '3': case '4':case '5':case '6':case '7':case '8':case '9':
                var calcVal = $calculatorEnter.val()+dataKey;
                $calculatorEnter.val(calcVal);

                // 设置状态如果当处于无状态或下单状态 则将计算器在点击数字时设置为查询状态
                if(variable.operateStatus == 'addOrder' || variable.operateStatus == ''){
                    variable.operateStatus = 'dishQuery';
                }

                if(variable.operateStatus == 'changeTable'){
                   /* $.each(variable.tableList,function(index, item){
                        if(parseInt(item.number) == parseInt(calcVal)){
                            $calculatorStatus.text('点击确认切换。');
                            return false;
                        }else{
                            $calculatorStatus.text('该餐桌号不存在！');
                        }
                    });*/
                    $.post(variable.tableQueryUrl,{tableId:calcVal},function(data){
                        var data = {
                            status : true,
                            dishTableId : 12
                        } // 模拟数据
                        if(data.status == true){
                            $calculatorStatus.text('点击确认切换。');
                            tableNumber = data.dishTableId;
                        }else{
                            $calculatorStatus.text('该餐桌号不存在！');
                        }
                    });
                }else if(variable.operateStatus == 'dishQuery'){
                    variable.$calculatorSubmit.attr('data-status','confirm').text(variable.calculatorText.confirm);

                    // 参数为菜品ID
                    var dishNumber = calcVal.split('×')[0];
                    dishQueryNum = calcVal.split('×')[1];
                    $.post(variable.dishesQueryUrl,{dishesId:dishNumber},function(data){

                        var data = {
                            status : true,
                            dishes : {
                                id: 10011,
                                name:'开水白菜',
                                price:'123.33'
                            }
                        } // 模拟数据

                        var queryText = data.status ? 'isTrue' : 'isFalse';
                        if(data.status == true){
                            dishQueryData = data.dishes;
                            $calculatorStatus.text(data.dishes.name);
                        }else{
                            $calculatorStatus.text(variable.dishesQueryText[queryText]);
                        }
                    });
                }else if(variable.operateStatus == 'discount'){
                    //
                }
                console.log(variable.operateStatus);
                break
            case 'AC':
                $calculatorEnter.val('');
                $calculatorStatus.text(variable.calculatorText[variable.operateStatus]);

                if(variable.operateStatus == 'dishQuery'){
                    if(variable.dishOther.dishs.length){
                        variable.operateStatus = 'addOrder';
                        variable.$calculatorSubmit.attr('data-status','print').text(variable.calculatorText.print);
                    }else{
                        variable.$calculatorSubmit.attr('data-status','confirm').text(variable.calculatorText.confirm);
                        variable.operateStatus = '';
                    }
                }

                break;
            case 'TOGO':
                $this.toggleClass('active');
                variable.isToGo ? variable.isToGo = false : variable.isToGo = true;
                break;
            case 'tip':
                //$calculatorEnter.val($calculatorEnter.val()+'%');
                break;
            case 'discount':
                //$calculatorEnter.val($calculatorEnter.val()+'%');

                if(variable.dishCountType == 'order'){
                    var $this = $($this);
                    $calculatorEnter.val('').focus();
                    if(variable.discountType == 'percent'){
                        variable.discountType = 'discountPrice';
                        $this.attr('data-type','discountPrice').text('€');
                        $calculatorDecimal.removeClass('disabled');

                    }else{
                        variable.discountType = 'percent';
                        $this.attr('data-type','percent').text('%');
                        $calculatorDecimal.addClass('disabled');
                    }
                }
                break;
            case 'times':  //×
                var times = $calculatorEnter.val() ? '×': '1×';
                $calculatorEnter.val($calculatorEnter.val()+times);
                break;
            case 'decimal':  //小数点
                var decimal = $calculatorEnter.val() ? '.': '0.';
                if($calculatorEnter.val().indexOf('.') < 1){
                    $calculatorEnter.val($calculatorEnter.val()+decimal);
                }


                break;
            case 'submit':  // 计算器 橙色按钮
                tabBtnSubmit();
                break;
        }
    });

    function tabBtnSubmit(){
        switch (variable.operateStatus){
            case 'dishQuery':
                if(dishQueryData != ''){
                    var dishId    = dishQueryData.id;
                    var price     = dishQueryData.price;
                    var istogo    = variable.isToGo ? 1 : 0;
                    var dishCount = dishQueryData.dishCount;
                    var dishName  = dishQueryData.name;
                     mixin.addOrder(dishName, dishId, price, istogo, dishCount, dishQueryNum); // 添加菜品

                    $calculatorEnter.val('');
                    $calculatorStatus.text(variable.calculatorText.addOrder);

                }else{
                    alert('未查询到数据');
                }
                break;
            case 'addOrder':
                // 添加的菜品列表 些处提交到后台
                if(variable.dishOther.dishs.length){
                    alert(variable.dishOther);
                    $.post('',{data:variable.dishOther},function(){});
                }else{
                    alert('还没有下单');
                }
                break;
            case 'changeTable':
                if(tableNumber != ''){
                    initialization.changeTable();

                    // 还原状态
                    initialization.calculatorInit();
                    variable.operateStatus = '';
                    variable.$funcSetBtn.attr('data-key','back').text(variable.funSetBtnText['back']);
                    variable.$funcSet.find('li:lt(6)').removeClass('active');
                }

                break;
            case 'single':
                variable.dishOrderSplit;
                alert('提交分单数据');

                // 还原状态
                initialization.dishesCategory();
                variable.$menuMan = null;
                variable.dishOrderSplit.empty();

                initialization.calculatorInit();
                variable.operateStatus = '';
                variable.$funcSetBtn.attr('data-key','back').text(variable.funSetBtnText['back']);
                variable.$funcSet.find('li:lt(6)').removeClass('active');
                break;
            case 'cancelMenu':
                variable.dishOrderSplit;
                alert('提交撤消菜单数据');

                // 还原状态
                initialization.dishesCategory();
                variable.$menuMan = null;
                variable.dishOrderSplit.empty();

                initialization.calculatorInit();
                variable.operateStatus = '';
                variable.$funcSetBtn.attr('data-key','back').text(variable.funSetBtnText['back']);
                variable.$funcSet.find('li:lt(6)').removeClass('active');
                break;
            case 'cancelTable':
                alert('提交撤消菜单数据');

                // 还原状态
                initialization.calculatorInit();
                variable.operateStatus = '';
                variable.$funcSetBtn.attr('data-key','back').text(variable.funSetBtnText['back']);
                variable.$funcSet.find('li:lt(6)').removeClass('active');
                break;
            case 'discount':
                // 设置折扣值并加上其类型
                var discount = parseFloat(variable.$calculatorEnter.val()) + (variable.discountType == 'percent'? '=':'');

                if(variable.dishCountType == 'pay'){
                    // 此处给买单状态下添加折扣， 折扣类型为 百分比
                }else if(variable.dishCountType == 'order'){
                    // 给上次添加菜品添加折扣信息
                    mixin.addDishAttr({discount:discount});
                }

                // 还原状态
                initialization.calculatorInit();
                variable.discountType = 'percent';
                variable.$funcSet.find('li:lt(6)').removeClass('active');
                if(variable.lastSingleStatus == ''){
                    variable.operateStatus = '';
                    variable.$funcSetBtn.attr('data-key','back').text(variable.funSetBtnText['back']);

                }else{
                    variable.operateStatus = variable.lastSingleStatus;         // 还原成默认状态
                    var btnDataKey = 'cancel'+variable.operateStatus.replace(/\b(\w)|\s(\w)/g, function(m){return m.toUpperCase();});
                    variable.$funcSetBtn.attr('data-key',btnDataKey).text(variable.funSetBtnText[btnDataKey]);
                    variable.$funcSet.find('li[data-key="'+variable.operateStatus+'"]').addClass('active');
                    variable.lastSingleStatus = '';
                    variable.$calculatorTable.find('td:not([data-key="submit"])').addClass('disabled');
                }
                break;
            case 'tip': // 添加小费
                var tip = parseFloat(variable.$calculatorEnter.val());
                if(tip){
                    variable.$selectedDishes.find('span.tip').children('em').text(tip.toFixed(2));

                    // 更新总价
                    var $targetTotal = variable.$selectedDishes.find('span.total').children('b');
                    var total = parseFloat(variable.selectedDishesTotal) + tip;
                    $targetTotal.text(total);
                    variable.selectedDishesTotal = total;

                    // 还原状态
                    initialization.calculatorInit();
                    variable.$funcSet.find('li:lt(6)').removeClass('active');
                    if(variable.lastSingleStatus == ''){
                        variable.operateStatus = '';
                        variable.$funcSetBtn.attr('data-key','back').text(variable.funSetBtnText['back']);

                    }else{
                        variable.operateStatus = variable.lastSingleStatus;         // 还原成默认状态
                        var btnDataKey = 'cancel'+variable.operateStatus.replace(/\b(\w)|\s(\w)/g, function(m){return m.toUpperCase();});
                        variable.$funcSetBtn.attr('data-key',btnDataKey).text(variable.funSetBtnText[btnDataKey]);
                        variable.$funcSet.find('li[data-key="'+variable.operateStatus+'"]').addClass('active');
                        variable.lastSingleStatus = '';
                        variable.$calculatorTable.find('td:not([data-key="submit"])').addClass('disabled');
                    }

                }else{
                    alert('请输入小费金额');
                }

                break;
            case 'dishesAttribute':

                alert('属性查询功能');
                break;
        }

    }
});