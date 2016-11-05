var path = require('path');
var config = {
    module: {
        loaders: [
            {
                test: /\.css?$/,
                loaders: [ 'style', 'raw' ],
                include: path.resolve(__dirname, '../')
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],
    }
};

module.exports = config;
