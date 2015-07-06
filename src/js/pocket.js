//模块模式---只暴露共有方法和变量
var remainList = (function() {

    //私有变量,私有方法-----操作本地数据库
    var list = [];
    //读取 
    var getList = function() {
        var localList = (JSON.parse(localStorage.getItem("remainList"))) || [];
        list = localList;
        return list;

    };
    //存入 
    var save = function() {
        var listStr = JSON.stringify(list);
        localStorage.remainList = listStr;

    };

    var clear = function() {
        localStorage.clear();

    };
    /**
     * 暴露给ui的接口
     * 
     */
    return {
        //这里可以定义共有变量----控制业务逻辑,进行存取操作----返回 Ui直接能使用的数据
        publicItem: "yes,it is public",
        //存入 : 先取值，赋值给私有变量list,再向list中push数组，保存list数组
        add: function(remaining) {
            getList();
            list.push({
                "day": new Date().getTime(),
                "remaining": remaining
            });
            save();
            //返回 moduleB对象  ，用于链式操作
            return this;
        },
        /**
         * 修改数组第index个元素
         * @param  {[type]} index     修改下表为i的元素
         * @param  {[type]} remaining 财务详情数组
         * @return {[type]}           本对象，用于链式操作
         */
        editItem: function(index, remaining) {
            getList();
            list.splice(index, 1, {
                "day": new Date().getTime(),
                "remaining": remaining
            });
            save();
            return this;
        },

        del: function(index) {
            getList();
            list.splice(index, 1);
            save();
            //返回 moduleB对象  ，用于链式操作
            return this;
        },
        clear: function() {
            clear();
            //返回 moduleB对象  ，用于链式操作
            return this;
        },
        //用共有方法把私有方法暴露出去
        get: function() {
            var remainFormateList = [];
            var rlist = getList();
            for (var i = 0; i < rlist.length; i++) {
                var item = rlist[i];
                var sum = 0;
                // 结算一次记录总金额
                for (var j = 0; j < item.remaining.length; j++) {
                    /**
                     * 如果zhengfu为1，则加，如果zheng'fu为0，则减去
                     * @param  {[type]} item.remaining[j].zhengfu [正负]
                     * @return {[type]}                           [description]
                     */
                    if (item.remaining[j].zhengfu == 1) {
                        sum += item.remaining[j].num;

                    } else {
                        sum -= item.remaining[j].num;

                    }
                }
                remainFormateList.push({
                    index: i,
                    day: turnDate(item.day),
                    sumMoney: sum
                });
            }
            return remainFormateList;
        },
        getItem: function(i) {
            return getList()[i];
        }

    };
    //存入 
})();

var items = (function() {
    var itemList = [];
    var itemOperate = {};

    itemOperate.get = function() {
        itemList = (JSON.parse(localStorage.getItem("items"))) || [];
        return itemList;
    };

    itemOperate.add = function(itemName,zhengfu) {
        itemList = (JSON.parse(localStorage.getItem("items"))) || [];
        itemList.push({"name":itemName,"zhengfu":zhengfu});
        this.save();
    };
    itemOperate.del = function(index) {
        this.get();
        itemList.splice(index, 1);
        this.save();
    };
    itemOperate.clear = function() {
        localStorage.items = '[]';
    };
    itemOperate.save = function() {
        localStorage.items = JSON.stringify(itemList);

    };


    return itemOperate;

}());
// 渲染ui
var tmpl = {
    /**
     * 日期余额列表
     * @return {[type]} [description]
     */
    getRemainList: function() {
        console.log(remainList.get());
    }

};
/**
 * 测试代码
 * @return {[type]} [description]
 */
function testData() {
    remainList.clear();


}

function testGet() {
    console.log(remainList.get());
}

function testDelete() {
    remainList.del(1);
}

function testAdd1() {
    remainList.add([{
        name: 'gf',
        zhengfu: 1,
        num: 300,
        about: 'xi'
    }, {
        name: 'zx',
        zhengfu: 1,
        num: 100,
        about: '呜呜'
    }, {
        name: 'gh',
        zhengfu: 0,
        num: 100,
        about: '呜呜'
    }]);
}

function testAdd2() {
    remainList.add([{
        name: 'gf',
        zhengfu: 1,
        num: 30,
        about: 'xi'
    }, {
        name: 'zx',
        zhengfu: 0,
        num: 10,
        about: '呜呜'
    }]);
}

function testEdit() {
    remainList.editItem(1, [{
        name: 'gfeeee',
        zhengfu: 1,
        num: 300,
        about: 'xi'
    }, {
        name: 'zxeee',
        zhengfu: 1,
        num: 100,
        about: '呜呜'
    }, {
        name: 'gheee',
        zhengfu: 0,
        num: 100,
        about: '呜呜'
    }]);
}

/**
 * 工具类函数
 */
//毫秒转日期
function turnDate(m) {
    var newTime = new Date(); //就得到普通的时间了
    newTime.setTime(m);
    var time = newTime.getFullYear() + "-" + (newTime.getMonth() + 1) + "-" + newTime.getDate() + " " + newTime.getHours() + ":" + timeZero(newTime.getMinutes());
    return time;
}

function timeZero(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}