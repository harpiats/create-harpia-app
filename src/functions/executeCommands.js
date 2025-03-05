import { executeCommand } from "../utils/index.js";

export const executeCommandList = (commands) => {
  for (const command of commands) {
    const result = executeCommand(command);

    if (!result) {
      process.exit();
    }
  }
};
