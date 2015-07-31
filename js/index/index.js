/**
 * Created by Bo Huang on 7/28/15.
 */
var list = function (data) {
    this.init(data);
};

list.prototype = {
    init : function (data) {
        var i = 0;
        var outer = document.createElement("div");

        outer.id = "div-outer";
        outer.className = "div-container";

        for (; i < data.length; i++) {
            var j = 0;
            var parent = document.createElement("div");
            var item = document.createElement("div");

            item.id = "div-" + i;
            item.className = "div-item";
            item.innerHTML = data[i].title + " (" + data[i].lesson.length + ")";
            this.addClick(item);

            parent.className = "div-parent";
            parent.appendChild(item);

            for (; j < data[i].lesson.length; j++) {
                var lesson = document.createElement("div");

                lesson.id = "lesson-" + j + "-" + item.id;
                lesson.className = "lesson-item";
                lesson.innerHTML = "<a href='" + data[i].lesson[j].href + "' target='_blank'>" + (j + 1) + ") " + data[i].lesson[j].text  + "</a></br>";

                parent.appendChild(lesson);
            }

            outer.appendChild(parent);
        }

        document.body.appendChild(outer);
    },

    addClick : function (elem) {
        var self = this;

        elem.onclick = function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement;
            var current = target;
            var parent = target.parentNode;
            var index = target.className.indexOf("div-current");
            var height = target.offsetHeight + target.style.margin;
            var from = 0;
            var to = 0;

            while (current = current.nextElementSibling) {
                height = Number(height) + Number(current.offsetHeight) + Number(current.style.margin);
            }

            if (index > 0) {
                target.className = target.className.substring(0, index);
                from = height;
                to = target.offsetHeight;
            } else {
                target.className = target.className + " div-current";
                from = target.offsetHeight;
                to = height;
            }

            self.animate({
                delay : 10,
                duration : 1000,
                from : from,
                to : to,
                delta : function (progress) {
                    for (var a = 0, b = 1; 1; a += b, b /= 2) {
                        if (progress >= (7 - 4 * a) / 11) {
                            return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                        }
                    }

                    //return Math.pow(progress, 2);
                },
                apply : function (value) {
                    value = value * (this.to - this.from);
                    parent.style.height = (this.from + value) + "px";
                }
            });

            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        };
    },

    animate : function (obj) {
        var start = new Date();

        var timer = setInterval(function () {
            var passed = new Date() - start;
            var progress = passed / obj.duration;

            if (progress > 1) {
                progress = 1;
            }

            obj.apply(1 - obj.delta(1 - progress));

            if (progress === 1) {
                clearInterval(timer);
            }

        }, obj.delay);
    }
};
