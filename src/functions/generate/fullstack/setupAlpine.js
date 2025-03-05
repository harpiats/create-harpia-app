import fs from "node:fs";
import path from "node:path";
import { executeCommand } from "src/utils";

export function setupAlpine(projectName) {
  // Install o alpinejs
  executeCommand(`cd ${projectName} && bun add alpinejs`);

  // Initialize Alpine in resources/assets/js/scripts.js
  const scriptsPath = path.join(process.cwd(), projectName, "resources/assets/js/scripts.js");
  const alpinePath = path.join(process.cwd(), "src/templates/alpine.txt");

  fs.readFile(alpinePath, "utf-8", (err, alpineContent) => {
    if (err) {
      console.error("Error reading alpine template:", err);
      return;
    }

    fs.readFile(scriptsPath, "utf-8", (err, scriptsContent) => {
      if (err && err.code !== "ENOENT") {
        console.error("Error reading scripts.js:", err);
        return;
      }

      // If scripts.js doesn't exist, create it with Alpine content
      if (err && err.code === "ENOENT") {
        fs.writeFile(scriptsPath, alpineContent, "utf-8", (err) => {
          if (err) {
            console.error("Error creating scripts.js:", err);
            return;
          }
          console.log("scripts.js created and Alpine.js initialized!");
        });
        return;
      }

      // If scripts.js exists, ensure Alpine import is at the top
      const hasAlpineImport = scriptsContent.includes('import Alpine from "alpinejs";');
      if (!hasAlpineImport) {
        const newContent = `${alpineContent}\n${scriptsContent}`;
        fs.writeFile(scriptsPath, newContent, "utf-8", (err) => {
          if (err) {
            console.error("Error updating scripts.js:", err);
            return;
          }
        });
      }
    });
  });
}
