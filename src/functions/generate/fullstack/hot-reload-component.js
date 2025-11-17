import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function hotReloadComponentFile(projectName) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const outputPath = path.join(process.cwd(), projectName, "resources/components/hot-reload.html");
  const filePath = path.join(__dirname, "../../..", "templates/hot-reload-component.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  fs.writeFileSync(outputPath, fileContent);
}
