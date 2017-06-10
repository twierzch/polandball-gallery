module.exports = function( config ) {
    config.set({
        frameworks: ['mocha', 'chai'],

        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'node_modules/whatwg-fetch/fetch.js',
            'test/*_test.js',
            'test/**/*_test.js'
        ],

        preprocessors: {
          'test/*_test.js': ['webpack'],
          'test/**/*_test.js': ['webpack']
        },

        webpack: require("./webpack.config.js"),
        webpackMiddleware: {
            stats: "errors-only"
        },

        reporters: ['progress'],

        port: 9876,
        colors: true,
        autoWatch: false,
        singleRun: false,
        browsers: ['PhantomJS']
    })
}
