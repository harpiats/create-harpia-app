import { executeCommandList } from "src/functions";

export function installDependencies(projectName) {
  const commandList = [
    `cd ${projectName} && git init`,
    `cd ${projectName} && git branch -M main`,
    `cd ${projectName} && bun install`,
  ];

  executeCommandList(commandList);
}
