import { executeCommandList } from "src/functions";

export function installDependencies(projectName, database) {
  const databaseLib = {
    "postgresql": "@prisma/adapter-pg",
    "mysql": "@prisma/adapter-mariadb",
    "sqlite": "@prisma/adapter-libsql",
  }[database];

  const commandList = [
    `cd ${projectName} && git init`,
    `cd ${projectName} && git branch -M main`,
    `cd ${projectName} && bun install`,
    `bun add ${databaseLib}`,
  ];

  executeCommandList(commandList);
}
