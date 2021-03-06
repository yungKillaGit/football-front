const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin());
      return webpackConfig;
    },
  },
  babel: {
    loaderOptions: (options) => {
      options.plugins?.push('effector-logger/babel-plugin');
      return options;
    },
  },
};
