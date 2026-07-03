import fs from "fs";
import path from "path";

const SRC = path.resolve("src");

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    if (!full.endsWith(".ts")) continue;

    let code = fs.readFileSync(full, "utf8");

    code = code.replace(
      /(from\s+['"])(\.{1,2}\/[^'"]+)(['"])/g,
      (_, a, p, c) => {
        if (
          p.endsWith(".js") ||
          p.endsWith(".json") ||
          p.endsWith(".node")
        ) {
          return a + p + c;
        }

        return a + p + ".js" + c;
      }
    );

    code = code.replace(
      /(import\s*\(\s*['"])(\.{1,2}\/[^'"]+)(['"]\s*\))/g,
      (_, a, p, c) => {
        if (
          p.endsWith(".js") ||
          p.endsWith(".json") ||
          p.endsWith(".node")
        ) {
          return a + p + c;
        }

        return a + p + ".js" + c;
      }
    );

    fs.writeFileSync(full, code);
  }
}

walk(SRC);

console.log("✅ Finished updating imports.");