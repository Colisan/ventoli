import nodeExternals from 'webpack-node-externals';

module.exports = {
  configureWebpack: {
    externals: [
      nodeExternals({
        modulesDir: path.resolve(__dirname, '../node_modules'),
      }),
    ],
  },
};
