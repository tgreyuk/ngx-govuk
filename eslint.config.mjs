// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import prettier from 'eslint-config-prettier';

export default defineConfig(
  {
    ignores: ['dist/', 'out-tsc/', 'coverage/', '.angular/', 'tmp/'],
  },

  // TypeScript, shared by every project
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/prefer-standalone': 'off',
    },
  },

  // Templates, shared by every project
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended],
  },

  // Library: ngx-govuk
  {
    files: ['projects/ngx-govuk/**/*.ts'],
    rules: {
      '@angular-eslint/component-class-suffix': ['error', { suffixes: [''] }],
      '@angular-eslint/directive-class-suffix': ['error', { suffixes: [''] }],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'ngxGovuk', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'ngx-govuk', style: 'kebab-case' },
      ],
    },
  },

  // Demo app
  {
    files: ['projects/website/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'ngxGovuk', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: ['ngx-govuk', 'app'], style: 'kebab-case' },
      ],
    },
  },

  // Turn off rules that conflict with Prettier (must be last)
  prettier,
);
