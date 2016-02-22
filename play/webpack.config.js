/**
 * Created by fuwensong on 2016/1/24.
 */

// webpack.config.js
module.exports = {
    // entry point of our application
    entry: {
        common:'./public/js/common.js'
    },
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
            },
            {
                // use babel-loader for *.js files
                test: /\.js$/,
                loader: 'babel',
                // important: exclude files in node_modules
                // otherwise it's going to be really slow!
                exclude: /node_modules/
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
}