import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue2';
import jsx from '@vitejs/plugin-vue2-jsx';

export const PLUGINS = [
  vue(),
  jsx(),
  legacy({
    targets: ['ie >= 11'],
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
  }),
];

export const ALIAS = {
  '@': fileURLToPath(new URL('./src', import.meta.url)),
};

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), ''); // 加载所有环境变量
  const isBuildMode = command === 'build'; // 构建模式

  return {
    /**
     * 环境变量注入 `window.__NODE_ENV__`
     * @see https://vitejs.dev/config/#using-environment-variables-in-config
     */
    define: {
      // 'process.env.__NODE_ENV__': JSON.stringify(env.NODE_ENV), // process.env.__NODE_ENV__
      __NODE_ENV__: JSON.stringify(env.NODE_ENV), // window.__NODE_ENV__
    },

    /**
     * 开发服务器配置
     * @see https://vitejs.dev/config/server-options.html
     */
    server: {
      host: '0.0.0.0',
      proxy: {
        '^/rover': {
          target: env.API_ENTRYPOINT || 'http://kys.test.greatld.com',
          changeOrigin: true,
          xfwd: false, // 禁止本地 node 服务器重写 x-forward-for
        },
      },
    },

    plugins: PLUGINS,

    resolve: {
      alias: ALIAS,
    },

    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: isBuildMode ? '[hash:base64:8]' : '[folder]_[local]--[hash:base64:5]',
      },
      postcss: {
        map: false,
        plugins: [],
      },
      preprocessorOptions: {
        less: {
          math: 'always',
          javascriptEnabled: true,
        },
      },
    },
  };
});
