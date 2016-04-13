define([], function () {
    'use strict';
    //当前菜品 各属性例如：不ID，价格，份数等
    function dish(key, dishID, copise, dishPrice, isTogo, dishCount, extraID) {
        this.key = key;                // 唯一标识
        this.dishID = dishID;          // 菜品ID
        this.copise = copise;          // 份数
        this.dishPrice = dishPrice;    // 价格
        this.isTogo = isTogo;          // 是否带走
        this.dishCount = dishCount;    // 折扣ID
        this.extraID = extraID;        // 属性ID
    }
    //DishClass
    function DishClass() {
        this.dishs = [];
    };
    DishClass.prototype = {
        constructor: DishClass,
        put : function (key, dishID, copise, dishPrice, isTogo, dishCount, extraID) {
            for (var i = 0; i < this.dishs.length; i++) {
                if (this.dishs[i].key === key) {
                    this.dishs[i].dishID = dishID;
                    this.dishs[i].copise = copise;
                    this.dishs[i].dishPrice = dishPrice;
                    this.dishs[i].isTogo = isTogo;
                    this.dishs[i].dishCount = dishCount;
                    this.dishs[i].extraID = extraID;
                    return;
                }
            }
            this.dishs[this.dishs.length] = new dish(key, dishID, copise, dishPrice, isTogo, dishCount, extraID);
        },
        removeKey : function (key) {
            var v;
            for (var i = 0; i < this.dishs.length; i++) {
                v = this.dishs.pop();
                if (v.key === key)
                    continue;
                this.dishs.unshift(v);
            }
        },
        getkey : function (key) {
            for (var i = 0; i < this.dishs.length; i++) {
                if (this.dishs[i].key === key) {
                    return this.dishs[i];
                }
            }
            return null;

        },
        ValusSet : function () {
            var keyArray = [];
            for (var i = 0; i < this.dishs.length; i++) {
                keyArray[i] = this.dishs[i];
            }
            return keyArray;
        },
        empty : function(){
            this.dishs = [];
        }
    }




    // 所选菜品属性 例如 属性ID 名称
    function DishAttr(key, attrId, attrName, attrPrice, attrDisKey) {
        this.key = key;
        this.attrId = attrId;
        this.attrName = attrName;
        this.attrPrice = attrPrice;
        this.attrDisKey = attrDisKey
    }

    //DishExtra
    function DishExtra() {
        this.dishs = [];
        this.put = function (key, attrId, attrName, attrPrice, attrDisKey) {
            for (var i = 0; i < this.dishs.length; i++) {
                if (this.dishs[i].key === key) {
                    this.dishs[i].attrId = attrId;
                    this.dishs[i].attrName = attrName;
                    this.dishs[i].attrPrice = attrPrice;
                    this.dishs[i].attrDisKey = attrDisKey;
                    return;
                }
            }
            this.dishs[this.dishs.length] = new DishAttr(key, attrId, attrName, attrPrice, attrDisKey);
        }, this.removeKey = function (key) {
            var v;
            for (var i = 0; i < this.dishs.length; i++) {
                v = this.dishs.pop();
                if (v.key === key)
                    continue;
                this.dishs.unshift(v);
            }
        }, this.getkey = function (key) {
            for (var i = 0; i < this.dishs.length; i++) {
                if (this.dishs[i].key === key) {
                    return this.dishs[i];
                }
            }
            return null;

        }, this.ValusSet = function () {
            var keyArray = [];
            for (var i = 0; i < this.dishs.length; i++) {
                keyArray[i] = this.dishs[i];
            }
            return keyArray;
        }
    };

    // 分单与撤消对象
    function splitList(key, copise) {
        this.key = key;                // 唯一标识/菜品ID
        this.copise = copise;          // 份数
    }
    //DishClass
    function DishSplit() {
        this.splitList = [];
        this.put = function (key, copise) {
            for (var i = 0; i < this.splitList.length; i++) {
                if (this.splitList[i].key === key) {
                    this.splitList[i].copise = copise;
                    return;
                }
            }
            this.splitList[this.splitList.length] = new splitList(key, copise);
        }, this.removeKey = function (key) {
            var v;
            for (var i = 0; i < this.splitList.length; i++) {
                v = this.splitList.pop();
                if (v.key === key)
                    continue;
                this.splitList.unshift(v);
            }
        }, this.getkey = function (key) {
            for (var i = 0; i < this.splitList.length; i++) {
                if (this.splitList[i].key === key) {
                    return this.splitList[i];
                }
            }
            return null;

        }, this.ValusSet = function () {
            var keyArray = [];
            for (var i = 0; i < this.splitList.length; i++) {
                keyArray[i] = this.splitList[i];
            }
            return keyArray;
        },this.empty = function(){
            this.splitList = [];
        }
    };

    return {
        DishClass : DishClass,
        DishExtra : DishExtra,
        DishSplit : DishSplit
    }
});