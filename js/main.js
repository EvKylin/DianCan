'use strict';
require.config({
    baseUrl: 'js',
    paths: {
        jquery:'jquery-2.1.4.min'
    }
});

require(['jquery','variable','initialization'],function($, variable,initialization){
    'use strict';
    // 初始化相关数据
    initialization.dishesCategory();
    // 当前页面加载时 若存在选定菜单则展示出  即左侧菜单列表
    initialization.initSelectedDishes(); // 初始化

    require(['calculator']);     // 引入计算器模块
    require(['funcSet']);        // 引入右侧上部分功能模块
    require(['addOrder']);       // 引入添加Order 即菜品
    require(['addAttribute']);   // 引入添加属性
    require(['dishOrderSplit']); // 引入分单与撤消菜单功能

    /**
     * 支付方式功能集合
     * 状态值分别为 0，1，2，3， 4， 5；
     * 提交值为 variable.paymentStatus
     */
    variable.$paymentWay.on('click','li',function(){
        var dataKey = $(this).attr('data-key');
        $(this).addClass('active').siblings().removeClass('active');
        variable.paymentStatus = dataKey;
    });
});