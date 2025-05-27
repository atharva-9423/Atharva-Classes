import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // IMPORTANT: Change 'Atharva-classes' to your GitHub repository name
  // Format: '/your-repo-name/'
  base: '/Atharva-classes/',
  plugins: [],
  server: {
    host: '0.0.0.0',
    hmr: true, // Change this line to false disable auto-refreshing.
  }
})
