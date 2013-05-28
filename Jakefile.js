
var jake = require("jake");
var fs = require('fs-extra');
var util = require('util');
var UglifyJS = require('uglify-js');
var lint = require('jake-jshint');


/**
 * default task
 */
desc('Execute all tasks');
task('default',['lint','minify','copy-assets'], function () {
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

});

desc("Copy the assets");
task('copy-assets',function(){

    console.log('---------- copy-assets');
    fs.copy('src/', 'dist/', function(err){
        if (err) {
            fail(console.error(err));
        }
        else {
            console.log("success!")
        }
    }); //copies file




    //read in the file:
    var index  = fs.readFileSync('dist/index.html').toString();
    index = index.split('notMyEvent.js').join('notMyEvent.min.js');
    var out = fs.openSync('dist/index.html', 'w+');
    fs.writeSync(out, index);


});

desc("Lint the code");
task("lint", [], function() {

    console.log('---------- lint the code');
    var files = new jake.FileList();
    files.include("src/*.js");

    var options = {
        node: true
    };

    var globals = {
        describe: false
    };

    var pass = lint.validateFileList(files.toArray(), options, globals);
    if (!pass) fail("Lint failed");
});
