import { executeCommand } from "../utils/index.js";

export function generateFirstTypes(projectName) {
  executeCommand(`cd ${projectName} && bunx prisma generate`);
}