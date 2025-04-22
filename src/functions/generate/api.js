import { clearProject, colorize, executeCommand } from "src/utils";
import { installDependencies } from "src/utils/installDependencies";
import { writeEnvFile } from "../writeEnvFile";

export function GenerateApi(projectName, appMode) {
  const command = `git clone --depth 1 https://github.com/harpiats/app ${projectName}`;

  console.log(colorize("green", "Preparing things, please, wait a moment."));

  executeCommand(command);
  clearProject(projectName);
  installDependencies(projectName);
  writeEnvFile(projectName, appMode);
}
