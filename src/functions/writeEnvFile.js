import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const writeEnvFile = (projectName, appMode, database) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const outputPath = path.join(process.cwd(), projectName, ".env");
  const envFilePath = path.join(__dirname, "..", "templates/env.txt");
  const envContent = fs.readFileSync(envFilePath, "utf-8");
  const randomAppId = randomBytes(16).toString("hex");

  let updatedEnvContent = envContent
    .replace(/APP_ID=.*/, `APP_ID=${randomAppId}`)
    .replace(/MODE=.*/, `MODE=${appMode}`);

  if (database === "sqlite") {
    updatedEnvContent = updatedEnvContent.replace('# DB_URL="file:./prisma/dev.db"', 'DB_URL="file:./prisma/dev.db"');
  } else {
    updatedEnvContent = updatedEnvContent
      .replace(/#?\s?DB_PROVIDER=.*/, `DB_PROVIDER=${database}`)
      .replace(/#?\s?DB_USER=.*/, 'DB_USER=""')
      .replace(/#?\s?DB_PASS=.*/, 'DB_PASS=""')
      .replace(/#?\s?DB_PORT=.*/, 'DB_PORT=""')
      .replace(/#?\s?DB_NAME=.*/, 'DB_NAME=""')
      .replace(/#?\s?DB_HOST=.*/, 'DB_HOST=""')
      .replace(/#?\s?DB_URL=/, "DB_URL=");
  }

  fs.writeFileSync(outputPath, updatedEnvContent);
};
