export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;

  children?: NavigationItem[];
}
export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: '',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'clientdashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/clientdashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'user',
        title: 'User',
        type: 'item',
        url: '/user',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'users',
        title: 'User',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'adduser',
                    title: 'Add User',
                    type: 'item',
                    url: '/user/add'
                  },
                
                  {
                    id: 'edituser',
                    title: 'Edit User',
                    type: 'item',
                    url: '/user/edit'
                  },
                  {
                    id: 'userlist',
                    title: 'List',
                    type: 'item',
                    url: '/user/list'
                  },
                
                ]

      },


       {
        id: 'profile',
        title: 'User profile',
        type: 'item',
        url: '/profile',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'clients',
        title: 'Clients',
        type: 'item',
        url: '/clients',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'changepassword',
        title: 'Change Password',
        type: 'item',
        url: '/changepasword',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'clients',
        title: 'Clients',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'addclient',
                    title: 'Add Client',
                    type: 'item',
                    url: '/clients/add'
                  },
                  {
                    id: 'editclient',
                    title: 'Edit Client',
                    type: 'item',
                    url: '/clients/edit'
                  },
                  {
                    id: 'badges',
                    title: 'List',
                    type: 'item',
                    url: '/clients/list'
                  }]

      },
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: '/clientuser',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: '/users',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'users',
        title: 'Users',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'adduser',
                    title: 'Add User',
                    type: 'item',
                    url: '/clientuser/add'
                  },
                
                  {
                    id: 'edituser',
                    title: 'Edit User',
                    type: 'item',
                    url: '/clientuser/edit'
                  },
                  {
                    id: 'userlist',
                    title: 'List',
                    type: 'item',
                    url: '/clientuser/list'
                  }
                    ]
                  }
                ]

      },
      {
        id: 'roles',
        title: 'Roles',
        type: 'item',
        url: '/roles',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'roles',
        title: 'Roles',
        type: 'item',
        url: '/clientroles',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'roles',
        title: 'Roles',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'addroles',
                    title: 'Add Roles',
                    type: 'item',
                    url: '/clientroles/add'
                  },
                
                  {
                    id: 'editroles',
                    title: 'Edit Roles',
                    type: 'item',
                    url: '/clientroles/edit'
                  },
                  {
                    id: 'rooleslist',
                    title: 'List',
                    type: 'item',
                    url: '/clientroles/list'
                  }
                    ]
                 

      },

    {
        id: 'plant',
        title: 'Plant',
        type: 'item',
        url: '/plant',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'plant',
        title: 'Plant',
        type: 'item',
        url: '/clientplant',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'Plant',
        title: 'Plant',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'adduser',
                    title: 'Add Plant',
                    type: 'item',
                    url: '/clientplant/add'
                  },
                
                  {
                    id: 'edituser',
                    title: 'Edit Plant',
                    type: 'item',
                    url: '/clientplant/edit'
                  },
                  {
                    id: 'userlist',
                    title: 'List',
                    type: 'item',
                    url: '/clientplant/list'
                  },
                
                ]

      },
      {
        id: 'area',
        title: 'Area',
        type: 'item',
        url: '/area',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'area',
        title: 'Area',
        type: 'item',
        url: '/clientarea',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'Area',
        title: 'Area',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'adduser',
                    title: 'Add Area',
                    type: 'item',
                    url: '/clientarea/add'
                  },
                
                  {
                    id: 'edituser',
                    title: 'Edit Area',
                    type: 'item',
                    url: '/clientarea/edit'
                  },
                  {
                    id: 'userlist',
                    title: 'List',
                    type: 'item',
                    url: '/clientarea/list'
                  },
                
                ]

      },
      {
        id: 'plant',
        title: 'Plant',
        type: 'item',
        url: '/plant',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'plant',
        title: 'Plant',
        type: 'item',
        url: '/clientplant',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'Plant',
        title: 'Plant',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'adduser',
                    title: 'Add Plant',
                    type: 'item',
                    url: '/clientplant/add'
                  },
                
                  {
                    id: 'edituser',
                    title: 'Edit Plant',
                    type: 'item',
                    url: '/clientplant/edit'
                  },
                  {
                    id: 'userlist',
                    title: 'List',
                    type: 'item',
                    url: '/clientplant/list'
                  },
                
                ]

      },
      {
        id: 'Unit',
        title: 'Unit',
        type: 'item',
        url: '/clientunit',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'Unit',
        title: 'Unit',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'addUnit',
                    title: 'Add Unit',
                    type: 'item',
                    url: '/clientunit/add'
                  },
                
                  {
                    id: 'editUnit',
                    title: 'Edit Unit',
                    type: 'item',
                    url: '/clientunit/edit'
                  },
                  {
                    id: 'hnitlist',
                    title: 'List',
                    type: 'item',
                    url: '/clientunit/list'
                  },
                
                ]

      },
      {
        id: 'System',
        title: 'System',
        type: 'item',
        url: '/clientSystem',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'System',
        title: 'System',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'addSystem',
                    title: 'Add System',
                    type: 'item',
                    url: '/clientSystem/add'
                  },
                
                  {
                    id: 'editSystem',
                    title: 'Edit System',
                    type: 'item',
                    url: '/clientSystem/edit'
                  },
                  {
                    id: 'hnitlist',
                    title: 'List',
                    type: 'item',
                    url: '/clientSystem/list'
                  },
                
                ]

      },
      {
        id: 'logd',
        title: 'Logs',
        type: 'item',
        url: '/clientlogs',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'logd',
        title: 'Logs',
        type: 'item',
        url: '/logs',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'logs',
        title: 'Logs',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'addSystem',
                    title: 'List',
                    type: 'item',
                    url: '/clientlogs/list'
                  }]
        },

        {
          id: 'Circuit',
          title: 'Circuit',
          type: 'item',
          url: '/clientcircuit',
          icon: 'feather icon-user',
          classes: 'nav-item'
        },
        {
          id: 'Circuit',
          title: 'Circuit',
          type: 'collapse',
            url: '/clientcircuit',
          icon: 'feather icon-users',
          classes: 'nav-item',
          children: [
                    {
                      id: 'addCircuit',
                      title: 'Add Circuit',
                      type: 'item',
                      url: '/clientcircuit/add'
                    },
                  
                    {
                      id: 'editCircuit',
                      title: 'Edit Circuit',
                      type: 'item',
                      url: '/clientcircuit/edit'
                    },
                    {
                      id: 'hnitlist',
                      title: 'List',
                      type: 'item',
                      url: '/clientcircuit/list'
                    },
                  
                  ]
  
        },

         {
          id: 'CorrosionLoop',
          title: 'CorrosionLoop',
          type: 'item',
          url: '/clientcorrosionloop',
          icon: 'feather icon-user',
          classes: 'nav-item'
        },
        {
          id: 'CorrosionLoop',
          title: 'CorrosionLoop',
          type: 'collapse',
            url: '/clientcorrosionloop',
          icon: 'feather icon-users',
          classes: 'nav-item',
          children: [
                    {
                      id: 'addCorrosionLoop',
                      title: 'Add CorrosionLoop',
                      type: 'item',
                      url: '/clientcorrosionloop/add'
                    },
                  
                    {
                      id: 'editCorrosionLoop',
                      title: 'Edit CorrosionLoop',
                      type: 'item',
                      url: '/clientcorrosionloop/edit'
                    },
                    {
                      id: 'hnitlist',
                      title: 'List',
                      type: 'item',
                      url: '/clientcorrosionloop/list'
                    },
                  
                  ]
  
        },
      {
        id: 'System',
        title: 'System',
        type: 'item',
        url: '/clientsystem',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
       {
        id: 'Import',
        title: 'Import',
        type: 'item',
        url: '/clientimport',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'System',
        title: 'System',
        type: 'collapse',
         url: '/clientsystem',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'addSystem',
                    title: 'Add System',
                    type: 'item',
                    url: '/clientsystem/add'
                  },
                
                  {
                    id: 'editSystem',
                    title: 'Edit System',
                    type: 'item',
                    url: '/clientsystem/edit'
                  },
                  {
                    id: 'hnitlist',
                    title: 'List',
                    type: 'item',
                    url: '/clientsystem/list'
                  },
                
                ]

      },
      
      {
        id: 'Equipment',
        title: 'Equipment',
        type: 'item',
        url: '/clientequipment',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'Equipment',
        title: 'Equipment',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'addEquipment',
                    title: 'Add Equipment',
                    type: 'item',
                    url: '/clientequipment/add'
                  },
                
                  {
                    id: 'editEquipment',
                    title: 'Edit Equipment',
                    type: 'item',
                    url: '/clientequipment/edit'
                  },
                  {
                    id: 'hnitlist',
                    title: 'List',
                    type: 'item',
                    url: '/clientequipment/list'
                  },
                
                ]

      },
      {
        id: 'Component',
        title: 'Component',
        type: 'item',
        url: '/clientcomponent',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'Component',
        title: 'Component',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'addEquipment',
                    title: 'Add Component',
                    type: 'item',
                    url: '/clientcomponent/add'
                  },
                
                  {
                    id: 'editComponent',
                    title: 'Edit Component',
                    type: 'item',
                    url: '/clientcomponent/edit'
                  },
                  {
                    id: 'hnitlist',
                    title: 'List',
                    type: 'item',
                    url: '/clientcomponent/list'
                  },
                
                ]

      },
      {
        id: 'CIML',
        title: 'CIML',
        type: 'item',
        url: '/clientciml',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'CIML',
        title: 'CIML',
        type: 'collapse',
        icon: 'feather icon-users',
        classes: 'nav-item',
        children: [
                  {
                    id: 'addCIML',
                    title: 'Add CIML',
                    type: 'item',
                    url: '/clientciml/add'
                  },
                
                  {
                    id: 'editEquipment',
                    title: 'Edit CIML',
                    type: 'item',
                    url: '/clientciml/edit'
                  },
                  {
                    id: 'hnitlist',
                    title: 'List',
                    type: 'item',
                    url: '/clientciml/list'
                  },
                
                ]

      },
    ]

  // },
  // {
  //   id: '2',
  //   title: '',
  //   type: 'group',
  //   icon: 'icon-users',
  //   children: [
  //     {
  //       id: 'user',
  //       title: 'User Management',
  //       type: 'item',
  //       url: '/user',
  //       icon: 'feather icon-user',
  //       classes: 'nav-item'
  //     }
  //   ]
  // },
  // {
  //   id: '2',
  //   title: '',
  //   type: 'group',
  //   icon: 'icon-users',
  //   children: [
  //     {
  //       id: 'basic',
  //       title: 'Component',
  //       type: 'collapse',
  //       icon: 'feather icon-box',
  //       children: [
  //         {
  //           id: 'button',
  //           title: 'Button',
  //           type: 'item',
  //           url: '/basic/button'
  //         },
  //         {
  //           id: 'badges',
  //           title: 'Badges',
  //           type: 'item',
  //           url: '/basic/badges'
  //         },
  //         {
  //           id: 'breadcrumb-pagination',
  //           title: 'Breadcrumb & Pagination',
  //           type: 'item',
  //           url: '/basic/breadcrumb-paging'
  //         },
  //         {
  //           id: 'collapse',
  //           title: 'Collapse',
  //           type: 'item',
  //           url: '/basic/collapse'
  //         },
  //         {
  //           id: 'tabs-pills',
  //           title: 'Tabs & Pills',
  //           type: 'item',
  //           url: '/basic/tabs-pills'
  //         },
  //         {
  //           id: 'typography',
  //           title: 'Typography',
  //           type: 'item',
  //           url: '/basic/typography'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 'forms',
  //   title: 'Forms & Tables',
  //   type: 'group',
  //   icon: 'icon-group',
  //   children: [
  //     {
  //       id: 'forms-element',
  //       title: 'Form Elements',
  //       type: 'item',
  //       url: '/forms/basic',
  //       classes: 'nav-item',
  //       icon: 'feather icon-file-text'
  //     },
  //     {
  //       id: 'tables',
  //       title: 'Tables',
  //       type: 'item',
  //       url: '/tables/bootstrap',
  //       classes: 'nav-item',
  //       icon: 'feather icon-server'
  //     }
  //   ]
  // },
  // {
  //   id: 'chart-maps',
  //   title: 'Chart',
  //   type: 'group',
  //   icon: 'icon-charts',
  //   children: [
  //     {
  //       id: 'apexChart',
  //       title: 'ApexChart',
  //       type: 'item',
  //       url: 'apexchart',
  //       classes: 'nav-item',
  //       icon: 'feather icon-pie-chart'
  //     }
  //   ]
  // },
  // {
  //   id: 'pages',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'icon-pages',
  //   children: [
  //     {
  //       id: 'auth',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'feather icon-lock',
  //       children: [
  //         {
  //           id: 'signup',
  //           title: 'Sign up',
  //           type: 'item',
  //           url: '/auth/signup',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'signin',
  //           title: 'Sign in',
  //           type: 'item',
  //           url: '/auth/signin',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     },
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'feather icon-sidebar'
  //     },
  //     {
  //       id: 'disabled-menu',
  //       title: 'Disabled Menu',
  //       type: 'item',
  //       url: 'javascript:',
  //       classes: 'nav-item disabled',
  //       icon: 'feather icon-power',
  //       external: true
  //     },
  //     {
  //       id: 'buy_now',
  //       title: 'Buy Now',
  //       type: 'item',
  //       icon: 'feather icon-book',
  //       classes: 'nav-item',
  //       url: 'https://codedthemes.com/item/datta-able-angular/',
  //       target: true,
  //       external: true
  //     }
  //   ]
  // }
//];
