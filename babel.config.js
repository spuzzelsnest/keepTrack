module.exports = function (api) {
  api.cache(true);

  const presets = [ 
    "@babel/preset-env" ];
  const plugins = [ 
    "@babel/plugin-proposal-export-default-from"];

  return {
    presets,
    plugins
  };
}