const { withPlaiceholder } = require("@plaiceholder/next");
const path = require('path');

module.exports = withPlaiceholder({
  // your Next.js config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.redd.it',
      },
      {
        protocol: 'https',
        hostname: 'styles.redditmedia.com',
      },
      {
        protocol: 'https',
        hostname: 'a.thumbs.redditmedia.com',
      },
      {
        protocol: 'https',
        hostname: 'www.redditstatic.com',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
});
