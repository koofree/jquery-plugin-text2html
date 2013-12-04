/*!
 * jQuery TextToHtml Plugin
 * version: 0.1-20131204
 * @requires jQuery v1.5 or later
 * Copyright (c) 2013 Koo Lee
 * Examples and documentation at: https://kuleeblog.wordpress.com
 * Project repository: https://github.com/kool22/text2html
 * Dual licensed under the MIT and GPL licenses.
 */
(function ($) {
    $.fn.text2html = function (options) {
        options = options || {};

        return $(this).each(function () {
            // set options for current element
            var settings = $.extend({}, $.fn.text2html.defaults, {
                changer: $(this).data('changer')
            }, options);


            // references & variables that will change with each update
            var self = this,
                $self = $(this),
                originalHtml = $self.html();

            // initialize the element with the starting value
            render(originalHtml);

            function render(value) {
                var renderedHtml = value;
                for (var i = 0; i < settings.changer.length; i++) {
                    renderedHtml = settings[settings.changer[i]].call(self, renderedHtml, settings);
                }
                $self.html(renderedHtml);
            }
        });
    };

    $.fn.text2html.defaults = {
        carriage_return: carriage_return,
        tag_a: tag_a,
        changer: ['carriage_return', 'tag_a'],
        xhtml: false,
        a_target: '_blank'
    };

    function carriage_return(original, settings) {
        var breakTag = '<br />';
        if (settings.xhtml || typeof settings.xhtml == 'undefined') {
            breakTag = '<br>';
        }
        return (original + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + breakTag + "$2");
    }

    function tag_a(original, settings) {
        return (original + '').replace(/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig,
            '<a href="$1" target="' + settings.a_target + '">$1</a>');
    }

}(jQuery));
