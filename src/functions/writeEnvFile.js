import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const writeEnvFile = (projectName, appMode) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const outputPath = path.join(process.cwd(), projectName, ".env");
  const envFilePath = path.join(__dirname, "..", "templates/env.txt");
  const envContent = fs.readFileSync(envFilePath, "utf-8");
  const randomAppId = randomBytes(16).toString("hex");
  const updatedEnvContent = envContent
    .replace(/APP_ID=.*/, `APP_ID=${randomAppId}`)
    .replace(/MODE=.*/, `MODE=${appMode}`);

  fs.writeFileSync(outputPath, updatedEnvContent);
};
