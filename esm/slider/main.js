var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as d3 from 'd3-drag';
import * as d3Sel from 'd3-selection';
import { createElement } from '../utils/tools';
/**
 * 滑块
 */
var Slider = /** @class */ (function () {
    function Slider() {
        this.value = 0;
        this.disabled = false;
    }
    Slider.prototype.init = function (options) {
        this.options = __assign({ color: '#108ee9', minValue: 0, maxValue: 100, value: 0, isTip: true }, options);
        this.create();
        this.setDisabled(options.disabled || false);
        return this;
    };
    Slider.prototype.create = function () {
        var _this = this;
        this.options.container.classList.add('aos-slider');
        this.sliderLine = createElement('div', 'slider-line');
        this.options.container.appendChild(this.sliderLine);
        this.sliderProgressLine = createElement('div', 'slider-progress');
        if (this.options.color) {
            this.sliderProgressLine.style.backgroundColor = this.options.color;
        }
        this.options.container.appendChild(this.sliderProgressLine);
        this.sliderBlock = createElement('div', 'slider-block');
        if (this.options.color) {
            this.sliderBlock.style.backgroundColor = this.options.color;
        }
        this.options.container.appendChild(this.sliderBlock);
        if (this.options.isTip) {
            this.valueTips = createElement('div', 'slider-tips');
            this.sliderBlock.appendChild(this.valueTips);
        }
        setTimeout(function () {
            _this.setValue(_this.options.value);
        }, 0);
        var drag = d3.drag();
        var selection = d3Sel.select(this.sliderBlock);
        drag(selection);
        drag
            .on('start', function () {
            if (_this.disabled) {
                return;
            }
            _this.options.container.classList.add('focus');
        })
            .on('drag', function (_a) {
            var x = _a.x;
            if (_this.disabled) {
                return;
            }
            var range = _this.options.maxValue - _this.options.minValue;
            var left = Math.min(Math.max(0, x), _this.sliderLine.clientWidth);
            var value = _this.options.minValue + Math.round((left / _this.sliderLine.clientWidth) * range);
            _this.setValue(value);
            if (_this.options.onChange) {
                _this.options.onChange(_this.value, _this);
            }
        })
            .on('end', function () {
            _this.options.container.classList.remove('focus');
            if (_this.options.onEnd) {
                _this.options.onEnd(_this.value, _this);
            }
        });
    };
    /**
     * 设置禁用状态
     */
    Slider.prototype.setDisabled = function (value) {
        if (this.disabled === value) {
            return this;
        }
        this.disabled = value;
        if (value) {
            this.options.container.classList.add('disabled');
        }
        else {
            this.options.container.classList.remove('disabled');
        }
        return this;
    };
    /**
     * 设置值
     * @param value
     */
    Slider.prototype.setValue = function (value, left) {
        if (this.value === value) {
            return this;
        }
        var minValue = Math.max(value, this.options.minValue);
        var v = Math.abs(this.options.minValue - minValue);
        var range = this.options.maxValue - this.options.minValue;
        var p = v / range;
        if (left === undefined) {
            left = p * this.sliderLine.clientWidth;
        }
        this.value = v + this.options.minValue;
        this.sliderBlock.style.left = left - this.sliderBlock.clientWidth / 2 + "px";
        this.sliderProgressLine.style.width = Math.min(p * 100, 100) + "%";
        if (this.valueTips) {
            this.valueTips.textContent = this.value.toString();
        }
        return this;
    };
    return Slider;
}());
export default Slider;
//# sourceMappingURL=main.js.map