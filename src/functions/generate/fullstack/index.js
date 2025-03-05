import { writeEnvFile } from "src/functions/writeEnvFile";
import { clearProject, colorize, executeCommand } from "src/utils";
import { installDependencies } from "src/utils/installDependencies";
import { createResources } from "./createResources";
import { replaceServerFile } from "./replaceServerFile";
import { setupAlpine } from "./setupAlpine";
import { setupHTMX } from "./setupHtmx";
import { setupTailwind } from "./setupTailwind";
import { templateEngineConfigFile } from "./template-engine";

export function GenerateFullStack(projectName, appMode, tailwind, alpine, htmx) {
  const command = `git clone --depth 1 https://github.com/harpia-framework/app ${projectName}`;

  console.log(colorize("green", "Preparing things, please, wait a moment."));

  executeCommand(command);
  clearProject(projectName);
  installDependencies(projectName);
  writeEnvFile(projectName, appMode);

  // Set up template engine
  templateEngineConfigFile(projectName);
  replaceServerFile(projectName);
  createResources(projectName);

  if (tailwind) {
    setupTailwind(projectName);
  }

  if (alpine) {
    setupAlpine(projectName);
  }

  if (htmx) {
    setupHTMX(projectName);
  }
}
