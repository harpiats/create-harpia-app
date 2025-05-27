import fs from "node:fs";
import path from "node:path";

export function replaceServerFile(projectName) {
  const filePath = path.join(process.cwd(), projectName, "start/server.ts");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const newImport = 'import { html } from "app/config/template-engine";';
    const newConfig = "html.configure(app);";
    const staticConfig = 'app.static("public");';

    const lines = data.split("\n");

    // Insert import before middleware imports
    const importIndex = lines.findIndex((line) => line.startsWith("import { monitor }"));
    if (importIndex !== -1) {
      if (lines[importIndex - 1].trim() !== "") {
        lines.splice(importIndex, 0, "");
      }
      lines.splice(importIndex, 0, newImport);
    }

    // Insert configuration after app initialization
    const configIndex = lines.findIndex((line) => line.startsWith("export const app"));
    if (configIndex !== -1) {
      if (lines[configIndex + 1].trim() !== "") {
        lines.splice(configIndex + 1, 0, "");
      }
      lines.splice(configIndex + 1, 0, newConfig);
    }

    // Insert static file configuration before CORS setup
    const corsIndex = lines.findIndex((line) => line.startsWith("app.cors"));
    if (corsIndex !== -1) {
      if (lines[corsIndex - 1].trim() !== "") {
        lines.splice(corsIndex, 0, "");
      }
      lines.splice(corsIndex + 1, 0, staticConfig);
    }

    // Preserve formatting
    const formattedCode = lines.join("\n").replace(/\n{3,}/g, "\n\n");

    fs.writeFile(filePath, formattedCode, "utf8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
      console.log("File updated successfully!");
    });
  });
}
