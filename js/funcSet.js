define(['jquery','variable','initialization'],function($, variable,initialization){
    'use strict';
    /**
     * 点餐页面右上侧功能集合
     * ======================================================================
     * calculatorTdChange  计算器 TOGO % € 切换
     * calculatorTimes     计算器乘号
     * calculatorDecimal   计算器小数点
     * calculatorSubmit    计算器确认按钮
     */
    var $calculatorTdChange = variable.$calculatorTdChange;
    var $calculatorTimes    = variable.$calculatorTimes;
    var $calculatorDecimal  = variable.$calculatorDecimal;
    var $calculatorSubmit   = variable.$calculatorSubmit;
    var $calculatorIcon     = variable.$calculatorIcon;

    var $calculatorEnter = variable.$calculatorEnter;
    var $calculatorStatus = variable.$calculatorStatus;


    /**
     * 绑定各按钮点击事件
     *
     * $this.index() 选择操作功能区域，大于5时则表示设打印方式 否则则表示执行各不同功能
     */
    variable.$funcSet.on('click','li',function(){
        var $this = $(this);
        var dataKey = $this.attr('data-key');

        if($this.index() > 5){
            $this.addClass('active').siblings(':gt(5)').removeClass('active');
            // 设置当前操作打印所属状态
            variable.printStatus = dataKey;
        }else{
            // 初始化相关数据
            $this.toggleClass('active').siblings(':lt(5)').removeClass('active');
            initialization.calculatorInit();  // 计算器部分初始化

            /**
             * 是否处于分单与摊销菜单状态，如果处于该状态 则判断最近一次操作分单或撤消菜品的状态是否存在
             * 如果该状态不存在添加最近一次的分单或撤消菜品状态为当前状态
             *
             * 如果在分单与销菜单状态下，再次执行功能切换时 当前所切换功能不是小费或折扣状态则复原所有操作
             *
             * 如果没有处于分单与销菜单状态下，则先复中间为菜品分类显示 并还原其操作状态为 空；
             *
             * 在此处逻辑处理完成后根据当前 状态执行下一逻辑
             */

            if(variable.$menuMan != null){
                if(variable.lastSingleStatus == ''){
                    variable.lastSingleStatus =  variable.operateStatus;
                }

                if(dataKey != 'tip' && dataKey != 'discount'){
                    variable.isSingle = true;             // 还原分单状态
                    variable.$menuMan = null;
                    initialization.initSelectedDishes();   // 还原左侧数据

                    initialization.dishesCategory();       // 复原到下单状态
                    variable.lastSingleStatus = '';        // 清除分单或撤消菜品状态
                }
            }else{
                initialization.dishesCategory();  // 复原到下单状态
            }

            /**
             * 根据当前状态是否与上次相同，不同则执行相关流程，相同则还原到点餐模式
             */

            if(variable.operateStatus == dataKey){

                if(variable.lastSingleStatus == ''){
                    variable.operateStatus = '';         // 还原成默认状态
                    variable.$funcSetBtn.attr('data-key','back').text('Back');

                }else{
                    variable.operateStatus = variable.lastSingleStatus;         // 还原成默认状态
                    var btnDataKey = 'cancel'+variable.operateStatus.replace(/\b(\w)|\s(\w)/g, function(m){return m.toUpperCase();});
                    variable.$funcSetBtn.attr('data-key',btnDataKey).text(variable.funSetBtnText[btnDataKey]);
                    variable.$funcSet.find('li[data-key="'+variable.operateStatus+'"]').addClass('active');
                    variable.lastSingleStatus = '';
                    variable.$calculatorTable.find('td:not([data-key="submit"])').addClass('disabled');
                }

            }else{
                var btnDataKey = 'cancel'+dataKey.replace(/\b(\w)|\s(\w)/g, function(m){return m.toUpperCase();});
                variable.$funcSetBtn.attr('data-key',btnDataKey).text(variable.funSetBtnText[btnDataKey]);
                variable.operateStatus = dataKey;


                // 给计算器确定按钮更换到当前状态
                $calculatorEnter.val('');
                $calculatorStatus.empty().text(variable.calculatorText[dataKey]);
                $calculatorSubmit.attr('data-status',dataKey);


                switch (dataKey){
                    case 'changeTable':
                        // 计算器功能部分
                        $calculatorTdChange.addClass('disabled');
                        $calculatorTimes.addClass('disabled');
                        $calculatorDecimal.addClass('disabled');
                        break;
                    case 'cancelMenu':
                        variable.$calculatorTable.find('td:not([data-key="submit"])').addClass('disabled');

                        if(variable.isSingle){
                            variable.isSingle = false;
                            // 创建撤销菜单
                            if(variable.$menuMan == null && variable.isSingle == false){
                                variable.$menuMan = initialization.createSingleCase(variable.isSingle);  // 创建撤销菜单容器
                                variable.$orderConf.empty().append(variable.$menuMan);
                            }else{
                                variable.$orderConf.empty().append(variable.$menuMan);
                                // ??? 空留 分单与撤消切换控制
                            }

                        }else{
                            variable.isSingle = true;
                        }

                        break;
                    case 'cancelTable':
                        console.log(new Date()+' : ' + dataKey);
                        break;
                    case 'discount':

                        $calculatorTdChange.addClass('active').attr({'data-key':'discount','data-type':'percent'}).text('%');
                        $calculatorTimes.addClass('disabled');
                        $calculatorDecimal.addClass('disabled');


                        $calculatorIcon.addClass('calculator-icon calculator-icon-percent');
                        break;
                    case 'tip':
                        $calculatorTdChange.addClass('active').attr('data-key','tip').text('€');
                        $calculatorTimes.addClass('disabled');
                        $calculatorDecimal.removeClass('disabled');

                        $calculatorIcon.addClass('calculator-icon calculator-icon-money');

                        console.log(new Date()+' : ' + dataKey);
                        break;
                    case 'dishesAttribute':
                        // 如果不存在在菜品订单 则还原到下单状态

                        if(variable.oldDishKey == ''){
                            variable.operateStatus = '';
                            variable.$funcSet.find('li:lt(6)').removeClass('active');
                            variable.$funcSetBtn.attr('data-key','back').text(variable.funSetBtnText['back']);
                            variable.$calculatorSubmit.attr('data-status','addOrder').text(variable.calculatorText.confirm);
                            variable.$calculatorStatus.text(variable.calculatorText.addOrder);

                            alert('请先下单');
                        }else{
                            initialization.dishesAttributeInit();
                        }
                        break;
                }
            }
        }
    });

    // 右侧上部取消功能集合
    variable.$funcSetBtn.on('click',function(){
        var $this = $(this);
        var dataKey = $this.attr('data-key');

        $this.attr('data-key','back').text(variable.funSetBtnText['back']);
        variable.$funcSet.find('li:lt(6)').removeClass('active');
        initialization.calculatorInit();     // 计算器部分初始化



        // 是否处于分单与摊销菜单状态
        if(variable.$menuMan != null){
            if(variable.lastSingleStatus == ''){
                variable.$orderConf.empty();           // 清空中间内容腾出后续操作空间
                variable.isSingle = true;             // 还原分单状态
                variable.$menuMan = null;
                initialization.initSelectedDishes();   // 还原左侧数据

                variable.operateStatus = '';         // 还原成默认状态
                initialization.dishesCategory();     // 还原右侧分类
                initialization.calculatorInit();     // 计算器部分初始化
            }else{
                variable.operateStatus = variable.lastSingleStatus;         // 还原成默认状态
                var btnDataKey = 'cancel'+variable.operateStatus.replace(/\b(\w)|\s(\w)/g, function(m){return m.toUpperCase();});
                variable.$funcSetBtn.attr('data-key',btnDataKey).text(variable.funSetBtnText[btnDataKey]);
                variable.$funcSet.find('li[data-key="'+variable.operateStatus+'"]').addClass('active');
                variable.lastSingleStatus = '';
                variable.$calculatorTable.find('td:not([data-key="submit"])').addClass('disabled');
            }
        }else{
            variable.operateStatus = '';         // 还原成默认状态
            initialization.dishesCategory();     // 还原右侧分类
        }

        switch (dataKey){
            case 'cancelSingle':
                variable.dishOrderSplit.empty(); // 清空分单数据
                break;
            case 'cancelCancelMenu':
                variable.dishOrderSplit.empty(); // 清空撤消菜品数据
                break;
            case 'cancelChangeTable':

                break;
            case 'cancelDiscount':
                break;
            case 'cancelTip':
                break;
            case 'back':
                break;
            case  'cancelAddOrder':

                variable.operateStatus = ''; // 还原状态
                variable.$preelect.empty();  // 清空预览列表
                variable.dishOther.empty();  // 清空提交数组
                variable.oldDishKey = '';
                break
            case 'cancelDishesAttribute':
                if(variable.oldCategoryData != ''){
                    var foodCategory= $('<ul>',{'class':'food-list','id':'foodDetail'});
                    $.each(variable.oldCategoryData, function(xxIndex,breed){
                        foodCategory.append( '<li id="'+breed.id+'" class="food-'+variable.categoryBgColor[variable.categoryStatus]+'"><i class="fa fa-'+variable.categoryIcon[variable.categoryStatus]+'"></i> <em>'+breed.name+'</em><span class="food-detail"><b class="food-price">'+ breed.price +'</b> | <b class="food-discount">'+ breed.stock +'</b></span></li>');
                    });
                    variable.$orderConf.append(foodCategory);
                }
                break;
        }
    });
});