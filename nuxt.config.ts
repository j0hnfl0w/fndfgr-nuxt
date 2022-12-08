import functions from './sockets/index';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  extends: ['@lenslayers/nuxt-test'],
  serverHandlers: [
    {
      route: '/ws',
      handler: '~/server/middleware/sockets',
    },
  ],
});
