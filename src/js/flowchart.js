/* ========================================================================
 * ZUI: flowChart.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2017-2019 cnezsoft.com; Licensed MIT
 * ======================================================================== */

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return k.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return -1.
            return -1;
        }
    });
}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        }
    });
}

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function (callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If isCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            var kValue;

            // a. Let Pk be ToString(k).
            //    This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty
            //    internal method of O with argument Pk.
            //    This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal
                // method of O with argument Pk.
                kValue = O[k];

                // ii. Call the Call internal method of callback with T as
                // the this value and argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

    Array.prototype.map = function (callback/*, thisArg*/) {

        var T, A, k;

        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        // 1. Let O be the result of calling ToObject passing the |this|
        //    value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal
        //    method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = arguments[1];
        }

        // 6. Let A be a new array created as if by the expression new Array(len)
        //    where Array is the standard built-in constructor with that name and
        //    len is the value of len.
        A = new Array(len);

        // 7. Let k be 0
        k = 0;

        // 8. Repeat, while k < len
        while (k < len) {

            var kValue, mappedValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal
            //    method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal
                //    method of O with argument Pk.
                kValue = O[k];

                // ii. Let mappedValue be the result of calling the Call internal
                //     method of callback with T as the this value and argument
                //     list containing kValue, k, and O.
                mappedValue = callback.call(T, kValue, k, O);

                // iii. Call the DefineOwnProperty internal method of A with arguments
                // Pk, Property Descriptor
                // { Value: mappedValue,
                //   Writable: true,
                //   Enumerable: true,
                //   Configurable: true },
                // and false.

                // In browsers that support Object.defineProperty, use the following:
                // Object.defineProperty(A, k, {
                //   value: mappedValue,
                //   writable: true,
                //   enumerable: true,
                //   configurable: true
                // });

                // For best browser support, use the following:
                A[k] = mappedValue;
            }
            // d. Increase k by 1.
            k++;
        }

        // 9. return A
        return A;
    };
}

