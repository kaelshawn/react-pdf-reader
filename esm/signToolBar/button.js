var Button = /** @class */ (function () {
    function Button() {
    }
    Button.create = function (options) {
        var result = document.createElement('button');
        result.textContent = options.text || '按钮';
        result.classList.add('aos-button');
        if (options.type) {
            result.classList.add(options.type);
        }
        if (options.size === 'small') {
            result.classList.add('small');
        }
        result.style.cssText = options.cssText || '';
        if (options.onClick) {
            result.addEventListener('click', options.onClick);
        }
        if (typeof options.attrs !== 'undefined') {
            Object.keys(options.attrs).forEach(function (key) {
                result.setAttribute(key, options.attrs[key]);
            });
        }
        return result;
    };
    return Button;
}());
export default Button;
//# sourceMappingURL=button.js.map