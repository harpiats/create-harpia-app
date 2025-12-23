import { clearProject, colorize, executeCommand } from "src/utils";
import { installDependencies } from "src/utils/installDependencies";
import { writeEnvFile } from "../writeEnvFile";
import { setupDatabase } from "../setupDatabase";
import { generateFirstTypes } from "../generateFirstTypes";

export function GenerateApi(projectName, appMode, database) {
  const command = `git clone --depth 1 https://github.com/harpiats/app ${projectName}`;

  console.log(colorize("green", "Preparing things, please, wait a moment."));

  executeCommand(command);
  clearProject(projectName);
  installDependencies(projectName, database);
  writeEnvFile(projectName, appMode, database);
  setupDatabase(projectName, database);
  generateFirstTypes(projectName);
}
