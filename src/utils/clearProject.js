import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const clearProject = (directory) => {
  const gitDir = path.join(directory, ".git");
  const githubDir = path.join(directory, ".github");

  if (fs.existsSync(gitDir)) execSync(`rm -rf ${gitDir}`);
  if (fs.existsSync(githubDir)) execSync(`rm -rf ${githubDir}`);
};
