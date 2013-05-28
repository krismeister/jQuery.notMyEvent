//
//    jquery.notMyEvent
//    =================
//
//    $.notMyEvent is a helper for handling global events, but ignoring ones originating inside of a current selector.
//
//    The Issue
//    ---------
//
//    This is a common pattern, used in many jQuery libraries:
//
//    $('#elm').on('click',function($e){
//        $e.stopPropagation();
//        //do stuff (i.e. Open something);
//    });
//
//    $('html').on('click',function($e){
//        //do opposite of stuff (i.e. Close something);
//    }
//
//
//    Unfortunately, the many `stopPropegation();`'s throughout the code all cancel each other out.
//    i.e. A menu will open onclick, but onclick of a different menu the first menu will not close.
//
//    The Solution
//    ------------
//
//
//    $('#elm').on('click',function($e){
//        //now there is no need for stopPropegation() because of $.notMyEvent
//        //do stuff (i.e. Open something);
//    });
//
//
//    //instead of attaching the HTML handler directly.
//    //wrap it in $.notMyEvent
//    $('html').on('click',$('#elm').notMyEvent(
//    function($e){
//        //do stuff (i.e. Close something);
//    }
//    ));
//
//
//    The Source
//    ----------
//    Download it from
//    https://github.com/krismeister/jQuery.notMyEvent
//
//
//    The License
//    -----------
//    Do whatever you want.



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