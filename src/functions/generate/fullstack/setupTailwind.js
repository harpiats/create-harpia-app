import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { executeCommand } from "src/utils";

export function setupTailwind(projectName) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Install tailwindcss @tailwindcss/cli
  executeCommand(`cd ${projectName} && bun add tailwindcss @tailwindcss/cli`);

  // Create directory and file: resources/assets/css/tailwind.css
  const projectPath = path.join(process.cwd(), projectName);
  const tailwindOutputPath = path.join(process.cwd(), projectName, "resources/assets/css/tailwind.css");

  fs.mkdirSync(path.join(projectPath, "resources/assets"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "resources/assets/css"), { recursive: true });

  const tailwindStylePath = path.join(__dirname, "../../..", "templates/tailwind-style.txt");
  const tailwindStyleContent = fs.readFileSync(tailwindStylePath, "utf-8");

  fs.writeFileSync(tailwindOutputPath, tailwindStyleContent);

  // Create directory and file: public/css/styles.css
  const stylesOutputPath = path.join(process.cwd(), projectName, "public/css/styles.css");
  fs.mkdirSync(path.join(projectPath, "public/css"), { recursive: true });

  fs.writeFileSync(stylesOutputPath, "");
}
