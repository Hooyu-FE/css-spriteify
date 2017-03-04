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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ndarray = require('ndarray');

var _ndarray2 = _interopRequireDefault(_ndarray);

var _ndarrayFill = require('ndarray-fill');

var _ndarrayFill2 = _interopRequireDefault(_ndarrayFill);

var _savePixels = require('save-pixels');

var _savePixels2 = _interopRequireDefault(_savePixels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
    function Canvas(width, height) {
        _classCallCheck(this, Canvas);

        this.width = width;
        this.height = height;
        this.data = new global.Uint8ClampedArray(width * height * 4);
        this.ndarray = new _ndarray2.default(this.data, [width, height, 4]);
        this.images = [];
    }

    /**
     * defined static prototype
     */


    _createClass(Canvas, [{
        key: 'addImage',


        /**
         * Add a img to canvas
         *
         * @param img
         * @param x X-axis coordinates
         * @param y Y-axis coordinates
         */
        value: function addImage(img, x, y) {
            this.images.push({
                img: img,
                x: x,
                y: y
            });
        }

        /**
         * Export canvas to image
         *
         * @param format
         * @param args
         */

    }, {
        key: 'export',
        value: function _export() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { format: Canvas.defaultFormat };

            var format = _ref.format,
                args = _objectWithoutProperties(_ref, ['format']);

            // If we have a custom background, fill it in (otherwise default is transparent black `rgba(0, 0, 0, 0)`)
            var ndarray = this.ndarray;
            if (args.background) {
                (0, _ndarrayFill2.default)(ndarray, function (i, j, k) {
                    return args.background[k];
                });
            }

            //Add each image to the canvas
            var images = this.images;
            images.forEach(function (imageObj) {});
        }
    }]);

    return Canvas;
}();

Object.defineProperty(Canvas, 'defaultFormat', {
    enumerable: true,
    writable: true,
    value: 'png'
});
Object.defineProperty(Canvas, 'supportedFormats', {
    enumerable: true,
    writable: true,
    value: ['jpg', 'jpeg', 'png', 'gif']
});


module.exports = Canvas;