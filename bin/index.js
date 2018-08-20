#!/usr/bin/env node

var program = require('commander')
var utils = require('../utils/utils')
var main = require('../index')

const config = {
    platform: 'pc',
    type: 'spa'
};
/**
 * @author: wukangjun
 * @created: 2018.8.14
 * 版本号: version
 * 初始化项目: init --i [platform] ------ pc/mobile
 * 项目的类型: -t --type [type] ------- spa/multi
 */
program
    .version(require('../package.json').version)
    .option('-v --version', require('../package.json').version)
    .option('init --i [platform]', 'vue project pc or mobile(default: pc)', function(platform) {config.platform = platform})
    .option('-t --type [type]', 'vue project spa or multi(default:spa)', function(type) { config.type = type})
    .parse(process.argv)

utils.checkKeys(config);

main.init(config);


