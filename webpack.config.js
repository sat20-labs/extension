const webpackMerge = require('webpack-merge');
const commonConfig = require('./build/webpack.common.config');
const configs = {
  dev: require('./build/webpack.dev.config'),
  pro: require('./build/webpack.pro.config'),
  debug: require('./build/webpack.debug.config')
};

const config = (env) => {
  if (env.config == 'dev') {
    process.env.NODE_ENV = 'development';
    process.env.BABEL_ENV = 'development';
    process.env.SHOW_KEEPER_ALIVE_LOG = false;
  } else {
    process.env.NODE_ENV = 'production';
    process.env.BABEL_ENV = 'production';
    process.env.TAILWIND_MODE = 'watch';
    process.env.SHOW_KEEPER_ALIVE_LOG = true;
  }

  if (env.config) {
    return webpackMerge.merge(commonConfig(env), configs[env.config]);
  }

  return commonConfig(env);
};

module.exports = config;
