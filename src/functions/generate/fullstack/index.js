import { writeEnvFile } from "src/functions/writeEnvFile";
import { clearProject, colorize, executeCommand } from "src/utils";
import { installDependencies } from "src/utils/installDependencies";
import { createResources } from "./createResources";
import { replaceRootRoute } from "./replaceRootRoute";
import { replaceServerFile } from "./replaceServerFile";
import { setupAlpine } from "./setupAlpine";
import { setupHTMX } from "./setupHtmx";
import { setupTailwind } from "./setupTailwind";
import { templateEngineConfigFile } from "./template-engine";

export function GenerateFullStack(projectName, appMode, tailwind, alpine, htmx) {
  const command = `git clone --depth 1 https://github.com/harpiats/app ${projectName}`;

  console.log(colorize("green", "Preparing things, please, wait a moment."));

  executeCommand(command);
  clearProject(projectName);
  installDependencies(projectName);
  writeEnvFile(projectName, appMode);
  replaceRootRoute(projectName);

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
