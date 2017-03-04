'use strict';

import {map, waterfall} from 'async';
import concat from 'concat-stream';
import getPixels from 'get-pixels';
import mime from 'mime-types';
import vinylFile from 'vinyl-file';
import Canvas from './canvas';
let createImage = Symbol('createImage');
let fs = require('fs');

/**
 *
 * @use Used for picture operations
 *
 * @constructor
 * @author yiwei
 * @data 2017-03-04
 */

class ImageIfy {
    constructor(options) {
        this.options = options;
    }

    /**
     * Create and return a new canvas
     *
     * @param width
     * @param height
     */
    createCanvas(width, height) {
        return new Canvas(width, height);
    }

    /**
     * Define our mass image population
     *
     * @private
     * @param file
     * @param callback
     */
    [createImage](file, callback) {
        // Runs the tasks array of functions in series
        waterfall(
            [
                // Load the images into memory
                (cb) => {
                    if (typeof file === 'string') {
                        vinylFile.read(file).then(
                            (_file) => {
                                cb(null, _file);
                            }
                        );
                    } else {
                        cb(null, file);
                    }
                },

                // get vinylFile Pixels data
                (file, cb) => {
                    // If the vinyl object is null, then load from disk
                    if (file.isNull()) {
                        // Returns An ndarray of pixels in raster order having shape equal to [width, height, channels]
                        getPixels(file.path, cb);
                    } else {
                        file.contents.pipe(concat((buff) => {
                            console.log(buff);
                            getPixels(buff, mime.lookup(file.path), cb);
                        }));
                    }
                },

                // set image width and height
                (image, cb) => {
                    //Note For animated GIFs, a 4D array is returned with shape [numFrames, width, height, 4]
                    if (image.shape.length === 4) {
                        image.width = image.shape[1];
                        image.height = image.shape[2];
                    } else {
                        image.width = image.shape[0];
                        image.height = image.shape[1];
                    }
                    cb(null, image);
                }
            ],
            callback
        );
    }

    /**
     * In parallel, calculate each of our images
     *
     * @param files
     * @param cb
     */
    createImages(files, cb) {
        map(files, this[createImage].bind(this), cb);
    }
}

module.exports = ImageIfy;
