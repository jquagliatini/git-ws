import { readFileSync } from 'fs';

const CONFIG_FILENAME = process.env.CONFIG_FILE || 'config.json';

export default function configFactory() {
  const configContent = JSON.parse(readFileSync(CONFIG_FILENAME).toString());

  Object.keys(configContent).forEach((k) => {
    process.env[k] = configContent[k];
  });

  return function config(key: string): any {
    return process.env[key];
  };
}
