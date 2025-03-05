#!/usr/bin/env bun

import { input, select } from "@inquirer/prompts";
import { GenerateApi } from "./functions/generate/api.js";
import { GenerateFullStack } from "./functions/generate/fullstack/index.js";
import { colorize } from "./utils/index.js";

try {
  const projectName = await input({ message: "Enter the project name:", required: true });
  const appMode = await select({
    message: "What type of application do you want to create?",
    choices: [
      { name: "API", value: "api" },
      { name: "Full Stack", value: "fullstack" },
    ],
  });

  if (appMode === "fullstack") {
    const tailwind = await select({
      message: "Do you want to use Tailwind CSS?",
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
    });

    const alpine = await select({
      message: "Do you want to use Alpine.js?",
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
    });

    const htmx = await select({
      message: "Do you want to use HTMX?",
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
    });

    GenerateFullStack(projectName, appMode, tailwind, alpine, htmx);
  } else {
    GenerateApi(projectName, appMode);
  }

  console.log("Let's code");
  console.log(`cd ${projectName}`);
} catch (error) {
  const message = colorize("An error occurred during project setup. Please check the details below and try again.");

  console.error(message);
  console.error(error);
}
