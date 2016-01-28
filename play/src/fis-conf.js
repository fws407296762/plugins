fis.config.merge({
    settings : {
        postprocessor : {
          autoprefixer : {
              // detail config (https://github.com/postcss/autoprefixer#browsers)
              "browsers": ["Android >= 2.3", "ChromeAndroid > 1%", "iOS >= 4"],
              "cascade": true
            }
        }
    }
});
fis.match('/css/ui/ui.scss',{
	parser:fis.plugin('sass2'),
    packTo:"/public/css/ui.css",
	rExt:'.css',
	useHash:false,
	postprocessor:fis.plugin('autoprefixer'),
	optimizer:fis.plugin('clean-css')
});
fis.match('/css/*.{css,scss}',{
    parser:fis.plugin('sass2'),
    release:"/public/css/$0",
    rExt:'.css',
    useHash:false,
    postprocessor:fis.plugin('autoprefixer'),
    optimizer:fis.plugin('clean-css')
});

fis.match('{*,**/*}.js',{
    release:"/public/$0"
});
fis.match('font/*',{
    release:"/public/$0",
    url:"$0"
});

fis.match('images/*',{
    release:"/public/$0"
});