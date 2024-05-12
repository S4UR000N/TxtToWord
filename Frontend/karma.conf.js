module.exports = function(config) {
    config.set({
        frameworks: ['mocha'], 
        files: ['test/**/*.spec.js'], 
        preprocessors: {
            'test/**/*.spec.js': ['webpack']
        },
        webpack: {
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ]
            }
        },
        reporters: ['progress'], 
        browsers: ['Chrome'], 
        singleRun: true 
    });
};
