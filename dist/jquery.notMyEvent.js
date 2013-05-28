(function(window, undefined) {
    'use strict';
    '$:nomunge'; // Used by YUI compressor.

    // Since jQuery really isn't required for this plugin, use `jQuery` as the
    // namespace only if it already exists, otherwise use the `Cowboy` namespace,
    // creating it if necessary.
    var $ = window.jQuery || window.Cowboy || (window.Cowboy = {});

    $.fn.notMyEvent = function(callback) {
        var $thisSelector = this;

        // The `wrapper` function will get called on every event fire.
        function wrapper($evt) {
            console.log($evt,$thisSelector);
            var isMyEvent = false;

            //now we need to see if the event originated from within the element.
            $thisSelector.each(function (i,elm){
                if($.contains(elm,$evt.target) || elm == $evt.target){
                    isMyEvent = true;
                    return false;
                }
            });

            if(!isMyEvent){
                //this wasn't my event!
                callback($evt);
            }
        }

        // Set the guid of `wrapper` function to the same of original callback, so
        // it can be removed in by $.unbind(), or $.off()
        // callback as a reference.
        if ($.guid) {
            wrapper.guid = callback.guid = callback.guid || $.guid++;
        }

        // Return the wrapper function.
        return wrapper;
    };

})(window);