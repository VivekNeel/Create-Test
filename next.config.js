// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
// pass the modules you would like to see transpiled
module.exports = withBundleAnalyzer();
