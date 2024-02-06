import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass',
      })],
    }),
    // ElementPlus({
    //   useSource: true,
    // }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    watch: {
      usePolling: true,
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/style/element-plus/index.scss" as el;
          @use "@/style/variables.scss" as *;
          @use "@/style/style.scss" as *;
        `,
      }
    }
  },
})
