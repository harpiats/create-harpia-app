#!/usr/bin/env bun

import { input, select } from "@inquirer/prompts";
import { GenerateApi } from "./functions/generate/api.js";
import { GenerateFullStack } from "./functions/generate/fullstack/index.js";
import { colorize } from "./utils/index.js";

function parseArgs() {
  const args = process.argv.slice(2);
  const projectName = args[0]?.[0] !== "-" ? args[0] : null;
  const flags = {
    api: args.includes("--api") || args.includes("-a"),
    fullstack: args.includes("--fullstack") || args.includes("-f"),
    tailwind: args.includes("--tailwind") || args.includes("-t"),
    alpine: args.includes("--alpine") || args.includes("-l"),
    htmx: args.includes("--htmx") || args.includes("-h"),
  };

  return { projectName, flags };
}

async function getProjectName(initialName) {
  if (initialName) return initialName;

  return await input({
    message: "Enter the project name:",
    required: true,
    validate: (value) => (value.trim() ? true : "Project name cannot be empty"),
  });
}

async function getAppMode(flags) {
  if (flags.api) return "api";
  if (flags.fullstack) return "fullstack";

  return await select({
    message: "What type of application do you want to create?",
    choices: [
      { name: "API", value: "api" },
      { name: "Full Stack", value: "fullstack" },
    ],
  });
}

async function getOptions(appMode, flags) {
  if (appMode !== "fullstack") return {};

  return {
    tailwind:
      flags.tailwind ||
      (await select({
        message: "Do you want to use Tailwind CSS?",
        choices: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
      })),
    alpine:
      flags.alpine ||
      (await select({
        message: "Do you want to use Alpine.js?",
        choices: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
      })),
    htmx:
      flags.htmx ||
      (await select({
        message: "Do you want to use HTMX?",
        choices: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
      })),
  };
}

async function main() {
  try {
    const { projectName: initialName, flags } = parseArgs();
    const projectName = await getProjectName(initialName);
    const appMode = await getAppMode(flags);
    const options = await getOptions(appMode, flags);

    if (appMode === "fullstack") {
      GenerateFullStack(projectName, appMode, options.tailwind, options.alpine, options.htmx);
    } else {
      GenerateApi(projectName, appMode);
    }

    console.log("Let's code");
    console.log(`cd ${projectName}`);
  } catch (error) {
    console.error(colorize("An error occurred during project setup. Please check the details below and try again."));
    console.error(error);
    process.exit(1);
  }
}

main();
