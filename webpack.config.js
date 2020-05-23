module.exports = {
  entry: "./src/index.js",
  output: {
    path: `${__dirname}/public`,
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|jpg|gif)$/, loader: "url-loader" },
    ],
  },
};
