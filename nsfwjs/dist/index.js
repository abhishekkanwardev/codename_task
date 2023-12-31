"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NSFWJS = exports.load = void 0;
var tf = __importStar(require("@tensorflow/tfjs"));
var nsfw_classes_1 = require("./nsfw_classes");
var gif_frames_1 = __importDefault(require("@nsfw-filter/gif-frames"));
var BASE_PATH = "https://d1zv2aa70wpiur.cloudfront.net/tfjs_quant_nsfw_mobilenet/";
var IMAGE_SIZE = 224;
function load(base, options) {
    if (base === void 0) { base = BASE_PATH; }
    if (options === void 0) { options = { size: IMAGE_SIZE }; }
    return __awaiter(this, void 0, void 0, function () {
        var nsfwnet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (tf == null) {
                        throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please " +
                            "also include @tensorflow/tfjs on the page before using this model.");
                    }
                    options.size = options.size || IMAGE_SIZE;
                    nsfwnet = new NSFWJS(base, options);
                    return [4, nsfwnet.load()];
                case 1:
                    _a.sent();
                    return [2, nsfwnet];
            }
        });
    });
}
exports.load = load;
var NSFWJS = (function () {
    function NSFWJS(modelPathBaseOrIOHandler, options) {
        this.intermediateModels = {};
        this.options = options;
        this.normalizationOffset = tf.scalar(255);
        if (typeof modelPathBaseOrIOHandler === "string" &&
            !modelPathBaseOrIOHandler.startsWith("indexeddb://") &&
            !modelPathBaseOrIOHandler.startsWith("localstorage://")) {
            if (modelPathBaseOrIOHandler.endsWith("model.json")) {
                this.pathOrIOHandler = modelPathBaseOrIOHandler;
            }
            else {
                this.pathOrIOHandler = "".concat(modelPathBaseOrIOHandler, "model.json");
            }
        }
        else {
            this.pathOrIOHandler = modelPathBaseOrIOHandler;
        }
    }
    NSFWJS.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, size, type, _b, _c, result;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.options, size = _a.size, type = _a.type;
                        if (!(type === "graph")) return [3, 2];
                        _b = this;
                        return [4, tf.loadGraphModel(this.pathOrIOHandler)];
                    case 1:
                        _b.model = _d.sent();
                        return [3, 4];
                    case 2:
                        _c = this;
                        return [4, tf.loadLayersModel(this.pathOrIOHandler)];
                    case 3:
                        _c.model = _d.sent();
                        this.endpoints = this.model.layers.map(function (l) { return l.name; });
                        _d.label = 4;
                    case 4:
                        result = tf.tidy(function () {
                            return _this.model.predict(tf.zeros([1, size, size, 3]));
                        });
                        return [4, result.data()];
                    case 5:
                        _d.sent();
                        result.dispose();
                        return [2];
                }
            });
        });
    };
    NSFWJS.prototype.infer = function (img, endpoint) {
        var _this = this;
        if (endpoint != null && this.endpoints.indexOf(endpoint) === -1) {
            throw new Error("Unknown endpoint ".concat(endpoint, ". Available endpoints: ") +
                "".concat(this.endpoints, "."));
        }
        return tf.tidy(function () {
            if (!(img instanceof tf.Tensor)) {
                img = tf.browser.fromPixels(img);
            }
            var normalized = img
                .toFloat()
                .div(_this.normalizationOffset);
            var resized = normalized;
            var size = _this.options.size;
            if (img.shape[0] !== size || img.shape[1] !== size) {
                var alignCorners = true;
                resized = tf.image.resizeBilinear(normalized, [size, size], alignCorners);
            }
            var batched = resized.reshape([1, size, size, 3]);
            var model;
            if (endpoint == null) {
                model = _this.model;
            }
            else {
                if (_this.model.hasOwnProperty("layers") &&
                    _this.intermediateModels[endpoint] == null) {
                    var layer = _this.model.layers.find(function (l) { return l.name === endpoint; });
                    _this.intermediateModels[endpoint] = tf.model({
                        inputs: _this.model.inputs,
                        outputs: layer.output,
                    });
                }
                model = _this.intermediateModels[endpoint];
            }
            return model.predict(batched);
        });
    };
    NSFWJS.prototype.classify = function (img, topk) {
        if (topk === void 0) { topk = 5; }
        return __awaiter(this, void 0, void 0, function () {
            var logits, classes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logits = this.infer(img);
                        return [4, getTopKClasses(logits, topk)];
                    case 1:
                        classes = _a.sent();
                        logits.dispose();
                        return [2, classes];
                }
            });
        });
    };
    NSFWJS.prototype.classifyGif = function (gif, config) {
        if (config === void 0) { config = { topk: 5 }; }
        return __awaiter(this, void 0, void 0, function () {
            var frameData, acceptedFrames, totalTimeInMs, i, totalFrames, interval, i, arrayOfPredictions, i, image, predictions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        frameData = [];
                        if (!Buffer.isBuffer(gif)) return [3, 2];
                        return [4, (0, gif_frames_1.default)({ url: gif, frames: 'all', outputType: 'jpg' })];
                    case 1:
                        frameData = _a.sent();
                        return [3, 4];
                    case 2: return [4, (0, gif_frames_1.default)({ url: gif.src, frames: 'all', outputType: 'canvas' })];
                    case 3:
                        frameData = _a.sent();
                        _a.label = 4;
                    case 4:
                        acceptedFrames = [];
                        if (typeof config.fps !== 'number') {
                            acceptedFrames = frameData.map(function (_element, index) { return index; });
                        }
                        else {
                            totalTimeInMs = 0;
                            for (i = 0; i < frameData.length; i++) {
                                totalTimeInMs = totalTimeInMs + (frameData[i].frameInfo.delay * 10);
                            }
                            totalFrames = Math.floor(totalTimeInMs / 1000 * config.fps);
                            if (totalFrames <= 1) {
                                acceptedFrames = [Math.floor(frameData.length / 2)];
                            }
                            else if (totalFrames >= frameData.length) {
                                acceptedFrames = frameData.map(function (_element, index) { return index; });
                            }
                            else {
                                interval = Math.floor(frameData.length / (totalFrames + 1));
                                for (i = 1; i <= totalFrames; i++) {
                                    acceptedFrames.push(i * interval);
                                }
                            }
                        }
                        arrayOfPredictions = [];
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < acceptedFrames.length)) return [3, 8];
                        image = frameData[acceptedFrames[i]].getImage();
                        return [4, this.classify(image, config.topk)];
                    case 6:
                        predictions = _a.sent();
                        if (typeof config.onFrame === 'function') {
                            config.onFrame({
                                index: acceptedFrames[i],
                                totalFrames: frameData.length,
                                predictions: predictions,
                                image: image
                            });
                        }
                        arrayOfPredictions.push(predictions);
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3, 5];
                    case 8: return [2, arrayOfPredictions];
                }
            });
        });
    };
    return NSFWJS;
}());
exports.NSFWJS = NSFWJS;
function getTopKClasses(logits, topK) {
    return __awaiter(this, void 0, void 0, function () {
        var values, valuesAndIndices, i, topkValues, topkIndices, i, topClassesAndProbs, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, logits.data()];
                case 1:
                    values = _a.sent();
                    valuesAndIndices = [];
                    for (i = 0; i < values.length; i++) {
                        valuesAndIndices.push({ value: values[i], index: i });
                    }
                    valuesAndIndices.sort(function (a, b) {
                        return b.value - a.value;
                    });
                    topkValues = new Float32Array(topK);
                    topkIndices = new Int32Array(topK);
                    for (i = 0; i < topK; i++) {
                        topkValues[i] = valuesAndIndices[i].value;
                        topkIndices[i] = valuesAndIndices[i].index;
                    }
                    topClassesAndProbs = [];
                    for (i = 0; i < topkIndices.length; i++) {
                        topClassesAndProbs.push({
                            className: nsfw_classes_1.NSFW_CLASSES[topkIndices[i]],
                            probability: topkValues[i],
                        });
                    }
                    return [2, topClassesAndProbs];
            }
        });
    });
}
//# sourceMappingURL=index.js.map