import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export const writeEnvFile = (projectName, appMode) => {
  const outputPath = path.join(process.cwd(), projectName, ".env");
  const envFilePath = "src/templates/env.txt";
  const envContent = fs.readFileSync(envFilePath, "utf-8");
  const randomAppId = randomBytes(16).toString("hex");
  const updatedEnvContent = envContent
    .replace(/APP_ID=.*/, `APP_ID=${randomAppId}`)
    .replace(/MODE=.*/, `MODE=${appMode}`);

  fs.writeFileSync(outputPath, updatedEnvContent);
};
