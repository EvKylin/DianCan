define(['jquery','utilities'],function($,utilities){
    'use strict';
    return{
        $selectedDishes     : $('#selected-dishes'),      // 选定菜品区域
        $orderConf          : $('#order-conf'),           // 撤销菜单和取消分单总价
        $preelect           : $('#preelect'),             // 预选菜单列表
        $calculator         : $('#calculator'),           // 计算器模块
        $calculatorTable    : $('#calculatorTable'),      // 计算器按钮
        $calculatorOutput   : $('#calculatorOutput'),     // 计算器输出
        $calculatorTdChange : $('#calcTdChange'),         // 计算器"TOGO %"切换
        $calculatorTimes    : $('#calcTimes'),            // 计算器乘号
        $calculatorDecimal  : $('#calcDecimal'),          // 计算器小数点
        $calculatorSubmit   : $('#calcBtn'),              // 计算器按钮
        $calculatorEnter    : $('#calcEnter'),            // 计算器输入框
        $calculatorStatus   : $('#calcStatus'),           // 计算器状态框
        $calculatorIcon     :$('#calcIcon'),              // 计算器小费折扣状态
        calculatorText      : {
            changeTable     : '请输入需要更换的餐桌',
            tip             : '请输入小费金额',
            discount        : '请输入折扣比',
            print           : '打印',
            confirm         : '确定',
            addOrder        : '请输入要查询有菜品编号'

        },
        dishesQueryUrl        : '',                       // 菜品查询地址
        tableQueryUrl         : '',                       // 餐桌查询地址

        dishesQueryText     :{
            isTrue : '点击确认添加。',
            isFalse: '没有该菜品!'
        },
        $paymentWay         : $('#payment-way'),          // 支付方式
        paymentStatus       : 0,                          // 支付方式状态
        $funcSet            : $('#func-set'),             // 操作功能集合
        $funcSetBtn         : $('#func-set-btn'),         // 操作功能集合取消功能
        funSetBtnText       : {
            back                  : 'Back',
            cancelChangeTable     : '取消换桌',
            cancelSingle          : '取消分单',
            cancelCancelMenu      : '取消撤消菜单',
            cancelCancelTable     : '取消撤消餐桌',
            cancelDiscount        : '取消折扣',
            cancelTip             : '取消小费',
            cancelDishesAttribute : '取消菜品属性',
            cancelAddOrder        : '取消下单流程'
        },                                                // 操作功能文本
        operateStatus       : '',                         // 操作状态，默认下单
        lastSingleStatus    : '',                         // 记录最近一次分单单位还是撤消操作状态
        printStatus         : 'notPrint',                 // 记录打印
        selectedDishesTotal : 0,                          // 选定菜品总价
        singleUndoTotal     : 0,                          // 撤销菜单和取消分单总价
        isSingle            : true,                      // 分单还是撤销菜单
        changeTableNumber   : '',                         // 换桌号
        $menuMan            : null,                      // 已下菜单单处理容器
        isToGo              : false,                     // 是否打包带走
        dishCountType       : 'pay',                      // 折扣类型：下单（order）| 买单（pay）
        discountType        : 'percent',                  // 折扣方式：百分比 percent | 折扣价格 discountPrice
        dishOrderSplit      : new utilities.DishSplit(),  // 拆分已经订单，分单各撤消菜单
        dishExtra           : new utilities.DishExtra(),  // 保存各个菜品的属性
        currentDishNum      : "",
        oldDishKey          : "",                          // 记录上次选中的菜品
        dishOther           : new utilities.DishClass(),  // 构建的菜品对象
        categoryIcon        : ['glass','beer','coffee','cutlery'],      // 菜品分类图标，字符表示以fa-为开头的类名
        categoryBgColor     : ['blue','red','green','yellow'],          // 菜品分类背景颜色,字符表示以food-为开头的类名
        categoryStatus      : 0,                                        // 记录当前操作菜品分类
        oldCategoryData     : '',                                       // 记录上次点餐分类菜品
        orderForm : [
            {
                id :1002,
                name: 'sandwich ',
                price:'32.00',
                num:'3',
                attribute:[],
                isToGo: ''
            },
            {
                id :1003,
                name: 'noodles ',
                price:'36.79',
                num:'3',
                attribute:[]

            },
            {
                id :1004,
                name: 'steak  ',
                price:'22.09',
                num:'1',
                attribute:[]
            },
            {
                id :1005,
                name: 'hamburger  ',
                price:'39.15',
                num:'2',
                attribute:[]
            },
            {
                id :1006,
                name: 'coffee ',
                price:'40.05',
                num:'6',
                attribute:[]
            }
        ],
        foodList:[
            {
                id: 1001,
                name: '酒水',
                child:[
                    {
                        id:10011,
                        name:'白酒',
                        child:[
                            {
                                id: 100111,
                                name:'茅台',
                                type:'浓香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100112,
                                name:'五粮液',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100113,
                                name:'剑南春',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100114,
                                name:'泸州老窖',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100115,
                                name:'水井坊',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100116,
                                name:'洋河',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }
                        ]
                    },
                    {
                        id:10012,
                        name:'红酒',
                        child:[
                            {
                                id: 100121,
                                name:'拉菲',
                                type:'干红',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100122,
                                name:'奔富',
                                type:'干红',
                                price:'108.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100123,
                                name:'长城',
                                type:'半干红',
                                price:'198.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100124,
                                name:'木桐',
                                type:'干白',
                                price:'208.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100125,
                                name:'小企鹅',
                                type:'半干白',
                                price:'68.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100126,
                                name:'黄尾袋鼠',
                                type:'半干白',
                                price:'128.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }
                        ]
                    },
                    {
                        id:10013,
                        name:'洋酒',
                        child:[
                            {
                                id: 100131,
                                name:'基地',
                                type:'浓香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 1001132,
                                name:'青年',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100133,
                                name:'眼看着',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100134,
                                name:'昨日',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100135,
                                name:'睥睨',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100136,
                                name:'手中',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }
                        ]
                    },
                    {
                        id:10014,
                        name:'黄酒',
                        child:[                            {
                            id: 100141,
                            name:'顶珠',
                            type:'浓香型',
                            price:'108.00',
                            area :'四川',
                            date:'2011/12/12',
                            variety:'',
                            stock: '123'
                        },
                            {
                                id: 100142,
                                name:'遥股份有',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100143,
                                name:'加强',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100144,
                                name:'静坐',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100145,
                                name:'珠海',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100146,
                                name:'表白',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }]
                    },
                    {
                        id:10015,
                        name:'啤酒',
                        child:[                            {
                            id: 100151,
                            name:'格式化',
                            type:'浓香型',
                            price:'108.00',
                            area :'四川',
                            date:'2011/12/12',
                            variety:'',
                            stock: '123'
                        },
                            {
                                id: 100152,
                                name:'加盟',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100153,
                                name:'灾星',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100154,
                                name:'上面',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100155,
                                name:'顶起',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100156,
                                name:'顶起人',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }]
                    }
                ]
            },
            {
                id: 1002,
                name: '茶水',
                child:[
                    {
                        id:10021,
                        name:'茶-白酒',
                        child:[
                            {
                                id: 100211,
                                name:'茶-茅台',
                                type:'茶-浓香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100212,
                                name:'茶-五粮液',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100213,
                                name:'茶-剑南春',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100214,
                                name:'茶-泸州老窖',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100215,
                                name:'茶-水井坊',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100216,
                                name:'茶-洋河',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }
                        ]
                    },
                    {
                        id:10022,
                        name:'茶-红酒',
                        child:[
                            {
                                id: 100221,
                                name:'茶-拉菲',
                                type:'干红',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100222,
                                name:'茶-奔富',
                                type:'干红',
                                price:'108.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100223,
                                name:'茶-长城',
                                type:'半干红',
                                price:'198.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100224,
                                name:'茶-木桐',
                                type:'干白',
                                price:'208.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100225,
                                name:'茶-小企鹅',
                                type:'半干白',
                                price:'68.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100226,
                                name:'茶-黄尾袋鼠',
                                type:'半干白',
                                price:'128.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }
                        ]
                    },
                    {
                        id:10023,
                        name:'茶-洋酒',
                        child:[
                            {
                                id: 100231,
                                name:'茶-基地',
                                type:'浓香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 1002132,
                                name:'茶-青年',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100233,
                                name:'茶-眼看着',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100234,
                                name:'茶-昨日',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100235,
                                name:'茶-睥睨',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100236,
                                name:'茶-手中',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }
                        ]
                    },
                    {
                        id:10024,
                        name:'茶-黄酒',
                        child:[                            {
                            id: 100241,
                            name:'茶-顶珠',
                            type:'浓香型',
                            price:'108.00',
                            area :'四川',
                            date:'2011/12/12',
                            variety:'',
                            stock: '123'
                        },
                            {
                                id: 100242,
                                name:'茶-遥股份有',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100243,
                                name:'茶-加强',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100244,
                                name:'茶-静坐',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100245,
                                name:'茶-珠海',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100246,
                                name:'茶-表白',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }]
                    },
                    {
                        id:10025,
                        name:'茶-啤酒',
                        child:[                            {
                            id: 100251,
                            name:'茶-格式化',
                            type:'浓香型',
                            price:'108.00',
                            area :'四川',
                            date:'2011/12/12',
                            variety:'',
                            stock: '123'
                        },
                            {
                                id: 100252,
                                name:'茶-加盟',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100253,
                                name:'茶-灾星',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100254,
                                name:'茶-上面',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100255,
                                name:'茶-顶起',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100256,
                                name:'茶-顶起人',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }]
                    }
                ]
            },
            {
                id: 1003,
                name: '咖啡',
                child:[
                    {
                        id:10031,
                        name:'咖啡-白酒',
                        child:[
                            {
                                id: 100311,
                                name:'咖啡-茅台',
                                type:'浓香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100312,
                                name:'咖啡-五粮液',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100313,
                                name:'咖啡-剑南春',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100314,
                                name:'咖啡-泸州老窖',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100315,
                                name:'咖啡-水井坊',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100316,
                                name:'咖啡-洋河',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }
                        ]
                    },
                    {
                        id:10032,
                        name:'咖啡-红酒',
                        child:[
                            {
                                id: 100321,
                                name:'咖啡-拉菲',
                                type:'干红',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100322,
                                name:'咖啡-奔富',
                                type:'干红',
                                price:'108.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100323,
                                name:'咖啡-长城',
                                type:'半干红',
                                price:'198.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100324,
                                name:'咖啡-木桐',
                                type:'干白',
                                price:'208.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100325,
                                name:'咖啡-小企鹅',
                                type:'半干白',
                                price:'68.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100326,
                                name:'咖啡-黄尾袋鼠',
                                type:'半干白',
                                price:'128.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }
                        ]
                    },
                    {
                        id:10033,
                        name:'咖啡-洋酒',
                        child:[
                            {
                                id: 100331,
                                name:'咖啡-基地',
                                type:'浓香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100332,
                                name:'咖啡-青年',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100333,
                                name:'咖啡-眼看着',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100334,
                                name:'咖啡-昨日',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100335,
                                name:'咖啡-睥睨',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100336,
                                name:'咖啡-手中',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }
                        ]
                    },
                    {
                        id:10034,
                        name:'咖啡-黄酒',
                        child:[                            {
                            id: 100341,
                            name:'咖啡-顶珠',
                            type:'浓香型',
                            price:'108.00',
                            area :'四川',
                            date:'2011/12/12',
                            variety:'',
                            stock: '123'
                        },
                            {
                                id: 100342,
                                name:'咖啡-遥股份有',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100343,
                                name:'咖啡-加强',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100344,
                                name:'咖啡-静坐',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100345,
                                name:'咖啡-珠海',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100346,
                                name:'咖啡-表白',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }]
                    },
                    {
                        id:10035,
                        name:'咖啡-啤酒',
                        child:[                            {
                            id: 100351,
                            name:'咖啡-格式化',
                            type:'浓香型',
                            price:'108.00',
                            area :'四川',
                            date:'2011/12/12',
                            variety:'',
                            stock: '123'
                        },
                            {
                                id: 100352,
                                name:'咖啡-加盟',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100353,
                                name:'咖啡-灾星',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100354,
                                name:'咖啡-上面',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100355,
                                name:'咖啡-顶起',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100356,
                                name:'咖啡-顶起人',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }]
                    }
                ]
            },
            {
                id: 1004,
                name: '主餐',
                child:[
                    {
                        id:10041,
                        name:'主-白酒',
                        child:[
                            {
                                id: 100411,
                                name:'主-茅台',
                                type:'浓香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100412,
                                name:'主-五粮液',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100413,
                                name:'主-剑南春',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100414,
                                name:'主-泸州老窖',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100415,
                                name:'主-水井坊',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100416,
                                name:'主-洋河',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }
                        ]
                    },
                    {
                        id:10042,
                        name:'主-红酒',
                        child:[
                            {
                                id: 100421,
                                name:'主-拉菲',
                                type:'干红',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100422,
                                name:'主-奔富',
                                type:'干红',
                                price:'108.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100423,
                                name:'主-长城',
                                type:'半干红',
                                price:'198.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100424,
                                name:'主-木桐',
                                type:'干白',
                                price:'208.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100425,
                                name:'主-小企鹅',
                                type:'半干白',
                                price:'68.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100426,
                                name:'主-黄尾袋鼠',
                                type:'半干白',
                                price:'128.00',
                                area :'法国',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }
                        ]
                    },
                    {
                        id:10043,
                        name:'主-洋酒',
                        child:[
                            {
                                id: 100431,
                                name:'主-基地',
                                type:'浓香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100432,
                                name:'主-青年',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100433,
                                name:'主-眼看着',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100434,
                                name:'主-昨日',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100435,
                                name:'主-睥睨',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100436,
                                name:'主-手中',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }
                        ]
                    },
                    {
                        id:10044,
                        name:'主-黄酒',
                        child:[                            {
                            id: 100441,
                            name:'主-顶珠',
                            type:'浓香型',
                            price:'108.00',
                            area :'四川',
                            date:'2011/12/12',
                            variety:'',
                            stock: '123'
                        },
                            {
                                id: 100442,
                                name:'主-遥股份有',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100443,
                                name:'主-加强',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100444,
                                name:'主-静坐',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100445,
                                name:'主-珠海',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100446,
                                name:'主-表白',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }]
                    },
                    {
                        id:10045,
                        name:'主-啤酒',
                        child:[                            {
                            id: 100451,
                            name:'主-格式化',
                            type:'浓香型',
                            price:'108.00',
                            area :'四川',
                            date:'2011/12/12',
                            variety:'',
                            stock: '123'
                        },
                            {
                                id: 100452,
                                name:'主-加盟',
                                type:'清香型',
                                price:'108.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100453,
                                name:'主-灾星',
                                type:'馥郁香',
                                price:'198.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100454,
                                name:'主-上面',
                                type:'浓香型',
                                price:'208.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100455,
                                name:'主-顶起',
                                type:'浓香型',
                                price:'68.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            },
                            {
                                id: 100456,
                                name:'主-顶起人',
                                type:'酱香型',
                                price:'128.00',
                                area :'四川',
                                date:'2011/12/12',
                                variety:'',
                                stock: '123'
                            }]
                    }
                ]
            }
        ],
        foodAttr: [
            {
                id: 1001,
                name: 'abc'
            },
            {
                id: 1002,
                name: 'plmsdf'
            },
            {
                id: 1003,
                name: 'qweasd'
            },
            {
                id: 1004,
                name: 'rfx'
            },
            {
                id: 1005,
                name: 'ewsx'
            },
            {
                id: 1006,
                name: 'wers'
            },
            {
                id: 1007,
                name: 'qw1'
            },
            {
                id: 1008,
                name: 'scb'
            },
            {
                id: 1009,
                name: 'densx'
            },
            {
                id: 1010,
                name: 'prons'
            }
        ],
        tableList: [
            {
                id : 0,
                number:1
            },
            {
                id : 0,
                number:12
            },
            {
                id : 0,
                number:135
            },
            {
                id : 0,
                number:8
            }
        ]
    }
});