var glob = require('glob');

function GlobUtils() { }

GlobUtils.prototype.glob = function () { }

GlobUtils.prototype.travelDir = async function (root) {
    return new Promise((resolve, reject) => {
        let url = root + '/*' + extname;
        glob(url, (err, arr) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            console.log(arr);
            resolve(arr);
        });
    });
}

/** 
 * 提取文件
 * 
 */
GlobUtils.prototype.getFiles = async function (root, extname = '.png') {
    return new Promise((resolve, reject) => {
        let url = root + '/**/*' + extname;
        glob(url, (err, arr) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            console.log(arr);
            resolve(arr);
        });
    });
}

module.exports = GlobUtils;