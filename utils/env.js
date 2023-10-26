import fs from "fs/promises";

export async function loadCustomEnvFile(envFilePath) {
  try {
    const envVariables = {};
    const data = await fs.readFile(envFilePath, "utf8");
    data.split("\n").forEach((line) => {
      const [key, value] = line.split("=");
      if (key && value) {
        envVariables[key.trim()] = value.trim();
      }
    });
    return envVariables;
  } catch (err) {
    console.error("Error reading the environment variables file:", err);
  }
}
