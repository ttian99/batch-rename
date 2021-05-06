var fs = require('fs-extra');
var glob = require('glob');
var path = require('path');
var GlobUtils = require('./libs/globUtils');

// 文件提取
async function getFilesArr(dir, extname = '.png') {
    return new Promise((resolve, reject) => {
        let url = dir + '/*.' + extname;
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

async function getFiles(src = 'src', extname = 'png') {
    return new Promise((resolve, reject) => {
        let url = src + '/**/*.' + extname;
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

/** 根据文件名内的数字升序排列 */
function sortByFileNameContaintNumber(a, b) {
    let aName = path.basename(a);
    let bName = path.basename(b);
    aName = parseInt(aName);
    bName = parseInt(bName);
    return aName - bName;
}

async function rename(arr) {
    // 排序
    arr.sort(sortByFileNameContaintNumber);

    for (let i = 0; i < arr.length; i++) {
        const filePath = arr[i];
        const base = path.basename(filePath);
        const dir = path.dirname(filePath);
        const idx = dir.lastIndexOf('/');
        const dirname = dir.slice(idx + 1);
        const extname = path.extname(filePath);
        const num = parseInt(base);
        const fileName = dirname + '_' + num + extname;
        fs.copySync(filePath, 'out/' + fileName);
    }
}


async function main() {
    const arr = await getFiles();
    await rename(arr);
}

// main();
async function test(){ 
    const globUtils = new GlobUtils();

    fs.emptyDirSync('.temp');
    fs.emptyDirSync('out');

    const arr = await globUtils.getFiles('src');
    for (let i = 0; i < arr.length; i++) {
        const filePath = arr[i];
        const dst = filePath.replace('src', '.temp');
        fs.ensureFileSync(dst);
        fs.copyFileSync(filePath, dst);
    }

    const newArr = await globUtils.getFiles('.temp');
    await rename(newArr);
}

test();
