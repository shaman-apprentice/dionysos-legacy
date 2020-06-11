const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function(env, argv) {
  console.log("asdf---------------------------------------------------------asdf");
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.target = 'web'
  config.resolve.alias['fs'] = 'browserify-fs';

  return config;
};