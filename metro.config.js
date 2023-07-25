module.exports = {
  transformer: {
    getTransformOptions: async () => {
      return {
        // Добавьте опцию enableBabelRCLookup: false, чтобы отключить Fast Refresh
        enableBabelRCLookup: false,
      };
    },
  },
};
