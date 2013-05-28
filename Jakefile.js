
var  jake = require("jake");
var fs = require('fs');
var util = require('util');
var UglifyJS = require('uglify-js');
// JAKE.task('taskname', [ dependencies ], function(){});

/**
 * default task
 */
desc('Execute all tasks');
task('default',['minify','copy-assets'], function () {
    console.log('* All Tasks complete');
});

task('minify', function(){

    console.log('---------- minifying');

    //these are all files to minify.
    var files = ['src/jquery.notMyEvent.js'];
    var options = {};

    //parse
    var result = UglifyJS.minify(files,options);
    //console.log(result.code);

    //open file for write
    var out = fs.openSync('dist/jquery.notMyEvent.min.js', 'w+');
    fs.writeSync(out, result.code);

    console.log('minify : complete')
});

task('copy-assets',function(){

    console.log('---------- copy-assets');

    //read in the file:
    var index  = fs.readFileSync('src/index.html').toString();
    index = index.split('notMyEvent.js').join('notMyEvent.min.js');
    var out = fs.openSync('dist/index.html', 'w+');
    fs.writeSync(out, index);

    console.log('copy-assets : complete');

});
