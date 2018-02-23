/**
 * Created by smy on 2018/2/12.
 */
/**
 * 整数判定
 * @param obj
 * @returns {boolean}
 */
function isInteger(obj) {
    return typeof obj === 'number' && obj%1 === 0
}
/**
 * 对象格式化转array
 * @param data
 * @param formats
 * @returns {Array}
 */
function data2array(data, formats) {
    var result = new Array()
    for (var i in formats) {
        var format = formats[i]
        var value = data[format["key"]]
        if (format["length"]) {
            value = value.padLeft(format["length"], " ")
        }
        if (format["format"]) {
            value = format["format"].format(value)
        }
        result.push(value)
    }
    return result
}
/**
 * 左补齐
 * @type {Number.padLeft}
 */
String.prototype.padLeft = Number.prototype.padLeft = function (total, pad) {
    return (Array(total).join(pad || 0) + this).slice(-total);
}
/**
 * 替换所有匹配exp的字符串为指定字符串
 * @param exp 被替换部分的正则
 * @param newStr 替换成的字符串
 */
String.prototype.replaceAll = function (exp, newStr) {
    return this.replace(new RegExp(exp, "gm"), newStr);
};

/**
 * 原型：字符串格式化
 * @param args 格式化参数值
 */
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }

    var data = arguments; // 如果模板参数是数组
    if (arguments.length == 1 && typeof (args) == "object") {
        // 如果模板参数是对象
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replaceAll("\\{" + key + "\\}", value);
        }
    }
    return result;
}

/**
 * 仿照python的range函数
 * @param start
 * @param end
 * @param step
 * @returns {Array}
 */
function range(start, end, step) {
    if (end == null) {
        end = start
        start = 0
    }
    step = step || 1
    var arr = new Array()
    for (var p = start; p < end; p += step) {
        arr.push(p)
    }
    return arr
}

/**
 * 创建者
 * @constructor
 */
function Creator() {
    this.create = function () {
        return null
    }
    this.createOne = function () {
        var result = this.create()
        if (result instanceof Creator) {
            return result.createOne()
        } else {
            return result
        }
    }
    this.createArray = function (num) {
        var result = new Array(num)
        for (var i = 0; i < num; i++) {
            result[i] = this.createOne()
        }
        return result
    }
}

function CollectCreator() {
    this.array = new Array()
    this.add = function (data) {
        if (data instanceof Array) {
            for (var i = 0; i < data.length; i++) {
                this.array.push(data[i])
            }
        } else {
            this.array.push(data)
        }
        return this
    }
}
CollectCreator.prototype = new Creator()

function RandomCreator() {
    CollectCreator.call(this)
    this.create = function () {
        return this.array[Math.floor(Math.random() * this.array.length)]
    }
}
RandomCreator.prototype = new CollectCreator()

function SeqCreator() {
    CollectCreator.call(this)
    this.point = 0;
    this.create = function () {
        return this.array[this.point++ % this.array.length]
    }
}
SeqCreator.prototype = new CollectCreator()

function ObjectCreator(object) {
    this.map = {}
    if (object != null) {
        for (var key in object) {
            this.map[key] = object[key]
        }
    }
    this.add = function (key, value) {
        this.map[key] = value
        return this
    }
    this.create = function () {
        var result = {}
        for (var key in this.map) {
            var value = this.map[key]
            if (value instanceof Creator) {
                result[key] = value.createOne()
            } else {
                result[key] = value
            }
        }
        return result
    }
}
ObjectCreator.prototype = new Creator()