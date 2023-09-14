const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "pmat-org",
    projectName: "app1pink",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object

    // For Webpack Dev Server complains of multiple instances of styled-components.
    // Using webpack in production mode does not complain.
    // In any case, move styled-components (+ dependency react-is) to externals
    // and add to root-config import-map for global loading makes app bundles smaller.
    externals: ["styled-components", "react-is"],
  });
};
