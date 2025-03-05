import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function templateEngineConfigFile(projectName) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const outputPath = path.join(process.cwd(), projectName, "app/config/template-engine.ts");
  const templateEnginePath = path.join(__dirname, "../../..", "templates/template-engine.txt");
  const templateEngineContent = fs.readFileSync(templateEnginePath, "utf-8");

  fs.writeFileSync(outputPath, templateEngineContent);
}
