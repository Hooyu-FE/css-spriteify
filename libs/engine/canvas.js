/**
 * Defined a canvas
 *
 * @use Used for picture operations
 *
 * @constructor
 * @author yiwei
 * @date 2017-03-04
 */
'use strict';
import ndarray from 'ndarray';
import ndarrayFill from 'ndarray-fill';
import savePixels from 'save-pixels';
class Canvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = new global.Uint8ClampedArray(width * height * 4);
        this.ndarray = new ndarray(this.data, [width, height, 4]);
        this.images = [];
    }

    /**
     * defined static prototype
     */
    static defaultFormat = 'png';
    static supportedFormats = ['jpg', 'jpeg', 'png', 'gif'];

    /**
     * Add a img to canvas
     *
     * @param img
     * @param x X-axis coordinates
     * @param y Y-axis coordinates
     */
    addImage(img, x, y) {
        this.images.push({
            img,
            x,
            y
        });
    }

    /**
     * Export canvas to image
     *
     * @param format
     * @param args
     */
    ['export']({format, ...args} = {format: Canvas.defaultFormat}) {
        // If we have a custom background, fill it in (otherwise default is transparent black `rgba(0, 0, 0, 0)`)
        let ndarray = this.ndarray;
        if (args.background) {
            ndarrayFill(ndarray, (i, j, k) => {
                return args.background[k];
            });
        }

        //Add each image to the canvas
        let images = this.images;
        images.forEach((imageObj) => {

        });
    }
}

module.exports = Canvas;