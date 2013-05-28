jquery.notMyEvent
=================

$.notMyEvent is a helper for handling global events, but ignoring ones originating inside of a jQuery collection.

The Issue
---------

This is a common pattern, used in many jQuery libraries:

```javascript
$('#elm').on('click',function($e){
    $e.stopPropagation();
    //do stuff (i.e. Open something);
});

$('html').on('click',function($e){
    //do opposite of stuff (i.e. Close something);
}
```

Unfortunately, the many `stopPropegation();`'s throughout the code all cancel each other out.
 i.e. A menu will open onclick, but onclick of a different menu the first menu will not close.

The Solution
------------

```javascript
$('#elm').on('click',function($e){
    //now there is no need for stopPropegation() because of $.notMyEvent
    //do stuff (i.e. Open something);
});


//instead of attaching the HTML handler directly.
//wrap it in $.notMyEvent
$('html').on('click',$('#elm).notMyEvent(
    function($e){
        //do stuff (i.e. Close something);
    }
));
```

The Source
----------
Download it from
https://github.com/krismeister/jQuery.notMyEvent


 The License
 -----------
 Do whatever you want.