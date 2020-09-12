import prompts from 'prompts';

export async function askNewVersion(currentVersion: string) {
  return (
    await prompts({
      type: 'text',
      name: 'version',
      message: `Current version is ${currentVersion}. Enter the new version:`,
    })
  ).version;
}
