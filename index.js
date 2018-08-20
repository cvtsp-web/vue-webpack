const fs = require('fs')
const ora = require('ora')
const path = require('path')
const spawn = require('cross-spawn')
const utils = require('./utils/utils')
// 当前项目根路径
const appDirectory = path.resolve(fs.realpathSync(process.cwd()));
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const tplDirectory = path.resolve(__dirname, './template')

/**
 * project init
 * @author: wukangjun
 * @since: 2018.8.14
 * @param {Object} config={}    
 * @description: 目前只支持vue pc spa 后期继续开发
 */
exports.init = function(config) {
    var loading = ora('begin to build template of vue-webpack!').start();
    utils.copyPlugins(tplDirectory, resolveApp(''));
    loading.succeed();
    install_cnpm()
    .then(install_alldependencies);  
}

/**
 * 环境中不存在cnpm，自动下载
 */
function install_cnpm() {
    return new Promise((resolve, reject) => {
        var exec = spawn.sync('cnpm', ['-v'], { stdio: 'inherit'});
        if(exec.error) {
            var loading = ora('is uploading cnpm').start(); // signal
            spawn.sync('npm', [
                'install',
                '-g',
                'cnpm',
                '--registry=https://registry.npm.taobao.org'
            ], {stdio: 'inherit'});
            if(spawn.signal) {
                loading.fail();
                process.exit(1);
            }
            loading.succeed();
            resolve();
        }
    })
}

/**
 * 下载所有依赖 cnpm install(加快下载速度)
 */
function install_alldependencies() {
    return new Promise((resolve, reject) => {
        var loading = ora('is uploading dependence an devDependence').start();
        var exec = spawn.sync('cnpm', ['install'], {stdio: 'inherit'});
        
        if(exec.signal) {
            loading.fail();
            process.exit(1);
        }
        loading.succeed();
        resolve();
    })
}



