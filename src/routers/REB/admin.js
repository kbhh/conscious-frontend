import rebRoles from '@/auth/rebRoles'
import dashBoard from '@/components/rebComponents/admin/home.vue'
import allAccounts from '@/components/rebComponents/admin/allAccount.vue'
import RebProfile from '@/components/rebComponents/admin/RebProfile.vue'
import rebAdmin from '@/components/dashboards/mainDB/maindb.vue'


export default[
  {
      path: '/reb-admin',
      meta: { authorize: [rebRoles.rebAdmin] },
      name: 'rebadmin',
      component: rebAdmin,
      children: [
          {
                  path: 'profile',
                  name: 'profile',
                  component: RebProfile,
              },
          {
              path: 'a',
              name: 'dashboard',
              component: dashBoard,
          },
          {
              name: 'users',
              path: 'users',
              component: allAccounts
          },
      ]
  },
];
