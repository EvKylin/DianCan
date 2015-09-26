define(['jquery','variable','mixin'],function($, variable, mixin){
    'use strict';
    var attrArr = [];
    variable.$orderConf.on('click','#dishAttribute li:not(:first)',function(){

        var $this  = $(this);
        $this.toggleClass('active');
        var attrID = $this.attr('id');

        if($this.hasClass('active')){
            attrArr.push(attrID);
        }else{
            attrArr.splice($.inArray(attrID,attrArr),1);
        }

        if(attrArr.length){
            $this.parent().children(':first').attr('data-key','confirm').text('确定');
        }else{
            $this.parent().children(':first').attr('data-key','return').text('返回');
        }
    });

    variable.$orderConf.on('click','#dishAttribute li:first',function(){
        var $this  = $(this);
        var dataKey = $this.attr('data-key');

        if(dataKey == 'confirm'){
            if(attrArr.length){
                attrArr.sort(function(a,b){ return a-b}); // 将属性数组按大小进行排序

                var extraId = attrArr.join('-');

                mixin.addDishAttr({attr:extraId});

                attrArr = []; // 属性添加完成后置空属性集合.
                returnAddDish()
            }

        }else if(dataKey == 'return'){
            // 返回到上次操作
            returnAddDish()
        }

    });



    function returnAddDish(){
        if(variable.oldCategoryData){
            var foodCategory= $('<ul>',{'class':'food-list','id':'foodDetail'});
            $.each(variable.oldCategoryData, function(xxIndex,breed){
                foodCategory.append( '<li id="'+breed.id+'" class="food-'+variable.categoryBgColor[variable.categoryStatus]+'"><i class="fa fa-'+variable.categoryIcon[variable.categoryStatus]+'"></i> <em>'+breed.name+'</em><span class="food-detail"><b class="food-price">'+ breed.price +'</b> | <b class="food-discount">'+ breed.stock +'</b></span></li>');
            });
            variable.$orderConf.append(foodCategory);
        }

        variable.$orderConf.find('#dishAttribute').remove();
        variable.$funcSet.find('li:lt(6)').removeClass('active');

        variable.$funcSetBtn.attr('data-key','cancelAddOrder').text(variable.funSetBtnText['cancelAddOrder']);
        variable.$calculatorSubmit.attr('data-status','print').text(variable.calculatorText.print);

        variable.operateStatus = 'addOrder';
    }
});