export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'mbs-frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['ant-design-vue/dist/antd.less', '@/assets/css/app.less'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/antd-ui', '@/plugins/api', '@/plugins/notification'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'vue-currency-input/nuxt',
  ],

  // Auth module configurations
  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/dashboard',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/signin',
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: '/auth/signout',
            method: 'post',
          },
          user: {
            url: '/users/me',
            method: 'get',
            propertyName: false,
          },
        },
        tokenRequired: true,
        tokenName: 'Authorization',
        tokenType: 'Bearer',
        globalToken: true,
        autoFetchUser: true,
      },
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL, // Used as fallback if no runtime config is provided
  },

  // RuntimeConfig properties (https://nuxtjs.org/api/configuration-runtime-config#publicruntimeconfig)
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_URL_BROWSER,
    },
  },

  // RuntimeConfig properties (https://nuxtjs.org/api/configuration-runtime-config#publicruntimeconfig)
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL,
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },

  // Add global Less variables
  styleResources: {
    less: './assets/css/variables.less',
  },

  // Typescript config files
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },
}
