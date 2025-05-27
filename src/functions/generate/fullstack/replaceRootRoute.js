import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function replaceRootRoute(projectName) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(process.cwd(), projectName, "modules/root/root.routes.ts");

  const fullstackRootRoutePath = path.join(__dirname, "../../..", "templates/fullstack-root-route.txt");
  const newContent = fs.readFileSync(fullstackRootRoutePath, "utf-8");

  fs.writeFile(filePath, newContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing to root.routes.ts:", err);
      return;
    }
  });
}
