/**
 * gulp-css-spriteify
 *
 * Automatically parse css rules, generate Sprite and replace styles
 *
 * @author yiwei
 * @date 2017-03-04
 */
'use strict';
let ImageIfy = require('./dist/engine/engine.js');
let path = require('path');

let imageIfy = new ImageIfy(100, 100);
imageIfy.createImages([path.join(__dirname, 'test/image/group_card_list_icon_lvv1.png')], (err, imgs) => {
    //console.log(imgs);
});