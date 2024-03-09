let path = require('path');

module.exports = {
    mode: 'development',
    entry: './js/script.js',
    output: {
        filename: 'bungle.js',
        path: __dirname + '/js'
    },
    watch: true,

    devtool: 'source-map',

    module: {

    }
};