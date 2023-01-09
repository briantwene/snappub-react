const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
    // your Next.js config
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.redd.it',
            },
            {
                protocol: "https",
                hostname: "styles.redditmedia.com"
            },
            {
                protocol: "https",
                hostname: "a.thumbs.redditmedia.com"
            },
            {
                protocol: "https",
                hostname: "www.redditstatic.com"
            }
        ],
    },
});
