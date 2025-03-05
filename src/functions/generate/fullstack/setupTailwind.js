import fs from "node:fs";
import path from "node:path";
import { executeCommand } from "src/utils";

export function setupTailwind(projectName) {
  // Install tailwindcss @tailwindcss/cli
  executeCommand(`cd ${projectName} && bun add tailwindcss @tailwindcss/cli`);

  // Create directory and file: resources/assets/css/tailwind.css
  const projectPath = path.join(process.cwd(), projectName);
  const tailwindOutputPath = path.join(projectName, "resources/assets/css/tailwind.css");

  fs.mkdirSync(path.join(projectPath, "resources/assets"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "resources/assets/css"), { recursive: true });

  const tailwindStylePath = "src/templates/tailwind-style.txt";
  const tailwindStyleContent = fs.readFileSync(tailwindStylePath, "utf-8");

  fs.writeFileSync(tailwindOutputPath, tailwindStyleContent);

  // Create directory and file: public/css/styles.css
  const stylesOutputPath = path.join(projectName, "public/css/styles.css");
  fs.mkdirSync(path.join(projectPath, "public/css"), { recursive: true });

  fs.writeFileSync(stylesOutputPath, "");
}
