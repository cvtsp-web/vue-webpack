const fs = require('fs')
const ora = require('ora')
const path = require('path')
const defaultOptions = {
    platform: ['pc', 'mobile'],
    type: ['spa', 'multi']
};

/**
 * 检测参数的关键字是否存在
 * @param {Object} param={} 
 */
exports.checkKeys = function(config) {
    Object.keys(config).forEach(key => {
        keysOraTip(key, config[key]);
    })
}

exports.copyPlugins = function(src, dist) {
    if(fs.existsSync(dist)) {
        _copyFn(src, dist);
    }else {
        fs.mkdirSync(dist);
        _copyFn(src, dist);
    }
}

/**
 * 文件的复制
 * @param {*} src: 需要拷贝的目标文件路径
 * @param {*} dist: 需要复制粘贴的文件路径
 */
function _copyFn(src, dist) {
    const tplLists = fs.readdirSync(src);
    tplLists.forEach(tpl => {
        var _src = `${src}/${tpl}`;
        var _dist = `${dist}/${tpl}`;
        var readSteam, writeStream;

        //是文件的时候
        if(fs.statSync(_src).isFile()) {
            readSteam = fs.createReadStream(_src);
            writeStream = fs.createWriteStream(_dist);
            readSteam.pipe(writeStream);
        }else if(fs.statSync(_src).isDirectory()) {
            exports.copyPlugins(_src, _dist, _copyFn);
        }
    })
}

/**
 * 
 * @param {key} key: 关键字
 * @param {String} val: 用户输入的关键字 
 */
function keysOraTip(key, val) {
    // 不存在
    if(defaultOptions[key].indexOf(val) < 0) {
        ora(`in the ${key}, is not exist '${val}'; val must be in ${defaultOptions[key]}`).fail();
        return process.exit(1);
    }
}