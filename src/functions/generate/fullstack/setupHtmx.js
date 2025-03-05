import fs from "node:fs";
import path from "node:path";
import { executeCommand } from "src/utils";

export function setupHTMX(projectName) {
  // Install o HTMX
  executeCommand(`cd ${projectName} && bun add htmx.org`);

  // Initialize HTMX in resources/assets/js/scripts.js
  const scriptsPath = path.join(process.cwd(), projectName, "resources/assets/js/scripts.js");
  const htmxPath = path.join(process.cwd(), "src/templates/htmx.txt");

  fs.readFile(htmxPath, "utf-8", (err, htmxContent) => {
    if (err) {
      console.error("Error reading HTMX template:", err);
      return;
    }

    fs.readFile(scriptsPath, "utf-8", (err, scriptsContent) => {
      if (err && err.code !== "ENOENT") {
        console.error("Error reading scripts.js:", err);
        return;
      }

      // If scripts.js doesn't exist, create it with HTMX content
      if (err && err.code === "ENOENT") {
        fs.writeFile(scriptsPath, htmxContent, "utf-8", (err) => {
          if (err) {
            console.error("Error creating scripts.js:", err);
            return;
          }
        });

        return;
      }

      // If scripts.js exists, ensure HTMX import is at the top
      const hasHTMXImport = scriptsContent.includes('import "htmx.org";');

      if (!hasHTMXImport) {
        const newContent = `${htmxContent}\n${scriptsContent}`;

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
