module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/_functions.scss";
          @import "@/assets/scss/_mixins.scss";
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/default.scss";
        `
      },
    },
  },
};
