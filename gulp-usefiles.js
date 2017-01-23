'use strict';
const gutil = require('gulp-util');
const through = require('through2');
const path = require('path');
const File = require('vinyl');

// consts
module.exports = function(out, options) {

    options = options || {};

    const fileList = [];

    return through.obj((file, enc, cb) => {

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-usefilenames', 'Streams not supported'));
            return;
        }

        let filePath = options.flatten ? path.basename(file.path) : file.path;
        if (options.removeExtensions) {
            filePath = gutil.replaceExtension(filePath, '')
        }
        filePath = filePath.replace(/\\/g, '/');

        if(options.itemTemplate) {
            if (typeof options.itemTemplate === 'function') {
                fileList.push(options.itemTemplate(filePath));
            } else{
                fileList.push(options.itemTemplate.replace('@item@', filePath));
            }

        } else {
            fileList.push(filePath);
        }

        cb();
    }, function(cb) {
        options.separator = options.separator || '';
        const buffer = (options.template) ? new Buffer(options.template.replace('@content@', fileList.join(options.separator))) : new Buffer(fileList.join(options.separator));
        const fileListFile = new File({
            path: out,
            contents: buffer
        });

        this.push(fileListFile);
        cb();
    });
};