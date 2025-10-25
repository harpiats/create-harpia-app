import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function createResources(projectName) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const projectPath = path.join(process.cwd(), projectName);
  const layoutOutputPath = path.join(process.cwd(), projectName, "resources/layouts/default.html");
  const componentsOutputPath = path.join(process.cwd(), projectName, "resources/components/.gitkeep");
  const scriptsOutputPath = path.join(process.cwd(), projectName, "resources/assets/js/scripts.js");
  const rootPageOutputPath = path.join(process.cwd(), projectName, "modules/root/pages/home/page.html");

  fs.mkdirSync(path.join(projectPath, "resources"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "resources/layouts"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "resources/components"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "resources/assets"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "resources/assets/js"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "public"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "modules/root/pages/home"), { recursive: true });

  const layoutPath = path.join(__dirname, "../../..", "templates/layout-default.txt");
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");

  const rootPagePath = path.join(__dirname, "../../..", "templates/root-page.txt");
  const rootPageContent = fs.readFileSync(rootPagePath, "utf-8");

  fs.writeFileSync(layoutOutputPath, layoutContent);
  fs.writeFileSync(componentsOutputPath, "");
  fs.writeFileSync(scriptsOutputPath, "");
  fs.writeFileSync(rootPageOutputPath, rootPageContent);
}
