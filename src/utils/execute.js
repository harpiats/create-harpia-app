import { execSync } from "node:child_process";

export const executeCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (error) {
    console.log(`Failed to execute ${command}`, error);
    return false;
  }

  return true;
};
