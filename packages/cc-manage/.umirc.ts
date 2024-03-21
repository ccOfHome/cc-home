import { defineConfig } from "umi";

export default defineConfig({
  title: 'cc',
  history: {
    type: 'browser'
  },
  npmClient: "pnpm",
  apiRoute: {
    platform: 'vercel',
  },
  codeSplitting: {
    jsStrategy: 'granularChunks'
  },
  routes: [
    {
      path: '/',
      breadcrumbName: 'Home',
      routes: [
        {
          path: '/',
          redirect: '/login',
        },
        {
          path: '/login',
          component: '@/pages/login/index',
          breadcrumbName: '登录',
        },
        {
          path: '/manage',
          component: '@/pages/index',
          breadcrumbName: '管理',
          routes: [
            {
              path: '/manage',
              redirect: '/manage/blog',
            },
            {
              path: '/manage/blog',
              breadcrumbName: '博客',
              routes: [
                {
                  path: '/manage/blog',
                  redirect: '/manage/blog/article',
                },
                {
                  path: '/manage/blog/article',
                  component: '@/pages/article/index',
                  breadcrumbName: '文章管理',
                  routes: [
                    {
                      path: '/manage/blog/article',
                      redirect: '/manage/blog/article/list',
                    },
                    {
                      path: '/manage/blog/article/list',
                      component: '@/pages/article/list/index',
                      breadcrumbName: '文章列表',
                    },
                    {
                      path: '/manage/blog/article/add',
                      component: '@/pages/article/form/index',
                      breadcrumbName: '添加文章',
                    },
                    {
                      path: '/manage/blog/article/edit',
                      component: '@/pages/article/form/index',
                      breadcrumbName: '编辑文章',
                    }
                  ],
                },
                {
                  path: '/manage/blog/info',
                  component: '@/pages/info/index',
                  breadcrumbName: '信息管理',
                  routes: [
                    {
                      path: '/manage/blog/info',
                      redirect: '/manage/blog/info/list',
                    },
                    {
                      path: '/manage/blog/info/list',
                      component: '@/pages/info/list/index',
                      breadcrumbName: '文章列表',
                    },
                    {
                      path: '/manage/blog/info/add',
                      component: '@/pages/info/form/index',
                      breadcrumbName: '添加文章',
                    },
                    {
                      path: '/manage/blog/info/edit',
                      component: '@/pages/info/form/index',
                      breadcrumbName: '编辑文章',
                    }
                  ],
                },
                {
                  path: '/manage/blog/user',
                  component: '@/pages/user/index',
                  breadcrumbName: '用户管理',
                  routes: [
                    {
                      path: '/manage/blog/user',
                      redirect: '/manage/blog/user/list',
                    },
                    {
                      path: '/manage/blog/user/list',
                      component: '@/pages/user/list/index',
                      breadcrumbName: '文章列表',
                    },
                    {
                      path: '/manage/blog/user/add',
                      component: '@/pages/user/form/index',
                      breadcrumbName: '添加文章',
                    },
                    {
                      path: '/manage/blog/user/edit',
                      component: '@/pages/user/form/index',
                      breadcrumbName: '编辑文章',
                    }
                  ],
                },
              ],
            }
          ],
        },
      ],
    },
    { path: '/*', component: '@/pages/404' },
  ],
  // tailwindcss: {},
  antd: {
    // configProvider: {},
    // dark: true,
    // compact: true,
    // import: true,
    // style: 'less',
    theme: {
      token: {
        // colorPrimary: '#00b96b',
      },
    },
  },
  // icons: {
  //   autoInstall: {},
  // },
  plugins: [
    '@umijs/plugins/dist/tailwindcss',
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/request',
  ],
  fastRefresh: true,
  lessLoader: {
    modifyVars: {
      themeColor: 'rgba(0, 21, 41, 1)'
    }
  },
  request: {
    dataField: ''
  },
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:7001',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
});
