const path = require('path')
module.exports = {
  mode: "production",
  devtool: false,
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/webpack/",
    asyncChunks: false
  },
  entry: {
    main: process.env.REEXPORT ? "./src_works/main.ts" : "./src/main.ts",
  },
  target: ["web", "es2020"],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [{
          loader: "esbuild-loader",
          options: {
            target: ['chrome84', 'firefox79', 'safari15', 'edge84']
          }
        }],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".svg"],
  },
  optimization: {
    usedExports: true
  },
};
