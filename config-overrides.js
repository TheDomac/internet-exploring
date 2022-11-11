module.exports = function (config, env) {
  return Object.assign(
    config,
    { target: 'electron-renderer' },
    {
      output: {
        ...config.output,
        assetModuleFilename: "static/media/[hash][ext]",
      },
    },
  );
};
