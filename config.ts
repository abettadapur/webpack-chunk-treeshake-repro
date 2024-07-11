export function getConfig(webpack?: "webpack") {
  return {
    experiments: { css: false },
    mode: "development",
    output: {
      filename: `[name].js`,
      path: "dist",
      publicPath: "/webpack/",
      hashFunction: "xxhash64",
      crossOriginLoading: "anonymous",
      asyncChunks: true,
    },
    entry: {
      main: "./src/main.ts",
    },
    target: ["web", "es2020"],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          resolve: {
            // don't require extension on imports
            fullySpecified: false,
          },
        },
        {
          test: /group\/.*\.ts$/,
          loader: require.resolve("./custom-loader"),
        },
        {
          test: /main\.ts(x?)$/,
          use: [
            webpack === "webpack"
              ? "esbuild-loader"
              : {
                  loader: "builtin:swc-loader",
                  options: {
                    jsc: {
                      parser: {
                        syntax: "typescript",
                        dynamicImport: true,
                      },
                      transform: {
                        useDefineForClassFields: false,
                        react: {
                          development: true,
                        },
                      },
                    },
                    env: {
                      targets: [
                        "Chrome >= 84",
                        "Firefox >= 79",
                        "Safari >= 16",
                        "Edge >= 84",
                      ],
                    },
                  },
                },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".css", ".svg"],
    },
    plugins: [],
    optimization: {
      runtimeChunk: "multiple",
      splitChunks: {
        chunks: "all",
        maxSize: 5,
        minSize: 1,
        cacheGroups: {
          group: {
            filename: "group-[contenthash].js",
            name: "group",
            chunks: "all",
            maxSize: 5, // Artificially set to 1 byte to force splitting
            reuseExistingChunk: true,
            test: /group\/.*\.ts/,
          },
        },
      },
    },
  };
}
