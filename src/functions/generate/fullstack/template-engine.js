import fs from "node:fs";
import path from "node:path";

export function templateEngineConfigFile(projectName) {
  const outputPath = path.join(process.cwd(), projectName, "app/config/template-engine.ts");
  const templateEnginePath = "src/templates/template-engine.txt";
  const templateEngineContent = fs.readFileSync(templateEnginePath, "utf-8");

  fs.writeFileSync(outputPath, templateEngineContent);
}
