import rebRoles from '@/auth/rebRoles'
import contentDeveloper from '@/components/dashboards/contentDeveloper.vue'

export default [{
    path: '/reb-ccd',
    meta: {
        authorize: [rebRoles.contentDeveloper]
    },
    name: 'contentDeveloper',
    component: contentDeveloper
}, ];