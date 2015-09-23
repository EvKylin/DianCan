### DianCan 2.1
* main.js ------------------- 功能入口文件，所有配置均在此处添加
* addAttribute.js ----------- 添加属性功能，相关属性操作均在此处
* addOrder.js --------------- 添加订单功能
* calculator.js ------------- 计算器功能，
* dishOrderSplit.js --------- 分单或撤消菜品功能集合 分单数据提交采用 isSingle 变量加数据区分 当前提交数据类型
* funcSet.js ---------------- 右上角功能集合及，中部黄色按钮功能
* initialization.js --------- 相关初始化功能集合
* minxin.js ----------------- 页面节点操作功能
* utilities.js -------------- 创建所需对象功能（添加菜品对象，分单与撤消菜品对象，属性添加对象(暂时未用到)）
* variable.js --------------- 系统变量集合

=============================================================
* util.js 预留bug处理文件
* bootstrap.js 可不引入 系统未用到

* 页面采取 `<script src="js/require.js" data-main="js/main"></script>` 方式引入功能文件
