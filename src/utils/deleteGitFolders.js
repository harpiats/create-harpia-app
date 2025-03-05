import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const deleteGitFolder = (projectName) => {
  const gitDirectory = path.join(process.cwd(), projectName, ".git");
  const githubDirectory = path.join(process.cwd(), projectName, ".github");

  if (fs.existsSync(gitDirectory)) execSync(`rm -rf ${gitDirectory}`);
  if (fs.existsSync(githubDirectory)) execSync(`rm -rf ${githubDirectory}`);
};
