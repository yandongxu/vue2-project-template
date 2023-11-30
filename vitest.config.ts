import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

// https://vitest.dev/config/
export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        root: fileURLToPath(new URL('./', import.meta.url)),
        reporters: ['default', 'html'],
        outputFile: {
          html: 'test-report/unit/html/index.html',
        },
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'e2e/*'],

        coverage: {
          enabled: true,
          reportsDirectory: 'test-report/unit/coverage',
          provider: 'v8',
          reporter: ['text', 'json', 'html'],
        },
      },
    })
  )
);
