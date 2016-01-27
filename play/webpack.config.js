/**
 * Created by fuwensong on 2016/1/24.
 */

// webpack.config.js
module.exports = {
    // entry point of our application
    entry: './public/js/common.js',
    // where to place the compiled bundle
    output: {
        path: __dirname,
        filename: './public/js/build.js'
    },
    module: {
        // `loaders` is an array of loaders to use.
        // here we are only configuring vue-loader
        loaders: [
            {
                test: /\.vue$/, // a regex for matching all files that end in `.vue`
                loader: 'vue'   // loader to use for matched files
            }
        ]
    }
}