(function($) {
    'use strict';

    var selectText = function($e) {
        var doc = document;
        var element = $e[0],
            range;
        if(doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if(window.getSelection) {
            var selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    var NAME = 'zui.flowChart'; // model name

    var supportElementTypes = {
        relation: {},
        action: {},
        start: {},
        stop: {},
        judge: {},
        result: {},
    };

    var supportElementProps = {
        id: 'string',
        type: 'string',
        text: 'string',
        end: 'string',
        order: 'number',
        from: 'string',
        to: 'string',
        position: 'object',
        style: 'object',
        shape: 'shape',
        shapeStyle: 'object',
        className: 'string',
        data: 'object',
        direction: 'string',
        directionFrom: 'object',
    };

    var idSeed = 1;

    var FlowChartElement = function(props) {
        props = $.extend({}, props);
        var that = this;
        that.type = supportElementTypes[props.type] ? props.type : 'action';
        that.isRelation = that.type === 'relation';
        that.isNode = !that.isRelation;
        that.text = props.text;
        that.order = props.order || idSeed++;
        var id = props.id;
        if (that.isRelation) {
            that.from = props.from;
            that.to = props.to;
            that.id = id || (that.from + '-' + that.to);
        } else {
            that.id = id || $.zui.uuid();
            if (props.direction !== undefined && props.directionFrom !== undefined) {
                that.direction = props.direction;
                that.directionFrom = props.directionFrom;
            }
            if (props.customPos !== undefined) {
                that.customPos = props.customPos;
            }
        }
        if (props.position && typeof props.position.left === 'number' && typeof props.position.top === 'number') {
            that.position = {
                left: props.position.left,
                top: props.position.top,
            };
            that.customPos = true;
        }
        that.order = idSeed++;
        if (that.isRelation) {
            that.order += 1000000;
        }
        if (props.style !== undefined) {
            that.style = props.style;
        }
        if (props.className !== undefined) {
            that.className = props.className;
        }
        that.data = $.extend({}, props.data);
        $.each(props, function(propName, propVal) {
            if (!supportElementProps[propName]) {
                that.data[propName] = propVal;
            }
        });
    };

    FlowChartElement.create = function(props) {
        if (props instanceof FlowChartElement) {
            return [props];
        }
        var element = new FlowChartElement(props);
        var elements = [element];
        if (element.isNode) {
            if (props.from) {
                var froms = $.isArray(props.from) ? props.from : [props.from];
                froms.forEach(function(from) {
                    var fromInfo = from.split(':');
                    elements.push(new FlowChartElement({
                        type: 'relation',
                        from: fromInfo[0],
                        to: element.id,
                        text: fromInfo[1],
                        id: fromInfo[0] + '-' + element.id
                    }));
                });
            }
            if (props.to) {
                var tos = $.isArray(props.to) ? props.to : [props.to];
                $.each(tos, function(_, to) {
                    var toInfo = to.split(':');
                    elements.push({
                        type: 'relation',
                        to: toInfo[0],
                        text: toInfo[1],
                        from: element.id,
                        id: element.id + '-' + toInfo[0]
                    });
                });
            }
        }
        return elements;
    };

    // The flowChart model class
    var FlowChart = function(element, options) {
        var that = this;
        that.name = NAME;

        // Get container
        var $container = that.$container = $(element).addClass('scrollbar-hover')
            .css('overflow', 'auto');

        that.id = $container.attr('id') || 'flowchart_' + $.zui.uuid();

        // Get options
        options = that.options = $.extend(
            {},
            FlowChart.DEFAULTS,
            $container.data(),
            options
        );
        var allLangs = $.extend({}, FlowChart.LANGS, options.langs);
        var userLang = options.lang || ($.zui && $.zui.clientLang ? $.zui.clientLang() : 'en');
        that.lang = allLangs[userLang.replace('_', '-')] || allLangs.en;

        // Create canvas
        var $canvas = $container.children('.flowchart-canvas');
        if (!$canvas.length) {
            $canvas = $('<div class="flowchart-canvas" style="position: relative; user-select: none"></div>')
                .appendTo($container);
        }
        var canvasID = 'flowchart-canvas-' + that.id;
        $canvas.attr('id', canvasID);
        that.$canvas = $canvas;

        // Reset containers size
        if (options.width !== undefined) {
            $container.css('width', options.width);
        }
        if (options.height !== undefined) {
            $container.css('height', options.height);
        }

        // Init quick add
        if (options.quickAdd) {
            $canvas.on('mouseenter', '.flowchart-node', function() {
                that.showQuickAdd($(this).data('id'));
            }).on('mouseleave', '.flowchart-node', function() {
                if (!that.isPreventDragNode) {
                    that.hideQuickAdd();
                }
            }).on('click', '.flowchart-quick-mark', function () {
                var $mark = $(this);
                that.quickAddNode($mark.closest('.flowchart-node').data('id'), $mark.data('direction'));
            });

            $canvas.droppable({
                container: '#' + canvasID,
                target: '.flowchart-node',
                selector: '.flowchart-quick-link-mark',
                mouseButton: 'left',
                before: function() {
                    that.isPreventDragNode = true;
                },
                start: function(e) {
                    var $node = $(e.element).closest('.flowchart-node');
                    that.dragSourceNode = $node.data('id');
                    that.focusElement(that.dragSourceNode);
                    $(e.shadowElement).css('zIndex', 20);
                    that.showQuickAdd(that.dragSourceNode, true);
                },
                drag: function(e) {
                    var newDragNode = e.isIn && e.target && $(e.target).data('id');
                    var lastDragNode = that.lastDragNode;
                    if (lastDragNode && (!newDragNode || newDragNode !== lastDragNode)) {
                        that.blurElement(lastDragNode);
                        that.lastDragNode = null;
                    }
                    if (newDragNode && newDragNode !== lastDragNode) {
                        that.lastDragNode = newDragNode;
                        that.focusElement(newDragNode);
                    }
                    var $line = $canvas.find('.flowchart-link-line');
                    var sourceNode = that.getElement(that.dragSourceNode);
                    if (!$line.length) {
                        $line = $('<svg class="flowchart-link-line" style="position: absolute; z-index: 30; top: 0; left: 0; right: 0; bottom: 0"><line x1="50" y1="50" x2="350" y2="350" stroke="' + options.activeColor + '" stroke-width="2" /></svg>').appendTo($canvas);
                    }
                    var sourcePoint = {
                        left: sourceNode.bounds.right,
                        top: sourceNode.bounds.bottom,
                    };
                    var targetPoint = {
                        left: e.position.left + 8,
                        top: e.position.top + 8,
                    };

                    $line.show().attr({
                        width: $canvas.width(),
                        height: $canvas.height(),
                    }).find('line').attr({
                        x1: sourcePoint.left,
                        y1: sourcePoint.top,
                        x2: targetPoint.left,
                        y2: targetPoint.top,
                    });
                },
                drop: function(e) {
                    var toNode = e.isIn && e.target && $(e.target).data('id');
                    that.addRelation(that.dragSourceNode, toNode);
                },
                always: function(e) {
                    that.isPreventDragNode = false;
                    if (that.dragSourceNode) {
                        that.blurElement(that.dragSourceNode);
                        that.dragSourceNode = null;
                    }

                    if (that.lastDragNode) {
                        that.blurElement(that.lastDragNode);
                        that.lastDragNode = null;
                    }
                    $canvas.find('.flowchart-link-line').hide();
                    that.hideQuickAdd();
                }
            })
            // var mouseDownOnLinkMark;
            // $canvas.on('mousedown', '.flowchart-quick-link-mark', function(e) {
            //     var $mark = $(this);
            //     mouseDownOnLinkMark = $mark.closest('.flowchart-node').data('id');
            //     e.preventDefault();
            //     e.stopPropagation();
            //     return false;
            // });
            // $(document).on('mmousemove', function(e) {
            //     if (mouseDownOnLinkMark) {
            //         var fromNode = that.getElement(mouseDownOnLinkMark);
            //         var fromPoint = {
            //             left: fromNode.bounds.right,
            //             top: fromNode.bounds.bottom,
            //         };
            //         var endPoint =
            //     }
            // });
        }

        // Init draggable event
        that.draggableEnable = options.draggable && $.fn.draggable;
        if (that.draggableEnable) {
            var handleDrag = function(e) {
                that.setNodePosition($(e.element).data('id'), e.pos);
            };
            $canvas.draggable({
                container: '#' + canvasID,
                selector: '.flowchart-node',
                stopPropagation: true,
                drag: handleDrag,
                finish: handleDrag,
                mouseButton: 'left',
                before: function() {
                    return !that.isPreventDragNode;
                }
            });
        }

        // Render
        that.elements = {};
        that.update(options.data);

        // Init edit event
        if (options.doubleClickToEdit) {
            $canvas.on('dblclick', '.flowchart-node,.flowchart-relation', function(e) {
                var $node = $(this).closest('.flowchart-node,.flowchart-relation');
                that.enterEditMode($node.data('id'));
                e.preventDefault();
            });
        }

        // Init contextmenu
        if (options.showContextMenu && $.zui.ContextMenu) {
            $canvas.on('mousedown', '.flowchart-node,.flowchart-relation', function(e) {
                if (e.button === 2) {
                    if (that.showContextMenu($(this).data('id'), e)) {
                    }
                }
                e.preventDefault();
                e.returnValue = false;
            }).on('contextmenu', function(e) {
                e.preventDefault();
                e.returnValue = false;
                return false;
            });
        }

        if (options.onClickNode) {
            $canvas.on('click', '.flowchart-node,.flowchart-relation', function(e) {
                var $node = $(this).closest('.flowchart-node,.flowchart-relation');
                options.onClickNode(that.getElement($node.data('id')), $node);
            });
        }
    };

    FlowChart.addNodeType = function(nodeType, displayName, defaultNodeStyle) {
        supportElementTypes[nodeType] = {
            name: displayName
        };
        if (defaultNodeStyle) {
            FlowChart.DEFAULTS[nodeType + 'NodeStyle'] = defaultNodeStyle;
        }
    };

    // Show quick add marks
    FlowChart.prototype.showQuickAdd = function(node, onlyLinkMark) {
        var that = this;

        if (typeof node === 'string') {
            node = that.elements[node];
        }
        if (!node) {
            return;
        }

        var $marks = node.$ele.find('.flowchart-quick-marks');
        if (!$marks.length) {
            var activeColor = that.options.activeColor;
            $marks = $([
                '<div class="flowchart-quick-marks" style="position:absolute;left:-16px;top:-16px;right:-16px;bottom:-16px;z-index:10">',
                    '<div class="flowchart-quick-mark" data-direction="top" style="position:absolute;pointer-events:auto;width:16px;height:16px;top:0;left:50%;margin-left:-8px;line-height:17px;text-align:center;cursor:pointer;border-radius:50%;background:#fff;background:rgba(255,255,255,.9);color:' + activeColor + '"><i class="icon icon-circle-arrow-up"></i></div>',
                    '<div class="flowchart-quick-mark" data-direction="right" style="position:absolute;pointer-events:auto;width:16px;height:16px;right:0;top:50%;margin-top:-8px;line-height:17px;text-align:center;cursor:pointer;border-radius:50%;background:#fff;background:rgba(255,255,255,.9);color:' + activeColor + '"><i class="icon icon-circle-arrow-right"></i></div>',
                    '<div class="flowchart-quick-mark" data-direction="bottom" style="position:absolute;pointer-events:auto;width:16px;height:16px;bottom:0;left:50%;margin-left:-8px;line-height:17px;text-align:center;cursor:pointer;border-radius:50%;background:#fff;background:rgba(255,255,255,.9);color:' + activeColor + '"><i class="icon icon-circle-arrow-down"></i></div>',
                    '<div class="flowchart-quick-mark" data-direction="left" style="position:absolute;pointer-events:auto;width:16px;height:16px;left:0;top:50%;margin-top:-8px;line-height:17px;text-align:center;cursor:pointer;border-radius:50%;background:#fff;background:rgba(255,255,255,.9);color:' + activeColor + '"><i class="icon icon-circle-arrow-left"></i></div>',
                    '<div class="flowchart-quick-link-mark" style="position:absolute;pointer-events:auto;width:16px;height:16px;right:1px;bottom:1px;line-height:17px;text-align:center;cursor:pointer;border-radius:50%;background:#fff;background:rgba(255,255,255,.9);color:' + activeColor + ';border-radius:50%;cursor:move"><i class="icon icon-dot-circle"></i></div>',
                '</div>'
            ].join('')).appendTo(node.$ele);
        }
        var $children = $marks.show().children().show();
        if (onlyLinkMark) {
            $children.not('.flowchart-quick-link-mark').hide();
        }
        var options = that.options;
        if (node.bounds.left < (options.padding + 80 + options.horzSpace)) {
            $marks.find('[data-direction="left"]').hide();
        }
        if (node.bounds.top < (options.padding + options.nodeHeight + options.vertSpace)) {
            $marks.find('[data-direction="top"]').hide();
        }

        that._currentQuickAddNode = node;
    };

    // Hide quick add marks
    FlowChart.prototype.hideQuickAdd = function() {
        var that = this;
        var node  = that._currentQuickAddNode;
        if (!node) {
            return;
        }
        node.$ele.find('.flowchart-quick-marks').hide();
        that._currentQuickAddNode = null;
    };

    // Quick add node
    FlowChart.prototype.quickAddNode = function(fromNode, direction) {
        var that = this;

        if (typeof fromNode === 'string') {
            fromNode = that.elements[fromNode];
        }
        if (!fromNode) {
            return;
        }

        var nodeID = $.zui.uuid();
        that.update({
            id: nodeID,
            text: '',
            direction: direction,
            directionFrom: fromNode,
            from: fromNode.id,
        });
        that.enterEditMode(nodeID);
    };

    // Show contextmenu
    FlowChart.prototype.showContextMenu = function(ele, event) {
        var that = this;
        if (typeof ele === 'string') {
            ele = that.elements[ele];
        }
        if (!ele) {
            return;
        }
        var items = [];
        if (ele.isNode) {
            var typeButtonsHTML = [];
            $.each(supportElementTypes, function(nodeType, nodeInfo) {
                if (nodeType !== 'relation') {
                    typeButtonsHTML.push('<a class="btn btn-mini' + (ele.type === nodeType ? ' btn-success' : '') + '" data-type="'+ nodeType + '" style="margin-left: 5px">' + (that.lang['type.' + nodeType] || nodeInfo.name) + '</a>');
                }
            });
            items.push({
                id: 'type',
                html: [
                    '<div style="padding: 3px 20px; white-space: nowrap;">',
                        '<span class="btn btn-mini disabled" style="background: none; border: none;padding: 0">' + that.lang.type + '</span>',
                        typeButtonsHTML.join(''),
                    '</div>'
                ].join(''),
                onClick: function(e) {
                    var $btn = $(e.target).closest('.btn');
                    var type = $btn.data('type');
                    if (type !== ele.type) {
                        ele.type = type;
                        that.render(ele);
                    }
                }
            }, '-');
        }
        items.push({
            id: 'edit',
            label: that.lang.edit,
            onClick: function() {
                that.enterEditMode(ele);
            },
        }, {
            id: 'delete',
            label: that.lang.delete,
            onClick: function() {
                if (!that.options.deleteConfirm || confirm(that.lang.confirmToDelete.format(ele.text || ele.id))) {
                    that.delete(ele.id);
                }
            }
        });
        if (typeof that.options.showContextMenu === 'function') {
            items = that.options.showContextMenu(ele, items, event);
        }
        if (items && items.length) {
            $.zui.ContextMenu.show(items, {event: event});
            return true;
        }
    };

    // Render node
    FlowChart.prototype.renderNode = function(node, skipLayout) {
        var that    = this;
        var options = that.options;

        var $node = $(that._getDomID(node));
        if (!$node.length) {
            $node = $('<div id="' + that._getDomID(node, 1) + '" style="z-index: 1" class="flowchart-node" data-id="' + node.id + '" data-type="' + node.type + '"><div class="text" style="position: relative; z-index: 5; outline: none; min-width: 10px; min-height: 20px;"></div></div>').appendTo(that.$canvas);
            if (that.draggableEnable) {
                $node.css('cursor', 'move');
            }
        }
        $.each(node.data, function(name, val) {
            $node.data(name, val);
        });
        $node.attr('data-type', node.type).addClass(node.className);
        var $text = $node.find('.text');
        $text.css($.extend({
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        }, options.nodeTextStyle)).text((node.text === undefined || node.text === null) ? '' : node.text);
        node.$ele = $node;

        if (node.position && !node.customPos) {
            node.position = null;
        }

        var typedNodeStyle = options[node.type + 'NodeStyle'];
        var style = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: options.nodeHeight,
            maxWidth: 200,
            minWidth: 70,
        };
        if (!typedNodeStyle || !typedNodeStyle.shape) {
            $.extend(style, {
                border: '1px solid #333',
                background: 'white',
                padding: "9px 10px",
            });
        } else {
            $.extend(style, {
                border: 'none',
                background: 'none',
                padding: "9px 20px",
            });
        }
        $.extend(style, options.nodeStyle, typedNodeStyle, node.style, node.position, {
            position: 'absolute',
            visibility: node.position ? 'visible' : 'hidden',
        });
        if(style.shape) delete style.shape;
        if(style.shapeStyle) delete style.shapeStyle;
        $node.css(style);

        var size = {
            width:  $node.outerWidth(),
            height: $node.outerHeight(),
        };

        var adsorptionGrid = that.options.adsorptionGrid;
        if (adsorptionGrid === true) {
            adsorptionGrid = 5;
        }
        size.width = Math.ceil(size.width / (adsorptionGrid * 2)) * adsorptionGrid * 2;
        // size.height = Math.ceil(size.height / (adsorptionGrid)) * adsorptionGrid;
        node.size = size;
        var shape = node.shape || (typedNodeStyle && typedNodeStyle.shape);

        if (shape) {
            var $shape = $node.children('.flowchart-shape');
            if (!$shape.length) {
                $shape = $('<svg class="flowchart-shape" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0"><polygon /></svg>').appendTo($node);
            }
            var $polygon = $shape.children('polygon');
            $polygon.css($.extend({
                fill: 'white',
                stroke: '#333',
                strokeWidth: 1,
            }, options.nodeShapeStyle, typedNodeStyle && typedNodeStyle.shapeStyle, node.shapeStyle));
            var points = null;
            if ($.isArray(shape)) {
                points = shape;
            } else if (typeof shape === 'function') {
                points = shape($shape, size, node, $node);
            } else if (shape === 'diamond') {
                points = [[0, size.height / 2], [size.width / 2, 0], [size.width, size.height / 2], [size.width / 2, size.height]];
            } else {
                points = [[0, 0], [size.width, 0], [size.width, size.height], [0, size.height]];
            }
            if (points) {
                var pointsStr = [];
                points.forEach(function(point) {
                    pointsStr.push($.isArray(point) ? point.join(',') : point);
                });
                $polygon.attr('points', pointsStr.join(' '));
                $shape.css(size).show();
            }
        } else {
            $node.children('.flowchart-shape').hide();
        }

        if (!skipLayout) {
            this._layoutNode(node);
        }

        if (options.relationLineGap) {
            node.sideRels = {
                top:    [],
                right:  [],
                bottom: [],
                left:   [],
            };
        }
    };

    // Caculate node position and change layout of it.
    FlowChart.prototype._layoutNode = function(node, skipPosition) {
        var that     = this;
        var size     = node.size;
        var position = node.position;

        if (!position || !node.customPos) {
            var options = that.options;
            var parents = node.parents;
            var direction = node.direction;
            var directionFrom = node.directionFrom;

            position = {};
            var supportDirections = {top: 1, left: 1, bottom: 1, right: 1};
            if (direction && supportDirections[direction] && directionFrom) {
                var fromBounds = directionFrom.bounds;
                if (direction === 'top') {
                    position.left = Math.floor(fromBounds.centerLeft - (size.width / 2));
                    position.top = fromBounds.top - options.vertSpace - size.height;
                } else if (direction === 'left') {
                    position.left = fromBounds.left - options.horzSpace - size.width;
                    position.top = Math.floor(fromBounds.centerTop - (size.height / 2));
                } else if (direction === 'bottom') {
                    position.left = Math.floor(fromBounds.centerLeft - (size.width / 2));
                    position.top = fromBounds.bottom + options.vertSpace;
                } else if (direction === 'right') {
                    position.left = fromBounds.right + options.horzSpace;
                    position.top = Math.floor(fromBounds.centerTop - (size.height / 2));
                }
                if (node.direction) delete node.direction;
                if (node.directionFrom) delete node.directionFrom;
                node.customPos = 'auto';
            } else if (parents.length) {
                var parentsBounds;
                var siblingsIndex = 0;
                $.each(parents, function(idx, parentNode) {
                    if (!parentNode.position) {
                        return;
                    }
                    var parentPosition = parentNode.position;
                    var parentSize = parentNode.size;
                    if (parentsBounds) {
                        parentsBounds.left   = Math.min(parentsBounds.left, parentPosition.left);
                        parentsBounds.top    = Math.min(parentsBounds.top, parentPosition.top);
                        parentsBounds.right  = Math.max(parentsBounds.right, parentSize.width + parentPosition.left);
                        parentsBounds.bottom = Math.max(parentsBounds.bottom, parentSize.height + parentPosition.top);
                    } else {
                        parentsBounds = {
                            left:   parentPosition.left,
                            top:    parentPosition.top,
                            right:  parentSize.width + parentPosition.left,
                            bottom: parentSize.height + parentPosition.top
                        };
                    }

                    if (node.siblingsIndex === undefined) {
                        var parentChildren = parentNode.children;
                        if (parentChildren.length) {
                            $.each(parentChildren, function(_1, childNode) {
                                if (childNode.siblingsIndex === undefined) {
                                    childNode.siblingsIndex = siblingsIndex++;
                                }
                            });
                        }
                    }
                });
                node.parentsBounds = parentsBounds;
                position.left = parentsBounds.right + options.horzSpace;
                position.top  = parentsBounds.top + node.siblingsIndex * (options.nodeHeight + options.vertSpace);
            } else {
                var bounds   = that.bounds;
                position.left = bounds.left;
                position.top  = bounds.top + bounds.height + (bounds.height <= options.padding ? 0: (options.vertSpace - options.padding));
            }
            node.position = position;
            if (options.disableAutoPosition) {
                node.customPos = true;
            }
        }

        if (!skipPosition) {
            var adsorptionGrid = that.options.adsorptionGrid;
            if (adsorptionGrid) {
                position.left = Math.round(position.left / adsorptionGrid) * adsorptionGrid;
                position.top  = Math.round(position.top / adsorptionGrid) * adsorptionGrid;
            }
            node.$ele.css({
                visibility: 'visible',
                left: position.left,
                top: position.top,
                minWidth: size.width,
            });
        }

        that._calcNodeBounds(node);
    };

    // Calculate node bounds
    FlowChart.prototype._calcNodeBounds = function(node) {
        var bounds         = this.bounds;
        var position       = node.position;
        var size           = node.size;
        var centerLeft     = position.left + size.width / 2;
        var centerTop      = position.top + size.height / 2;
        var centerDistance = Math.sqrt(centerLeft * centerLeft + centerTop * centerTop);

        bounds.left   = Math.min(bounds.left, position.left);
        bounds.top    = Math.min(bounds.top, position.top);
        bounds.width  = Math.max(bounds.width, position.left + size.width);
        bounds.height = Math.max(bounds.height, position.top + size.height);

        node.bounds = {
            left: position.left,
            top: position.top,
            width: size.width,
            height: size.height,
            right: position.left + size.width,
            bottom: position.top + size.height,
            centerLeft: centerLeft,
            centerTop: centerTop,
            centerDistance: centerDistance,
        };
        return node.bounds;
    };

    // Render relation
    FlowChart.prototype.renderRelation = function(relation) {
        var that    = this;
        var options = that.options;

        var $relation = $(that._getDomID(relation));
        if (!$relation.length && relation.visible) {
            $relation = $('<div id="' + that._getDomID(relation, 1) + '" class="flowchart-relation" data-id="' + relation.id + '" data-type="relation" style="z-index: 0; pointer-events: none"><div style="position: absolute; pointer-events: auto" class="flowchart-rel-line flowchart-rel-begin-line"></div><div class="flowchart-rel-line flowchart-rel-center-line" style="position: absolute; pointer-events: auto; display: flex; align-items: center; justify-content: center; white-space: nowrap;"><span class="text flowchart-relation-text" style="background: #fff; background: rgba(255,255,255,.95); position: relative; z-index: 5; line-height: 1; outline: none; pointer-events: auto"></span></div><div style="position: absolute; pointer-events: auto; pointer-events: auto" class="flowchart-rel-line flowchart-rel-end-line"></div><div style="position: absolute; pointer-events: auto" class="flowchart-rel-arrow"></div></div>').appendTo(that.$canvas);
        }
        if (!relation.visible) {
            $relation.remove();
            return;
        }
        $.each(relation.data, function(name, val) {
            $relation.data(name, val);
        });
        $relation.addClass(relation.className);
        relation.$ele = $relation;

        // Caculate relatin bounds
        var fromNode       = relation.fromNode;
        var toNode         = relation.toNode;
        var fromNodeBounds = fromNode.bounds;
        var toNodeBounds   = toNode.bounds;

        // Calculate vert space
        var vertCenterDistance = fromNodeBounds.centerTop - toNodeBounds.centerTop;
        var horzCenterDistance = fromNodeBounds.centerLeft - toNodeBounds.centerLeft;
        var vertDistance = Math.abs(vertCenterDistance) - (fromNodeBounds.height + toNodeBounds.height) / 2;
        var horzDistance = Math.abs(horzCenterDistance) - (fromNodeBounds.width + toNodeBounds.width) / 2;
        var direction, isReverse, fromSide, toSide;
        if (vertDistance >= 0) {
            if (horzDistance >= 0) { // Four corners
                if (vertCenterDistance > 0) { // Top
                    if (horzCenterDistance > 0) { // Left
                        direction = 'top-left';
                        isReverse = true;
                        fromSide  = 'left';
                        toSide    = 'bottom';
                    } else { // Right
                        direction = 'top-right';
                        isReverse = false;
                        fromSide  = 'right';
                        toSide    = 'top';
                    }
                } else { // Bottom
                    if (horzCenterDistance > 0) { // Left
                        direction = 'bottom-left';
                        isReverse = true;
                        fromSide  = 'bottom';
                        toSide    = 'right';
                    } else { // Right
                        direction = 'bottom-right';
                        isReverse = false;
                        fromSide  = 'bottom';
                        toSide    = 'left';
                    }
                }
            } else {
                isReverse = vertCenterDistance > 0;
                direction = isReverse ? 'top' : 'bottom';
                fromSide  = direction;
                toSide    = isReverse ? 'bottom' : 'top';
            }
        } else {
            isReverse = horzCenterDistance > 0;
            direction = isReverse ? 'left' : 'right';
            fromSide  = direction;
            toSide    = isReverse ? 'right' : 'left';
        }
        relation.direction = direction;
        relation.isReverse = isReverse;
        relation.fromSide  = fromSide;
        relation.toSide    = toSide;

        var beginNode       = isReverse ? toNode : fromNode;
        var endNode         = isReverse ? fromNode : toNode;
        var beginBounds     = beginNode.bounds;
        var endBounds       = endNode.bounds;
        var beginSide       = isReverse ? toSide : fromSide;
        var endSide         = isReverse ? fromSide : toSide;
        var relationLineGap = options.relationLineGap;
        var beginSideRels   = relationLineGap && beginNode.sideRels[beginSide];
        var endSideRels     = relationLineGap && endNode.sideRels[endSide];

        if (relationLineGap) {
            var findRelById = function(rel) {
                return rel.id === relation.id;
            };
            if (!beginSideRels.length || !beginSideRels.find(findRelById)) {
                beginSideRels.push(relation);
                if (beginSideRels.length > 1) {
                    beginSideRels.forEach(function(rel) {
                        if (rel.id !== relation.id) {
                            that.renderRelation(rel);
                        }
                    });
                }
            }
            if (!endSideRels.length || !endSideRels.find(findRelById)) {
                endSideRels.push(relation);
                if (endSideRels.length > 1) {
                    endSideRels.forEach(function(rel) {
                        if (rel.id !== relation.id) {
                            that.renderRelation(rel);
                        }
                    });
                }
            }

            var sortRels;
            if (direction.startsWith('bottom') || direction.startsWith('top')) {
                sortRels = function(rel1, rel2) {
                    var centerLeft1 = (rel1 && rel1.toNode && rel1.toNode.bounds) ? rel1.toNode.bounds.centerLeft : -1;
                    var centerLeft2 = (rel2 && rel2.toNode && rel2.toNode.bounds) ? rel2.toNode.bounds.centerLeft : -1;
                    return centerLeft1 - centerLeft2;
                };
            } else {
                sortRels = function(rel1, rel2) {
                    var centerTop1 = (rel1 && rel1.toNode && rel1.toNode.bounds) ? rel1.toNode.bounds.centerTop : -1;
                    var centerTop2 = (rel2 && rel2.toNode && rel2.toNode.bounds) ? rel2.toNode.bounds.centerTop : -1;
                    return centerTop1 - centerTop2;
                };
            }
            if (beginSideRels && beginSideRels.length) {
                beginSideRels.sort(sortRels);
            }
            if (endSideRels && endSideRels.length) {
                endSideRels.sort(sortRels);
            }
        }
        var beginSideRelIndex  = relationLineGap && beginSideRels.findIndex(findRelById);
        var endSideRelIndex    = relationLineGap && endSideRels.findIndex(findRelById);
        var beginSideRelsCount = relationLineGap ? beginSideRels.length : 0;
        var endSideRelsCount   = relationLineGap ? endSideRels.length : 0;

        relation.beginSideRels = beginSideRels;
        relation.endSideRels = endSideRels;
        relation.beginSideRelIndex = beginSideRelIndex;
        relation.endSideRelIndex = endSideRelIndex;
        relation.beginSideRelsCount = beginSideRelsCount;
        relation.endSideRelsCount = endSideRelsCount;

        var bounds            = {};
        var lineColor         = options.relationLineColor;
        var lineSize          = options.relationLineWidth;
        var hideArrow         = options.hideArrowToResult && endNode.type === 'result';
        var arrowSize         = hideArrow ? 0 : options.relationArrowSize;
        var beginLineStyle    = {};
        var endLineStyle      = {};
        var centerLineStyle   = {
            alignItems: 'center',
            justifyContent: 'center',
        };
        var arrowStyle        = hideArrow ? {display: 'none'} : {
            display: 'block',
            position: 'absolute',
            width: 0,
            height: 0,
            borderTopWidth: arrowSize / 2,
            borderRightWidth: arrowSize / 2,
            borderBottomWidth: arrowSize / 2,
            borderLeftWidth: arrowSize / 2,
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            borderStyle: 'solid',
        };
        var baseLineStyle = {
            background: lineColor,
            position: 'absolute',
        };
        var beginLineOffset = relationLineGap ? (1 - beginSideRelsCount + 2 * beginSideRelIndex) * relationLineGap : 0;
        var endLineOffset = relationLineGap ? (1 - endSideRelsCount + 2 * endSideRelIndex) * relationLineGap : 0;
        relation.beginLineOffset = beginLineOffset;
        relation.endLineOffset = endLineOffset;

        if (direction === 'bottom-left' || direction === 'top-right') {
            // Relation link as ┘
            bounds.left   = beginBounds.right;
            bounds.top    = endBounds.bottom;
            bounds.width  = endBounds.right - bounds.left;
            bounds.height = beginBounds.bottom - bounds.top;

            beginLineStyle.left   = isReverse ? arrowSize : 0;
            beginLineStyle.top    = Math.floor(beginBounds.centerTop - bounds.top - lineSize / 2) + beginLineOffset;
            beginLineStyle.width  = Math.floor(bounds.width - lineSize - endBounds.width / 2) - beginLineStyle.left + endLineOffset;
            beginLineStyle.height = lineSize;

            endLineStyle.left   = beginLineStyle.width + beginLineStyle.left;
            endLineStyle.top    = isReverse ? 0 : arrowSize;
            endLineStyle.width  = lineSize;
            endLineStyle.height = beginLineStyle.top - endLineStyle.top;

            centerLineStyle.left   = endLineStyle.left;
            centerLineStyle.top    = beginLineStyle.top;
            centerLineStyle.height = lineSize;
            centerLineStyle.width  = lineSize;

            if (options.showRelationTextOnSide) {
                centerLineStyle.justifyContent = 'flex-start';
                centerLineStyle.textIndent     = '4px';
            }

            if (!hideArrow) {
                if (isReverse) {
                    // render left arrow
                    arrowStyle.borderRightWidth = arrowSize;
                    arrowStyle.borderLeftWidth  = 0;
                    arrowStyle.borderRightColor = lineColor;
                    arrowStyle.left = 0;
                    arrowStyle.top  = Math.floor(beginLineStyle.top + lineSize / 2 - arrowSize / 2);
                } else {
                    // render top arrow
                    arrowStyle.borderBottomWidth = arrowSize;
                    arrowStyle.borderTopWidth    = 0;
                    arrowStyle.borderBottomColor = lineColor;
                    arrowStyle.top  = 0;
                    arrowStyle.left = Math.floor(endLineStyle.left + lineSize / 2 - arrowSize / 2);
                }
            }
        } else if (direction === 'top-left' || direction === 'bottom-right') {
            // Relation link as └
            bounds.left   = beginBounds.left;
            bounds.top    = beginBounds.bottom;
            bounds.width  = endBounds.left - bounds.left;
            bounds.height = beginBounds.bottom - bounds.top;

            beginLineStyle.left   = Math.floor(beginBounds.width / 2 - lineSize) + beginLineOffset;
            beginLineStyle.top    = isReverse ? arrowSize : 0;
            beginLineStyle.width  = lineSize;
            beginLineStyle.height = Math.floor(endBounds.centerTop - bounds.top - lineSize / 2) - beginLineStyle.top + endLineOffset;

            endLineStyle.left   = beginLineStyle.left + lineSize;
            endLineStyle.top    = beginLineStyle.top + beginLineStyle.height;
            endLineStyle.width  = Math.floor(bounds.width - lineSize - beginLineStyle.left) - (isReverse ? 0 : arrowSize);
            endLineStyle.height = lineSize;

            centerLineStyle.top    = endLineStyle.top;
            centerLineStyle.left   = beginLineStyle.left;
            centerLineStyle.height = lineSize;
            centerLineStyle.width  = lineSize;

            if (options.showRelationTextOnSide) {
                centerLineStyle.justifyContent = 'flex-end';
            }

            if (!hideArrow) {
                if (isReverse) {
                    // render top arrow
                    arrowStyle.borderBottomWidth = arrowSize;
                    arrowStyle.borderTopWidth    = 0;
                    arrowStyle.borderBottomColor = lineColor;
                    arrowStyle.top  = 0;
                    arrowStyle.left = Math.floor(beginLineStyle.left + lineSize / 2 - arrowSize / 2);
                } else {
                    // render right arrow
                    arrowStyle.borderLeftWidth  = arrowSize;
                    arrowStyle.borderRightWidth = 0;
                    arrowStyle.borderLeftColor  = lineColor;
                    arrowStyle.left = endLineStyle.left + endLineStyle.width;
                    arrowStyle.top  = Math.floor(endLineStyle.top + lineSize / 2 - arrowSize / 2);
                }
            }
        } else if (direction === 'left' || direction === 'right') {
            bounds.left   = beginBounds.right;
            bounds.top    = Math.min(beginBounds.top, endBounds.top);
            bounds.width  = endBounds.left - bounds.left;
            bounds.height = Math.max(beginBounds.bottom, endBounds.bottom) - bounds.top;

            beginLineStyle.left   = isReverse ? arrowSize : 0;
            beginLineStyle.top    = Math.floor(beginBounds.centerTop - bounds.top - lineSize / 2) + beginLineOffset;
            beginLineStyle.width  = bounds.width / 2 - beginLineStyle.left;
            beginLineStyle.height = lineSize;

            endLineStyle.left   = beginLineStyle.left + beginLineStyle.width;
            endLineStyle.top    = Math.floor(endBounds.centerTop - bounds.top - lineSize / 2) + endLineOffset;
            endLineStyle.width  = bounds.width / 2 - (isReverse ? 0 : arrowSize);
            endLineStyle.height = lineSize;

            centerLineStyle.left = Math.floor(bounds.width / 2 - lineSize / 2);
            centerLineStyle.top = Math.floor(Math.min(beginLineStyle.top, endLineStyle.top));
            centerLineStyle.height = Math.floor(Math.abs(beginLineStyle.top - endLineStyle.top) + lineSize);
            centerLineStyle.width = lineSize;

            if (options.showRelationTextOnSide) {
                if (centerLineStyle.height <= 10) {
                    centerLineStyle.alignItems = 'flex-end';
                } else {
                    centerLineStyle.justifyContent = 'flex-start';
                    centerLineStyle.textIndent = '4px';
                }
            }

            if (!hideArrow) {
                if (isReverse) {
                    // render left arrow
                    arrowStyle.borderRightWidth = arrowSize;
                    arrowStyle.borderLeftWidth = 0;
                    arrowStyle.borderRightColor = lineColor;
                    arrowStyle.left = 0;
                    arrowStyle.top = Math.floor(beginLineStyle.top + lineSize / 2 - arrowSize / 2);
                } else {
                    // render right arrow
                    arrowStyle.borderLeftWidth = arrowSize;
                    arrowStyle.borderRightWidth = 0;
                    arrowStyle.borderLeftColor = lineColor;
                    arrowStyle.left = endLineStyle.left + endLineStyle.width;
                    arrowStyle.top = Math.floor(endLineStyle.top + lineSize / 2 - arrowSize / 2);
                }
            }
        } else if (direction === 'top' || direction === 'bottom') {
            bounds.left   = Math.min(beginBounds.left, endBounds.left);
            bounds.top    = beginBounds.bottom;
            bounds.width  = Math.max(beginBounds.right, endBounds.right) - bounds.left;
            bounds.height = endBounds.top - bounds.top;

            beginLineStyle.top    = isReverse ? arrowSize : 0;
            beginLineStyle.left   = Math.floor(beginBounds.centerLeft - bounds.left - lineSize / 2) + beginLineOffset;
            beginLineStyle.height = bounds.height / 2 - beginLineStyle.top;
            beginLineStyle.width  = lineSize;

            endLineStyle.top    = bounds.height / 2;
            endLineStyle.left   = Math.floor(endBounds.centerLeft - bounds.left - lineSize / 2) + endLineOffset;
            endLineStyle.height = bounds.height / 2 - (isReverse ? 0 : arrowSize);
            endLineStyle.width  = lineSize;

            centerLineStyle.top    = Math.floor(bounds.height / 2 - lineSize / 2);
            centerLineStyle.left   = Math.floor(Math.min(beginLineStyle.left, endLineStyle.left));
            centerLineStyle.width  = Math.floor(Math.abs(beginLineStyle.left - endLineStyle.left) + lineSize);
            centerLineStyle.height = lineSize;

            if (options.showRelationTextOnSide) {
                if (centerLineStyle.width <= 10) {
                    centerLineStyle.justifyContent = 'flex-start';
                    centerLineStyle.textIndent = '4px';
                } else {
                    centerLineStyle.alignItems = 'flex-end';
                }
            }

            if (!hideArrow) {
                if (isReverse) {
                // render top arrow
                arrowStyle.borderBottomWidth = arrowSize;
                arrowStyle.borderTopWidth    = 0;
                arrowStyle.borderBottomColor = lineColor;
                arrowStyle.top  = 0;
                arrowStyle.left = Math.floor(beginLineStyle.left + lineSize / 2 - arrowSize / 2);
                } else {
                    // render bottom arrow
                    arrowStyle.borderTopWidth    = arrowSize;
                    arrowStyle.borderBottomWidth = 0;
                    arrowStyle.borderTopColor    = lineColor;
                    arrowStyle.top  = endLineStyle.top + endLineStyle.height;
                    arrowStyle.left = Math.floor(endLineStyle.left + lineSize / 2 - arrowSize / 2);
                }
            }
        }
        $relation.find('.flowchart-rel-arrow').css(arrowStyle);
        $relation.find('.flowchart-rel-begin-line').css($.extend(beginLineStyle, baseLineStyle));
        $relation.find('.flowchart-rel-end-line').css($.extend(endLineStyle, baseLineStyle));
        var $centerLine  = $relation.find('.flowchart-rel-center-line').css($.extend(centerLineStyle, baseLineStyle));
        var relationText = (relation.text === undefined || relation.text === null) ? '' : relation.text;
        if (options.showRelationTextOnSide) {
            $centerLine.text(relationText);
        } else {
            $centerLine.find('.text').css($.extend({}, options.relationTextStyle)).text(relationText);
        }

        $relation.css($.extend({position: 'absolute'}, bounds));
    };

    // Check two nodes wether is intersect
    FlowChart.prototype._isNodeIntersect = function(node1, node2)
    {
        var node1Bounds = node1.bounds;
        var node2Bounds = node2.bounds;
        return !((node2Bounds.right < node1Bounds.left)
            || (node2Bounds.left > node1Bounds.right)
            || (node2Bounds.bottom < node1Bounds.top)
            || (node2Bounds.top > node1Bounds.bottom));
    };

    // Render elements and relations
    FlowChart.prototype.render = function(partials) {
        var that         = this;
        var options      = that.options;
        var elements     = that.elements;
        var nodeList     = [];
        var relationList = [];

        $.each(elements, function(_, element) {
            if (element.type === 'relation') {
                relationList.push(element);
            } else {
                delete element.siblingsIndex;
                element.fromRels = [];
                element.toRels   = [];
                element.children = [];
                element.parents  = [];
                nodeList.push(element);
            }
        });

        var elementsSorter = function(e1, e2) {
            return e1.order - e2.order;
        };
        nodeList.sort(elementsSorter);
        relationList.sort(elementsSorter);

        $.each(relationList, function(_, relation) {
            var fromNode = elements[relation.from];
            var toNode = elements[relation.to];
            relation.visible = fromNode && toNode;
            if (relation.visible) {
                relation.fromIndex = fromNode.fromRels.length;
                relation.toIndex   = fromNode.toRels.length;
                relation.fromNode  = fromNode;
                relation.toNode    = toNode;

                fromNode.fromRels.push(relation);
                toNode.toRels.push(relation);
                fromNode.children.push(toNode);
                toNode.parents.push(fromNode);
            }
        });
        var partialsMap = partials ? {} : null;
        if (partials) {
            if (!$.isArray(partials)) {
                partials = [partials];
            }
            $.each(partials, function(_, elementId) {
                if (typeof elementId === 'object') {
                    elementId = elementId.id;
                }
                var element = elements[elementId];
                if (element) {
                    partialsMap[elementId] = element;
                    if (element.type !== 'relation') {
                        var relationLineGap = options.relationLineGap;
                        var addRelToPartialMap = function(rel) {
                            partialsMap[rel.id] = rel;
                        };
                        var addRel = function(rel) {
                            addRelToPartialMap(rel);
                            if (relationLineGap) {
                                if (rel.beginSideRels) {
                                    rel.beginSideRels.forEach(addRelToPartialMap);
                                }
                                if (rel.endSideRels) {
                                    rel.endSideRels.forEach(addRelToPartialMap);
                                }
                            }
                        };
                        if (element.fromRels.length) {
                            element.fromRels.forEach(addRel);
                        }
                        if (element.toRels.length) {
                            element.toRels.forEach(addRel);
                        }
                    }
                }

            });
        } else {
            that.bounds = {left: options.padding, top: options.padding, width: 0, height: 0};
        }

        $.each(nodeList, function(_, node) {
            if (partialsMap && !partialsMap[node.id]) {
                return;
            }
            that.renderNode(node, true);
        });
        $.each(nodeList, function(_, node) {
            if (partialsMap && !partialsMap[node.id]) {
                return;
            }
            that._layoutNode(node, !partials);
        });

        // Handle overlay
        if (!partials) {
            var needCheckOverlay = true;
            while(needCheckOverlay) {
                needCheckOverlay = false;
                for (var i = nodeList.length - 1; i >= 0; --i) {
                    var nodeA = nodeList[i];
                    if (nodeA.customPos !== true) {
                        continue;
                    }
                    for (var j = nodeList.length - 1; j >= 0; --j) {
                        if (i === j) {
                            continue;
                        }
                        var nodeB = nodeList[j];
                        if (that._isNodeIntersect(nodeA, nodeB)) {
                            needCheckOverlay = true;
                            nodeA.position.top += options.vertSpace + nodeA.size.height;
                            that._calcNodeBounds(nodeA);
                        }
                    }
                }
            };
            nodeList.forEach(function(node) {
                if (partialsMap && !partialsMap[node.id]) {
                    return;
                }
                that._layoutNode(node);
            });
        }

        $.each(relationList, function(_, relation) {
            if (partialsMap && !partialsMap[relation.id]) {
                return;
            }
            that.renderRelation(relation);
        });

        that.$canvas.css({
            minWidth: Math.max(that.$container.width(), that.bounds.width + options.padding),
            minHeight: Math.max(that.$container.height(), that.bounds.height + options.padding),
        });
    };

    // Set node position
    FlowChart.prototype.setNodePosition = function(nodeID, position) {
        var that = this;
        var node = that.getElement(nodeID);
        if (!node) {
            return;
        }
        node.position = {
            left: typeof position.left === 'number' ? position.left : node.position.left,
            top: typeof position.top === 'number' ? position.top : node.position.top,
        };
        node.customPos = true;
        that.render(node);
    };

    // Add relation between two nodes
    FlowChart.prototype.addRelation = function(fromNode, toNode, text) {
        var that = this;

        if (typeof fromNode === 'string') {
            fromNode = that.elements[fromNode];
        }
        if (typeof toNode === 'string') {
            toNode = that.elements[toNode];
        }
        if (!fromNode || !toNode) {
            return;
        }

        var relation = new FlowChartElement({
            type: 'relation',
            text: text,
            from: fromNode.id,
            to: toNode.id,
        });
        that.update(relation);
        that.enterEditMode(relation.id);
    };

    // Reset all custom positions
    FlowChart.prototype.resetPosition = function() {
        $.each(this.elements, function(_, element) {
            if (element.type !== 'relation' && element.customPos) {
                delete element.customPos;
            }
        });
        this.render();
    };

    // Get element by id
    FlowChart.prototype.getElement = function(elementID) {
        if (!elementID) {
            return null;
        }
        if (typeof elementID !== 'string') {
            elementID = elementID.id;
        }
        return this.elements[elementID];
    };

    // Focus element
    FlowChart.prototype.focusElement = function(elementID) {
        var ele = this.getElement(elementID);
        if (ele.isNode) {
            var $ele = ele.$ele;
            ele.styleBeforeFocus = {
                zIndex: $ele.css('zIndex'),
                borderColor: $ele.css('borderColor'),
                boxShadow: $ele.css('boxShadow'),
            };
            var activeColor = this.options.activeColor;
            $ele.css({
                zIndex: 10,
                borderColor: activeColor,
                boxShadow: '0 0 0 2px ' + activeColor,
            });
        }
    };

    // Blur element
    FlowChart.prototype.blurElement = function(elementID) {
        var ele = this.getElement(elementID);
        if (ele.isNode) {
            var $ele = ele.$ele;
            if (ele.styleBeforeFocus) {
                $ele.css(ele.styleBeforeFocus);
                delete ele.styleBeforeFocus;
            }
        }
    };

    // Enter edit mode
    FlowChart.prototype.enterEditMode = function(ele) {
        var that = this;
        ele = that.getElement(ele);
        if (!ele) {
            return;
        }

        that.exitEditMode();

        var $ele = ele.$ele;
        var $inputBox = ele.isRelation ? $ele.find('.flowchart-relation-text') : $ele;
        ele.styleBeforeEdit = {
            zIndex: $inputBox.css('zIndex'),
            borderColor: $inputBox.css('borderColor'),
            boxShadow: $inputBox.css('boxShadow'),
            paddingLeft: $inputBox.css('paddingLeft'),
            paddingRight: $inputBox.css('paddingRight'),
        };
        var activeColor = that.options.activeColor;
        $inputBox.css({
            zIndex: 10,
            borderColor: activeColor,
            boxShadow: '0 0 0 2px ' + activeColor,
            paddingLeft: 4,
            paddingRight: 4,
        });

        var $text = ele.isRelation ? $inputBox : $ele.find('.text');
        $text.attr('contenteditable', 'true').focus().on('blur.' + that.id, function() {
            that.exitEditMode();
        });
        $text.on('input.' + that.id, function() {
            that.editNodeText(ele, $text.text(), true);
        });
        selectText($text);
        that._currentEditEle = ele;
    };

    // Exit edit mode
    FlowChart.prototype.exitEditMode = function() {
        var that = this;
        var ele  = that._currentEditEle;
        if (!ele) {
            return;
        }
        var $ele      = ele.$ele;
        var $inputBox = ele.isRelation ? $ele.find('.flowchart-relation-text') : $ele;
        var $text     = ele.isRelation ? $inputBox : $ele;

        $inputBox.css(ele.styleBeforeEdit);
        $text.attr('contenteditable', ' ').off('.' + that.id);
        that._currentEditEle = null;
        that.editNodeText(ele, $text.text());
    };

    // Edit node text
    FlowChart.prototype.editNodeText = function(node, text, skipRender) {
        if (typeof node === 'string') {
            node = this.elements[node];
        }
        if (!node) {
            return;
        }
        if (node.text !== undefined && node.originText === undefined) {
            node.originText = node.text;
        }
        node.text = text;

        if (!skipRender) {
            this.render(node);
        }
    };

    // Reset data
    FlowChart.prototype.resetData = function(data) {
        if (!data) {
            data = [{
                id: 'start',
                type: 'start',
                text: 'Start',
                // className: 'text-red',
                // style: {color: 'red'}
            }];
        }
        var that = this;
        var oldElements = [];
        $.each(that.elements, function(_, ele) {
            oldElements.push(ele);
        });
        that.delete(oldElements, true);
        that.update(data);
    };

    // Update elements data
    FlowChart.prototype.update = function(elementsData, skipRender) {
        if (typeof elementsData === 'object' && !$.isArray(elementsData)) {
            elementsData = [elementsData];
        }
        if (!elementsData || !elementsData.length) return;

        var that = this;
        var elements = that.elements;
        $.each(elementsData, function(_, element) {
            var newElements = FlowChartElement.create(element);
            newElements.forEach(function(newElement) {
                var oldElement = elements[newElement.id];
                if (oldElement) {
                    newElement.order = oldElement.order;
                    if (!newElement.position) {
                        newElement.position = oldElement.position;
                    }
                }
                elements[newElement.id] = newElement;
            });
        });

        if (!skipRender) {
            that.render();
        }
    };

    // Replace element with a new one
    FlowChart.prototype.replace = function(oldElementID, newElement, skipRender) {
        if (typeof oldElementID !== 'string') {
            oldElementID = oldElementID.id;
        }
        var that = this;

        var newElements = FlowChartElement.create(newElement);
        newElement = newElements[0];
        var oldElement = that.getElement(oldElementID);
        if (oldElement) {
            that.delete(oldElementID, true);
        }
        $.each(that.elements, function(_, element) {
            if (element.isRelation) {
                if (element.from === oldElementID) {
                    element.from = newElement.id;
                } else if (element.to === oldElementID) {
                    element.to = newElement.id;
                }
            }
        });
        if (!skipRender) {
            that.render();
        }
    };

    // Get dom id of given element
    FlowChart.prototype._getDomID = function(element, excludeCssPrefix) {
        return (excludeCssPrefix ? '' : '#') + this.id + '-' + (typeof element === 'string' ? element : element.id);
    };

    // Delete elements and relations
    FlowChart.prototype.delete = function(idList, skipRender) {
        var that = this;
        if (!$.isArray(idList)) {
            idList = [idList];
        }

        $.each(idList, function(idx, id) {
            if (typeof id === 'object') {
                id = id.id;
            }
            var $element = that.$canvas.find(that._getDomID(id));
            if ($element) {
                $element.remove();
            }
            var element = that.getElement(id);
            if (element) {
                if (element.isNode) {
                    // Delete relations
                    element.fromRels && element.fromRels.forEach(function(relation) {
                        that.delete(relation.id, true);
                    });
                    element.toRels && element.toRels.forEach(function(relation) {
                        that.delete(relation.id, true);
                    });
                }
                delete that.elements[id];
            }
        });

        if (!skipRender) {
            that.render();
        }
    };

    // Export chart data as elements list
    FlowChart.prototype.exportData = function() {
        var data = [];
        $.each(this.elements, function(_, element) {
            var dataItem = {
                id: element.id,
                type: element.type,
                order: element.order,
            };
            if (element.type === 'relation') {
                dataItem.from = element.from;
                dataItem.to = element.to;
            } else if (element.customPos) {
                dataItem.position = element.position;
            }
            if (element.text !== undefined) {
                dataItem.text = element.text;
            }
            if (element.className !== undefined) {
                dataItem.className = element.className;
            }
            if (element.style !== undefined) {
                dataItem.style = element.style;
            }
            $.extend(dataItem, element.data);
            data.push(dataItem);
        });
        data.sort(function(e1, e2) {
            return e1.order - e2.order;
        });
        $.each(data, function(_, dataItem) {
            delete dataItem.order;
        });
        return data;
    };

    // Change options
    FlowChart.prototype.setOptions = function(newOptions, skipRender) {
        $.extend(this.options, newOptions);
        if (!skipRender) {
            this.render();
        }
    };

    FlowChart.LANGS = {
        'zh-cn': {
            confirmToDelete: "确定删除【{0}】？",
            edit: '编辑',
            'delete': '删除',
            'type': '类型',
            'type.action': '动作',
            'type.start': '开始',
            'type.stop': '结束',
            'type.result': '结果',
            'type.relation': '关系',
            'type.judge': '判断',
        },
        'zh-tw': {
            confirmToDelete: "確定刪除【{0}】？",
            edit: '編輯',
            'delete': '刪除',
            'type': '類型',
            'type.action': '動作',
            'type.start': '開始',
            'type.stop': '結束',
            'type.result': '結果',
            'type.relation': '關係',
            'type.judge': '判斷',
        },
        en: {
            confirmToDelete: "Confirm to delete \"{0}\"?",
            edit: 'Edit',
            'delete': 'Delete',
            'type': 'Type',
            'type.action': 'Action',
            'type.start': 'Start',
            'type.stop': 'Stop',
            'type.result': 'Result',
            'type.relation': 'Relation',
            'type.judge': 'Judge',
        },
    },

    // default options
    FlowChart.DEFAULTS = {
        // 当前语言，如果指定为 `null`，则自动设置语言
        lang: null,

        // 添加新的语言选项
        langs: null,

        // 激活状态颜色
        activeColor: '#3280fc',

        // 是否移动时自动吸附网格
        // 如果设置为 true，则设置网格为 5，如果为数值则为指定的网格大小
        adsorptionGrid: 5,

        // 是否启用双击编辑功能
        doubleClickToEdit: true,

        // 是否显示节点上下文菜单（右键菜单）
        // 此选项可以设置为一个函数动态返回自定义菜单项
        showContextMenu: true,

        // 是否禁用自动位置排列
        disableAutoPosition: true,

        // 是否启用快速添加功能，显示浮动的按钮快捷的向四个方向添加新的节点
        quickAdd: true,

        // 删除节点前是否确认
        deleteConfirm: true,

        // 是否启用拖放移动功能
        draggable: true,

        // 画布宽度，如果设置为 `auto` 则宽度与外部容器元素宽度一致
        width: 'auto',

        // 画布高度
        height: 500,

        // 画布内边距
        padding: 20,

        // 动作节点高度
        nodeHeight: 40,

        // 节点间的水平距离
        horzSpace: 80,

        // 节点间的垂直距离
        vertSpace: 60,

        // 连接线箭头大小
        relationArrowSize: 8,

        // 连接线宽度
        relationLineWidth: 1,

        // 连接线颜色
        relationLineColor: '#333',

        // 连接线间距，如果设置为 0 则会合并同一方向上的连接线，否则会使用给定的值作为间距
        relationLineGap: 2,

        // 隐藏指向结果节点的关系箭头
        hideArrowToResult: true,

        // 节点基本样式
        nodeStyle: {
        },

        // 动作节点样式
        actionNodeStyle: {
            borderRadius: '2px',
        },

        // 结果节点样式
        resultNodeStyle: {
            borderRadius: '100%',
        },

        // 开始节点样式
        startNodeStyle: {
            borderRadius: '20px',
        },

        // 停止节点样式
        stopNodeStyle: {
            borderRadius: '20px',
        },

        // 判断节点样式
        judgeNodeStyle: {
            shape: 'diamond',
            shapeStyle: null
        },

        // 节点上的文本样式
        nodeTextStyle: {
        },

        // 关系连接线文本样式
        relationTextStyle: {
        },

        // 是否将关系上的文本显示在连接线旁边而不是覆盖在连接线上
        showRelationTextOnSide: false,

        // 当点击节点时的回调函数 function(node, $element)
        onClickNode: null,

        // 初始数据
        data: [{
            id: 'start',
            type: 'start',
            text: 'Start',
            // className: 'text-red',
            // style: {color: 'red'}
        }, /*{
            id: 'action-example-1',
            type: 'action',
            text: '渲染图形'
        }, {
            id: 'action-example-2',
            type: 'action',
            text: '显示画面'
        }, {
            id: 'action-example-3',
            type: 'action',
            text: '额外运算'
        }, {
            id: 'action-example-4',
            type: 'stop',
            text: '完成'
        }, {
            type: 'relation',
            id: 'relation-1',
            from: 'start',
            to: 'action-example-1',
            text: '工作'
        }, {
            type: 'relation',
            id: 'relation-2',
            from: 'action-example-1',
            to: 'action-example-2',
        }, {
            type: 'relation',
            id: 'relation-3',
            from: 'action-example-2',
            to: 'action-example-4',
            text: '休息了'
        }, {
            type: 'relation',
            id: 'relation-4',
            from: 'action-example-1',
            to: 'action-example-3',
            text: '关系',
        }, {
            type: 'relation',
            id: 'relation-5',
            from: 'action-example-3',
            to: 'action-example-4',
            text: 'test',
        }, {
            type: 'relation',
            id: 'relation-6',
            from: 'action-example-2',
            to: 'action-example-3',
            text: 'test2'
        }*/],
    };

    // Extense jquery element
    $.fn.flowChart = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new FlowChart(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    FlowChart.NAME = NAME;
    FlowChart.supportElementTypes = supportElementTypes;

    $.fn.flowChart.Constructor = FlowChart;

    $.zui({
        FlowChart: FlowChart,
        FlowChartElement: FlowChartElement
    });

    // Auto call flowChart after document load complete
    $(function() {
        $('[data-ride="flowChart"]').flowChart();
    });
}(jQuery));
