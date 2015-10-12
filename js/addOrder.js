define(['jquery','variable','mixin','initialization'],function($, variable, mixin ,initialization){
    'use strict';
    variable.$orderConf.on('click','ul.food-list li',function(){
        var categoryNav = $(this).parent().attr('id');
        switch (categoryNav){
            case 'foodCategory':
                if(variable.operateStatus != 'addOrder'){
                    variable.$funcSetBtn.attr('data-key','back').text(variable.funSetBtnText['back']);
                    variable.$funcSet.find('li:lt(6)').removeClass('active');
                    variable.operateStatus = '';         // 还原成默认状态
                    variable.$orderConf.empty();
                    initialization.dishesCategory();    //还原右侧分类
                    initialization.calculatorInit();  // 计算器部分初始化

                    if(variable.operateStatus == 'dishesAttribute'){
                        variable.$orderConf.find('#dishAttribute').remove();
                    }
                }

                // 记录当前所操作分类状态 后续状态背景颜色要用
                //variable.categoryStatus = $(this).index(); //暂用索引代替

                variable.$orderConf.find('#foodBreed').remove();
                variable.$orderConf.find('#foodDetail').remove();
                var thisID = $(this).attr('id');

                $.each(variable.foodList,function(index,item){
                    if(item.id == thisID){
                        var foodCategory= $('<ul>',{'class':'food-list','id':'foodBreed'});
                        $.each(item.child, function(breedIndex,breed){
                            foodCategory.append( '<li id="'+breed.id+'" class="food-'+breed.categoryBgColor+'"><i class="fa fa-'+breed.categoryIcon+'"></i> <em>'+breed.name+'</em></li>');
                        });
                        variable.$orderConf.append(foodCategory);
                    }
                });

                break;
            case 'foodBreed':

                variable.$orderConf.find('#foodBreed').remove();
                variable.$orderConf.find('#foodDetail').remove();
                var thisID = $(this).attr('id');

                $.each(variable.foodList, function(index,category){
                    $.each(category.child,function(breedIndex,item){
                        if(item.id == thisID){
                            var foodCategory= $('<ul>',{'class':'food-list','id':'foodDetail'});

                            variable.oldCategoryData = item.child;
                            $.each(item.child, function(xxIndex,breed){
                                foodCategory.append( '<li id="'+breed.id+'" class="food-'+breed.categoryBgColor+'"><i class="fa fa-'+breed.categoryIcon+'"></i> <em>'+breed.name+'</em><span class="food-detail"><b class="food-price">'+ breed.price +'</b> | <b class="food-discount">'+ breed.stock +'</b></span></li>');
                            });
                            variable.$orderConf.append(foodCategory);
                        }
                    });
                });

                break
            case 'foodDetail':
                var dishId    = $(this).attr("id");
                var price     = $(this).find(".food-price").html();
                var istogo    = variable.isToGo ? 1 : 0;
                var dishCount = $(this).find(".food-discount").html();
                var dishName  = $(this).find('em').html();
                var categoryBgColor = $(this).attr('class').split('-')[1];
                var categoryIcon = $(this).find('i.fa').attr('class').split(' ')[1].split('-')[1];

                variable.preelectStyle = [categoryBgColor,categoryIcon];
                mixin.addOrder(dishName, dishId, price, istogo, dishCount); // 添加菜品
                variable.$calculatorStatus.text(variable.calculatorText.addOrder);
                break;
        }
    });

    /**
     * 预选菜品删除功能
     */
    variable.$preelect.on('click','li',function(){
        var key = $(this).attr('data-food-id-number');
        var dish = variable.dishOther.getkey(key);
        var copise = dish.copise - 1;
        if(copise == 0){
            $(this).remove();
            variable.dishOther.removeKey(key);
        }else{
            $(this).find('.ps-num').attr('title',copise).text(copise);
            variable.dishOther.put(dish.key, dish.dishID, copise, dish.dishPrice, dish.isTogo, dish.dishCount, dish.extraID);
        }

    });
});