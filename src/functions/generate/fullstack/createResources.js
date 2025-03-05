import fs from "node:fs";
import path from "node:path";

export function createResources(projectName) {
  const projectPath = path.join(process.cwd(), projectName);
  const layoutOutputPath = path.join(projectName, "resources/layouts/default.html");
  const partialtOutputPath = path.join(projectName, "resources/partials/.gitkeep");
  const scriptsOutputPath = path.join(projectName, "resources/assets/js/scripts.js");

  fs.mkdirSync(path.join(projectPath, "resources"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "resources/layouts"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "resources/partials"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "resources/assets"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "resources/assets/js"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "public"), { recursive: true });

  const layoutPath = "src/templates/layout-default.txt";
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");

  fs.writeFileSync(layoutOutputPath, layoutContent);
  fs.writeFileSync(partialtOutputPath, "");
  fs.writeFileSync(scriptsOutputPath, "");
}
