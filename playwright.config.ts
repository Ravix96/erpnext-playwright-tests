import 'dotenv/config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.ERPNEXT_URL,
    trace: 'on',
    screenshot: 'on',
    video: 'on',
  },
});