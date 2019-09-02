const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')

module.exports = withCss(
  withSass({
    sassLoaderOptions: {
      data: `
        @import "./styles/util/vars";
        @import "./styles/util/mixins";
      `
    }
  })
)