import { clearProject, colorize, executeCommand } from "src/utils";
import { executeCommandList } from "../executeCommands";
import { writeEnvFile } from "../writeEnvFile";

export function GenerateApi(projectName, appMode) {
  const command = `git clone --depth 1 https://github.com/harpia-framework/app ${projectName}`;

  console.log(colorize("green", "Preparing things, please, wait a moment."));

  executeCommand(command);
  clearProject(projectName);
  writeEnvFile(projectName, appMode);
}
