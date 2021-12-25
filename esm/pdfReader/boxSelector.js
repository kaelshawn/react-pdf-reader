import * as d3 from 'd3-drag';
import * as d3Sel from 'd3-selection';
import utils from './utils';
export default (function (options) {
    var drag = d3.drag();
    var selection = d3Sel.select(options.container);
    drag(selection);
    var canvasWrapper;
    var startX;
    var startY;
    var canvasTop;
    var canvasLeft;
    var boxSelections;
    drag
        .on('start', function (_a) {
        var sourceEvent = _a.sourceEvent;
        if (utils.isClickOverlay(sourceEvent)) {
            return;
        }
        var eventInfo = utils.getPdfPageClickInfo(sourceEvent);
        if (!eventInfo) {
            return;
        }
        var top = eventInfo.top, left = eventInfo.left, x = eventInfo.x, y = eventInfo.y, _canvasWrapper = eventInfo.canvasWrapper;
        canvasWrapper = _canvasWrapper;
        canvasTop = top;
        canvasLeft = left;
        startX = x;
        startY = y;
        if (options.onStart && !options.onStart(eventInfo)) {
            return;
        }
        boxSelections = document.createElement('div');
        boxSelections.className = 'box-selection';
        boxSelections.style.top = startY + "px";
        boxSelections.style.left = startX + "px";
        canvasWrapper.appendChild(boxSelections);
    })
        .on('drag', function (_a) {
        var x = _a.x, y = _a.y;
        if (boxSelections) {
            boxSelections.style.width = x - (startX + canvasLeft) + "px";
            boxSelections.style.height = y - (startY + canvasTop) + "px";
        }
    })
        .on('end', function (_a) {
        var x = _a.x, y = _a.y;
        var rect = {
            startX: startX,
            startY: startY,
            endX: x - canvasLeft,
            endY: y - canvasTop,
            width: x - (startX + canvasLeft),
            height: y - (startY + canvasTop),
            pageNumber: -1,
        };
        if (canvasWrapper && boxSelections) {
            rect.pageNumber = +canvasWrapper.parentElement.getAttribute('data-page-number') - 1;
            options.onSelected(rect);
            canvasWrapper.removeChild(boxSelections);
            boxSelections = null;
        }
        else {
            options.onCancelSelected();
        }
    });
});
//# sourceMappingURL=boxSelector.js.map