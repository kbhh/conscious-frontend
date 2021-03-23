import rebRoles from '@/auth/rebRoles'
import ManageUser from '@/components/rebComponents/manageAccount.vue'
import allAccounts from '@/components/rebComponents/allAccount.vue'
import RebProfile from '@/components/rebComponents/RebProfile.vue'
import rebAdmin from '@/components/dashboards/mainDB/maindb.vue'

export default [{
    path: '/reb-admin',
    meta: {
        authorize: [rebRoles.rebAdmin]
    },
    name: 'rebadmin',
    component: rebAdmin,
    children: [{
            path: 'profile',
            name: 'profile',
            component: RebProfile,
        },
        {
            path: 'users/:user_id',
            name: 'ManageUser',
            component: ManageUser,
        },
        {
            name: 'users',
            path: 'users',
            component: allAccounts
        },
    ]
}, ];