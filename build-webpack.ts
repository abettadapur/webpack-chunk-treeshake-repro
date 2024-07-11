import { getConfig } from "./config";
import webpack from "webpack";
import path from "path";

async function main() {
  const configuration = getConfig("webpack");
  configuration.output.path = path.resolve(__dirname, "dist-webpack");
  const result = await new Promise((resolve, reject) =>
    webpack(configuration).run((err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    })
  );

  console.log(result.toString());
}

main();
