// define child rescript
var path = require("path");

module.exports = function (config, env) {
  return Object.assign(
    config,
    {
      output: {
        ...config.output,
        assetModuleFilename: "static/media/[hash][ext]",
      },
    },
  );
};
