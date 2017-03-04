'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _async = require('async');

var _concatStream = require('concat-stream');

var _concatStream2 = _interopRequireDefault(_concatStream);

var _getPixels = require('get-pixels');

var _getPixels2 = _interopRequireDefault(_getPixels);

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _vinylFile = require('vinyl-file');

var _vinylFile2 = _interopRequireDefault(_vinylFile);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createImage = Symbol('createImage');
var fs = require('fs');

/**
 *
 * @use Used for picture operations
 *
 * @constructor
 * @author yiwei
 * @data 2017-03-04
 */

var ImageIfy = function () {
    function ImageIfy(options) {
        _classCallCheck(this, ImageIfy);

        this.options = options;
    }

    /**
     * Create and return a new canvas
     *
     * @param width
     * @param height
     */


    _createClass(ImageIfy, [{
        key: 'createCanvas',
        value: function createCanvas(width, height) {
            return new _canvas2.default(width, height);
        }

        /**
         * Define our mass image population
         *
         * @private
         * @param file
         * @param callback
         */

    }, {
        key: createImage,
        value: function value(file, callback) {
            // Runs the tasks array of functions in series
            (0, _async.waterfall)([
            // Load the images into memory
            function (cb) {
                if (typeof file === 'string') {
                    _vinylFile2.default.read(file).then(function (_file) {
                        cb(null, _file);
                    });
                } else {
                    cb(null, file);
                }
            },

            // get vinylFile Pixels data
            function (file, cb) {
                // If the vinyl object is null, then load from disk
                if (file.isNull()) {
                    // Returns An ndarray of pixels in raster order having shape equal to [width, height, channels]
                    (0, _getPixels2.default)(file.path, cb);
                } else {
                    file.contents.pipe((0, _concatStream2.default)(function (buff) {
                        console.log(buff);
                        (0, _getPixels2.default)(buff, _mimeTypes2.default.lookup(file.path), cb);
                    }));
                }
            },

            // set image width and height
            function (image, cb) {
                //Note For animated GIFs, a 4D array is returned with shape [numFrames, width, height, 4]
                if (image.shape.length === 4) {
                    image.width = image.shape[1];
                    image.height = image.shape[2];
                } else {
                    image.width = image.shape[0];
                    image.height = image.shape[1];
                }
                cb(null, image);
            }], callback);
        }

        /**
         * In parallel, calculate each of our images
         *
         * @param files
         * @param cb
         */

    }, {
        key: 'createImages',
        value: function createImages(files, cb) {
            (0, _async.map)(files, this[createImage].bind(this), cb);
        }
    }]);

    return ImageIfy;
}();

module.exports = ImageIfy;