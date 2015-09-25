define(['variable'],function(variable){
    'use strict';
    // 创建分单与撤消菜单DOM窗口
    function createSingleCase(isSingle){
       var html =  '<div class="menu-group '+(isSingle ? 'menu-single' : 'menu-undo')+'">'+
            <!-- menu-single menu-undo : 分单 和 撤销菜单-->
        '<div class="total-order clearfix">'+
        '<span class="total-name">已选总额：</span>'+
        '<!--  <span class="tip">(小费：<em>0.00</em>)</span>-->'+
        '<span class="total"><b>0.00</b><i class="fa fa-euro fa-fw"></i></span>'+
        '</div>'+
        '<table class="table-list">'+
        '<tbody>'+
        '</tbody>'+
        '</table>'+
        '</div>';
        return html;
    }
    // 右侧已选择菜品初始化
    function initSelectedDishes(){
        variable.selectedDishesTotal = 0;
        variable.singleUndoTotal = 0;
        var html = null;
        $.each(variable.orderForm,function(index, item){
            html += '<tr data-food-id="'+item.id+'">'+
                '<td class="food-num">'+item.num+'</td>'+
                '<td class="food-id">'+item.id+'</td>'+
                '<td class="food-name">'+item.name+'</td>'+
                '<td class="food-price">'+item.price+'<i class="fa fa-euro fa-fw"></i></td>'+
                '<td class="food-total"><b>'+(item.price * item.num).toFixed(2)+'</b><i class="fa fa-euro fa-fw"></i></td>'+
                '</tr>';

            variable.selectedDishesTotal += item.price * item.num;
        });
        variable.$selectedDishes.find('table').empty().append(html);
        variable.$selectedDishes.find('span.total b').text(variable.selectedDishesTotal.toFixed(2));
    }

    // 中间菜品分类初始化
    function dishesCategory(){
        var foodCategory= $('<ul>',{'class':'food-list','id':'foodCategory'});
        $.each(variable.foodList, function(index, category){
            foodCategory.append( '<li id="'+category.id+'" class="food-'+variable.categoryBgColor[index]+'"><i class="fa fa-'+variable.categoryIcon[index]+'"></i> <em>'+category.name+'</em></li>');
        });
        variable.$orderConf.empty().append(foodCategory);
    }

    // 换桌 初始化
    function changeTable(){
        var html = '<div class="change-table">'+
            '<div class="changeTab-title">餐桌已换到105号</div>'+
            '</div>';
        variable.$orderConf.empty().append(html);
    }

    // 计算器初始化
    function calculatorInit(){
        variable.$calculatorTable.find('td').removeClass('disabled');
        variable.$calculatorTdChange.removeClass('active').attr('data-key','TOGO').text('TOGO');
        variable.$calculatorDecimal.addClass('disabled');
        variable.$calculatorSubmit.attr('data-status','confirm').text(variable.calculatorText.confirm);
        variable.$calculatorEnter.val('');
        variable.$calculatorStatus.text(variable.calculatorText.addOrder);
        variable.$calculatorIcon.removeClass('calculator-icon calculator-icon-money calculator-icon-percent');
    }

    // 菜品属性
    function dishesAttributeInit(){
        var html = '<ul class="dishes-attribute clearfix" id="dishAttribute">'+
                '<li class="attr-btn" data-key="return">返回</li>';
        $.each(variable.foodAttr,function(index, item){
            html+= '<li id="'+item.id+'"><b>'+item.id+'</b><em>'+item.name+'</em></li>';
        });

        html += '</ul>';

        variable.$orderConf.append(html);
    }
    return{
        createSingleCase   : createSingleCase,
        initSelectedDishes : initSelectedDishes,
        dishesCategory     : dishesCategory,
        changeTable        : changeTable,
        calculatorInit     : calculatorInit,
        dishesAttributeInit:dishesAttributeInit
    }
});