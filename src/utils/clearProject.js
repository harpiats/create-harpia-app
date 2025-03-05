import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const clearProject = (projectName) => {
  const gitDir = path.join(process.cwd(), projectName, ".git");
  const githubDir = path.join(process.cwd(), projectName, ".github");

  if (fs.existsSync(gitDir)) execSync(`rm -rf ${gitDir}`);
  if (fs.existsSync(githubDir)) execSync(`rm -rf ${githubDir}`);
};
