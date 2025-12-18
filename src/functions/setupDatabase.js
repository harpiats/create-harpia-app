import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function setupDatabase(projectName, database) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  /**
   * Setup database index file
   */
  const filePath = {
    "postgresql": path.join(__dirname, "..", "templates/database/index-postgres.txt"),
    "mysql": path.join(__dirname, "..", "templates/database/index-mysql.txt"),
    "sqlite": path.join(__dirname, "..", "templates/database/index-sqlite.txt"),
  }[database];

  const outputPath = path.join(process.cwd(), projectName, "app/database/index.ts");
  const content = fs.readFileSync(filePath, "utf-8");

  fs.writeFileSync(outputPath, content);

  /**
   * Setup schema.prisma
   */
  const schemaPath = path.join(process.cwd(), projectName, "prisma", "schema.prisma");
  const schemaContent = fs.readFileSync(schemaPath, "utf-8");
  const updatedSchemaContent = schemaContent.replace(/provider\s*=\s*".*"/, `provider = "${database}"`);

  fs.writeFileSync(schemaPath, updatedSchemaContent);
}