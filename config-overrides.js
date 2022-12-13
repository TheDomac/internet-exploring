module.exports = function (config, env) {
  return Object.assign(
    config,
    {
      output: {
        ...config.output,
        // "static/media/[hash][ext]" for a hashed name
        assetModuleFilename: "static/media/[name][ext]",
      },
    },
  );
};
