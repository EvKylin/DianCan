define(['jquery','variable','initialization'],function($, variable,initialization){
    'use strict';
// 左侧选定菜品分单与撤销处理
    variable.$selectedDishes.on('click','table.table-list tbody tr',function(){
        DishesOpt(false, $(this));
    });

    //从右侧移出
    variable.$orderConf.on('click','table.table-list tbody tr',function(){
        DishesOpt(true, $(this));
    });

    /**
     * @param jsToSelected  是否从右侧移入
     * @param $this  点击目标元素
     * @constructor
     */
    function DishesOpt(jsToSelected, $this){
        /**
         * targetParent 当前元素移入的父元素
         * targetTotal  总价格所处关系
         * @type {string}
         */

        if(variable.operateStatus == 'changeTable'){
            if(variable.changeTableNumber == ''){
                alert('请先添加所要换的桌号');
                return;
            }
        }



        // 分单状态下状态 如果
        if(variable.isSingle && variable.operateStatus != 'changeTable'){
            variable.$funcSetBtn.attr('data-key','cancelSingle').text(variable.funSetBtnText['cancelSingle']);
            variable.$calculatorTable.find('td:not([data-key="submit"])').addClass('disabled');
            variable.operateStatus = 'single';
            variable.$calculatorSubmit.attr('data-status','single').text(variable.calculatorText.confirm);
            variable.$calculatorStatus.text('');
            variable.$funcSet.find('li:lt(6)').removeClass('active');

            variable.tip = 0.00;
            variable.$selectedDishes.find('span.tip').children('em').text('0.00');
        }

        //创建分单与撤消菜品容器 从左到右菜品移入
        if(variable.$menuMan == null && jsToSelected == false){
            variable.$menuMan = initialization.createSingleCase(variable.isSingle,  variable.operateStatus);

            if(variable.operateStatus == 'changeTable'){
                variable.$orderConf.append(variable.$menuMan);
            }else{
                variable.$orderConf.empty().append(variable.$menuMan);
            }

        }


        var targetParent = jsToSelected ? '$selectedDishes' : '$orderConf';
        var targetTotal = jsToSelected ? 'singleUndoTotal' : 'selectedDishesTotal';

        var $tdFoodId = $this.children('.food-id').text();
        var $tdNum= $this.children('.food-num');
        var $tdPrice = $this.children('.food-price');
        var $tdTotalPrice = $this.children('.food-total').children('b');
        var num = parseInt($tdNum.text());

        if(num > 1){
            num --;
            $tdNum.text(num);
        }else{
            $this.remove();
        }

        var singleUndoTotal = variable[targetParent].find('.total-order .total b');
        singleUndoTotal.text(variable[(!jsToSelected ? 'singleUndoTotal':'selectedDishesTotal')].toFixed(2));

        var $menuTbody = variable[targetParent].find('table.table-list tbody');

        //判断当前是否存在选择元素
        var $exist = $menuTbody.find('tr[data-food-id="'+$tdFoodId+'"]');  // 当前点击元素在目标容器中是否存在
        if($exist.length){
            var existNum = parseInt($exist.children('.food-num').text());
            existNum ++;
            $exist.children('.food-num').text(existNum);
            var $existAllPrice = $exist.children('.food-total');
            $existAllPrice.find('b').text(($existAllPrice.prev().text() * existNum).toFixed(2));


        }else{
            //创建分单与撤消菜品列表 ， 当所添加元素不在目标容器中存在时
            var $moveHtml = '<tr data-food-id="'+ $tdFoodId +'">'+
                '<td class="food-num">1</td>'+
                '<td class="food-id">'+ $this.children('.food-id').text() +'</td>'+
                '<td class="food-name">'+ $this.children('.food-name').text() +'</td>'+
                ((variable.isSingle && !jsToSelected) ? '<td class="food-pack">是</td>' : '')+
                '<td class="food-price">'+ $this.children('.food-price').text() +'<i class="fa fa-euro fa-fw"></i></td>'+
                '<td class="food-total"><b>'+ $this.children('.food-price').text() +'</b><i class="fa fa-euro fa-fw"></i></td>'+
                '</tr>';
            $menuTbody.append($moveHtml);
            variable.$preelect.empty();  // 清空预览列表
        }

        variable[(!jsToSelected ? 'singleUndoTotal':'selectedDishesTotal')] += parseFloat($this.children('.food-price').text()); // 更新目标总价格
        singleUndoTotal.text(variable[(!jsToSelected ? 'singleUndoTotal':'selectedDishesTotal')].toFixed(2)); // 设置DOM节点目标的总价

        //更新当前点击元素所对应的价格
        $tdTotalPrice.text(($tdTotalPrice.text()-$tdPrice.text()).toFixed(2));
        variable[targetTotal] = variable[targetTotal] - $tdPrice.text();
        variable[(!jsToSelected ? '$selectedDishes':'$orderConf')].find('span.total b').text(Math.abs(variable[targetTotal]).toFixed(2));


        // 此处以上全为视图操作
        // 更新分单或撤消菜品的数据
        if(!jsToSelected){
            var spList = variable.dishOrderSplit.getkey($tdFoodId);
            if(spList != null){
                var copise = spList.copise + 1;
                variable.dishOrderSplit.put($tdFoodId,copise);
            }else{
                variable.dishOrderSplit.put($tdFoodId,1);
            }
        }else{
            var splitList = variable.dishOrderSplit.getkey($tdFoodId);
            var copise = splitList.copise - 1;

            if(copise == 0){
                variable.dishOrderSplit.removeKey($tdFoodId);
            }else{
                variable.dishOrderSplit.put($tdFoodId,copise);
            }
        }

        // 判断variable.dishOrderSplit 中是否还有数据，即右侧分单或撤消容器中还是否存在数据

        if(!variable.dishOrderSplit.splitList.length){


            // 如果当前不存在数则还原页面到初始状态
            initialization.dishesCategory();
            initialization.calculatorInit();
            variable.operateStatus = '';
            variable.$funcSetBtn.attr('data-key','back').text(variable.funSetBtnText['back']);
            variable.$funcSet.find('li:lt(6)').removeClass('active');

            variable.$menuMan = null;
            variable.isSingle = true;
        }
    }
});