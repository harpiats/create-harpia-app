import fs from "node:fs";
import path from "node:path";

export function replaceServerFile(projectName) {
  const filePath = path.join(process.cwd(), projectName, "start/server.ts");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const newImport = 'import { engine } from "app/config/template-engine";';
    const newConfig = "engine.configure(app, shield.instance);";
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

    // Insert static file configuration before CORS setup
    const corsIndex = lines.findIndex((line) => line.startsWith("app.cors"));
    if (corsIndex !== -1) {
      if (lines[corsIndex - 1].trim() !== "") {
        lines.splice(corsIndex, 0, "");
      }
      lines.splice(corsIndex + 1, 0, staticConfig);
    }

    // Insert configuration before route definition
    const configIndex = lines.findIndex((line) => line.startsWith("app.routes(routes);"));
    if (configIndex !== -1) {
      if (lines[configIndex - 1].trim() !== "") {
        lines.splice(configIndex, 0, "");
      }
      lines.splice(configIndex, 0, newConfig);
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
