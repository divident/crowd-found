const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './app/client/index.js',
	mode: 'development',
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'app', 'server', 'public', 'js'),
		filename: 'bundle.js',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_DEBUG': JSON.stringify('true')
		}),
		new webpack.ProvidePlugin({
			Buffer: ['buffer', 'Buffer'],
		}),
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
			publicPath: '/static/js/',
		  })
	],
	resolve: {
		fallback: {
			"os": require.resolve("os-browserify/browser"),
			"https": require.resolve("https-browserify"),
			"http": require.resolve("stream-http"),
			"crypto": require.resolve("crypto-browserify"),
			"url": require.resolve("url"),
			"stream": require.resolve("stream-browserify"),
			"buffer": require.resolve("buffer")
		}
	},

	watch: true,
	module: {
		rules: [
			{
				test: /\.css$/i,
				include: [path.resolve(__dirname, 'app', 'client'), path.resolve(__dirname, 'app', 'server', 'html')],
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					'postcss-loader'
				]
			},
			{
				test: /\.js$/i,
				include: path.resolve(__dirname, 'app', 'client'),
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"]
					}
				}]
			}
		]
	}
};