import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // {
  //   path: '',
  //   name: 'doc',
  //   meta: {
  //     title: '文档',
  //     href: 'https://lison16.github.io/iview-admin-doc/#/',
  //     icon: 'ios-book'
  //   }
  // },
  {
    path: '/manager',
    name: 'manager',
    meta: {
      icon: 'md-menu',
      title: '管理员列表'
    },
    component: Main,
    children: [
      {
        path: 'managerlist',
        name: 'manager_list',
        meta: {
          icon: 'md-funnel',
          title: '管理员列表'
        },
        component: () => import('@/view/manager-group/manager-list.vue')
      }
    ]
  },
  {
    path: '/access',
    name: 'access',
    meta: {
      icon: 'md-menu',
      title: '权限管理'
    },
    component: Main,
    children: [
      {
        path: 'rolelist',
        name: 'role_list',
        meta: {
          icon: 'md-funnel',
          title: '角色列表'
        },
        component: () => import('@/view/access-group/role-list.vue')
      },
      {
        path: 'resourcelist',
        name: 'resource_list',
        meta: {
          icon: 'md-funnel',
          title: '资源列表'
        },
        component: () => import('@/view/access-group/resource-list.vue')
      }
    ]
  },
  {
    path: '/articlemanage',
    name: 'articlemanage',
    meta: {
      icon: 'md-menu',
      title: '笔记管理'
    },
    component: Main,
    children: [
      {
        path: 'editor',
        name: 'editor',
        meta: {
          icon: 'md-funnel',
          title: '富文本编辑器'
        },
        component: () => import('@/view/article-group/createArticle.vue')
      },
      {
        path: 'articlelist',
        name: 'articlelist',
        meta: {
          icon: 'md-funnel',
          title: '笔记列表'
        },
        component: () => import('@/view/article-group/article-list.vue')
      },
      {
        path: 'editorArticle',
        name: 'editorArticle',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '编辑文章'
        },
        component: () => import('@/view/article-group/editorArticle.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/test.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          // access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: false,
          title: '6级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
