import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  framework: {
    name: getAbsolutePath('@storybook/angular'),
    options: {},
  },
  docs: {
    //defaultName: 'Documentation',
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// See https://storybook.js.org/docs/builders/webpack#extending-storybooks-webpack-config

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
