import { getConfig } from "./config";
import rspack from "@rspack/core";

async function main() {
  const configuration = getConfig();
  const result = await new Promise((resolve, reject) =>
    rspack(configuration).run((err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    })
  );

  console.log(result.toString());
}

main();
