const path = require('path');
const vueSrc = './src';

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.join(__dirname, vueSrc),
			},
		},
	},
	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].title = 'Castel Ventoli';
			return args;
		});
	},
	devServer: {
		public: 'ventoli.local:8080',
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/_variables.scss"`,
			},
			scss: {
				prependData: `@import "@/_variables.scss";`,
			},
		},
	},
	pwa: {
		name: 'Castel Ventoli',
		themeColor: '#9cdb43',
		msTileColor: '#141013',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black',
		iconPaths: {
			favicon32: 'ventoli.gif',
			favicon16: 'ventoli.gif',
			appleTouchIcon: 'ventoli.gif',
			maskIcon: 'ventoli.gif',
			msTileImage: 'ventoli.gif',
		},
	},
};
