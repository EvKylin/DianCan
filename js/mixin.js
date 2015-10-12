define(['jquery','variable'],function($, variable){
    'use strict';
    function addOrder (dishName, dishId, price, istogo, dishCount, num){
        variable.dishCountType = 'order'; // 更改折扣状
        // 添加选定菜品
        var copies = num ? num : 1;  //菜的份数 默认为1
        var disKeyArr = [];
        disKeyArr.push(dishId);
        disKeyArr.push(price);
        disKeyArr.push(istogo);
        disKeyArr.push(dishCount);
        var dishKey = disKeyArr.join('-');
        //var dishKey = dishId + price + istogo + dishCount;
        variable.oldDishKey = dishKey;   // 记录当次操作的disKey 在添加属性等 操作用

        var tmp_arr = variable.$preelect.find("li[data-food-id-number='"+dishKey+"']");
        var dish = variable.dishOther.getkey(dishKey);   // 从保存的数据数组中取出已添加的菜品
        if (dish == null) {
          var html = '<li class="preelect-list preelect-'+variable.preelectStyle[0]+'" data-food-id-number="'+ dishKey +'">'+
              '<div class="preelect-status">'+
              (variable.isToGo ? '<b title="ToGo" class="ps-isToGo"></b>' :'') +
             // '<b title="attribute" class="ps-attribute"></b>'+
              '<b title="'+ copies +'" class="ps-num">'+ copies +'</b>'+
              '</div>'+
              '<div class="preelect-info">'+ dishName +'</div>'+
              '</li>';

          variable.$preelect.prepend(html);
          variable.currentDishNum = dishId; //当前菜品编号 即菜品ID
          variable.dishOther.put(dishKey, dishId, copies, price, istogo, dishCount, "");

        } else {
          copies = parseInt(tmp_arr.find('.ps-num').text()) + parseInt(1);  //菜份
          tmp_arr.find('.ps-num').text(copies);

          var newdish = dish.dishID;
          var dishprice = dish.dishPrice;
          var newistogo = dish.isTogo;
          var newdishCount = dish.dishCount;

          if(newdish == dishId && dishprice == price && newistogo == istogo && newdishCount == dishCount) {
              // 更新份数 并将其移至到 最前面
              dish.copise = copies;
              var html = '<li class="preelect-list preelect-'+variable.preelectStyle[0]+'" data-food-id-number="'+ dishKey +'">'+
                  '<div class="preelect-status">'+
                  (variable.isToGo ? '<b title="ToGo" class="ps-isToGo"></b>' :'') +
                 // '<b title="attribute" class="ps-attribute"></b>'+
                  '<b title="'+ dish.copise +'" class="ps-num">'+ dish.copise +'</b>'+
                  '</div>'+
                  '<div class="preelect-info">'+ dishName +'</div>'+
                  '</li>';

              tmp_arr.remove();
              variable.$preelect.prepend(html);
              variable.dishOther.put(dishKey, dishId, copies, price, istogo, dishCount, ""); // 更新数据数组
          }
        }
        if(variable.operateStatus != 'addOrder'){
            variable.operateStatus = 'addOrder'; // 设置当前状态为下单状态

            // 设置计算器 相关状态
            variable.$calculatorSubmit.attr('data-status','print').text(variable.calculatorText.print);
            variable.$funcSetBtn.attr('data-key','cancelAddOrder').text(variable.funSetBtnText['cancelAddOrder']);

        }
    }

    function updatePreelect($targetElement,newKey,newCopise){
        $targetElement.attr('data-food-id-number',newKey);
        $targetElement.find('b.ps-num').attr('title',newCopise).text(newCopise);
        $targetElement.find('b.ps-num').before('<b title="attribute" class="ps-attribute"></b>');
        $targetElement.prependTo(variable.$preelect);
    }

    // 属必包括折扣与 属性列表
    function addDishAttr(attr){
        var attrType = '', attrValue = '';
        if(attr){
            $.each(attr,function(i,item){
                attrType = i;
                attrValue = item;
            });
        }else { return }

        // attrType 目前有 折扣与属性两种

        console.log(attrType,attrValue)

        var extraId = attrValue;
        var oldKey  = variable.oldDishKey; // 上次添加数据标识


        // 组合新的标识值
        var newKey = '';
        if(attrType == 'attr'){
            newKey  = oldKey.split('|')[0] + '|'+ extraId;
        }else if(attrType == 'discount'){
            var x = oldKey.split('|');
            var c = oldKey.split('|')[0].split('-');
            c.splice(3,1,attrValue);
            c.join('-');
            x.splice(0,1,c.join('-'));
            newKey = x.join('|');
        }

        var oldDish = variable.dishOther.getkey(oldKey);  // 取出上次添加的数所对应的对象
        var newDish = variable.dishOther.getkey(newKey); // 添加属性后所组成的新标识所对应的对象
        var copise  = parseInt(oldDish.copise) - 1;


        var $oldElement =  variable.$preelect.find('li[data-food-id-number="'+ oldKey +'"]');
        var $newElement =  variable.$preelect.find('li[data-food-id-number="'+ newKey +'"]');

        // 先从旧的对象中删除一条数据
        if(copise <= 0){
            variable.dishOther.removeKey(oldKey);
            $oldElement.remove();
        }else{
            variable.dishOther.put(oldKey, oldDish.dishID, copise, oldDish.dishPrice, oldDish.isTogo, oldDish.dishCount, oldDish.extraID);
            $oldElement.find('b.ps-num').attr('title',copise).text(copise);
        }

        // 若新组成的newKey 已经在variable.dishOther 中存在则只需更新其份数并将其移至首位
        // 如果新添加的属性与已经存在的数据中相同则更新已经存在的数据，否则新创建一条数据并移出已存在菜品份数的一份
        if(newDish == null){
            // 不存在则新添加： 并减去  已存在数据中，最近添加的数据的份数
            variable.dishOther.put(newKey, oldDish.dishID, 1, oldDish.dishPrice, oldDish.isTogo, (attrType == 'discount' ? attrValue : oldDish.dishCount), (attrType == 'attr'? extraId:oldDish.extraID));

            var $targetElement = $oldElement.clone(true);  // 复制一个与oldKey相同的节点，并更新节点中信息
            updatePreelect($targetElement,newKey,1);

        }else{
            // 存在更新份数     并减去  已存在数据中，最近添加的数据的份数
            var newCopise = parseInt(newDish.copise) + 1;
            variable.dishOther.put(newKey, newDish.dishID, newCopise, newDish.dishPrice, newDish.isTogo, newDish.dishCount, newDish.extraID);

            var $targetElement = $newElement.clone(true); // 复制一个与newKey相同的节点，并更新节点中信息
            updatePreelect($targetElement,newKey,newCopise);
            $newElement.remove();
        }
        variable.oldDishKey = newKey; // 更新上次记录标识
    }
    return {
        addOrder : addOrder,
        addDishAttr : addDishAttr
    }
});