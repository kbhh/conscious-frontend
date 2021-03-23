//basic libraries
import Vue from 'vue'
import Router from 'vue-router'

//routes from separete module
import rebAdminRoute from '@/routers/REB/admin'
import rebCurriculumDeveloperRoute from '@/routers/REB/curriculumDeveloper'
import rebContentDeveloperRoute from '@/routers/REB/contentDeveloper'

// public components
import Home from '@/components/Home'
import LoginandRegistration from "@/components/accounts/LoginandRegistration.vue"

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const baseRoutes = [{
        path: '/',
        component: Home
    },
    {
        path: '/login',
        name: 'LoginandRegistration',
        component: LoginandRegistration
    },
]
const routes = baseRoutes.concat(rebAdminRoute, rebCurriculumDeveloperRoute, rebContentDeveloperRoute);

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,

});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/'];
    const authRequired = !publicPages.includes(to.path);
    // Redirect to login page if page requires authentication and user is not logged in
    if (authRequired && !localStorage.getItem('loggedInUser')) {
        return next('/');
    }
    // Role-based Access Conrol List
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (to.matched.some(record => record.meta.authorize)) {
        const routeRole = to.matched[0].meta.authorize
        const userRole = loggedInUser.role
        if (routeRole != userRole) {
            return next('/');
        }
    }
    next();
})
// role-based ACL 
// router.beforeEach((to, from, next) => {

//     if (to.matched.some(record => record.meta.authorize)) {       
//         const routeRole =to.matched[0].meta.authorize
//         const userRole =loggedInUser.role
//         console.log('routeRole'+routeRole,'userRole'+userRole);

//       if (!loggedInUser && (routeRole !=userRole)) {
//         next({
//           path: '/',
//         })
//       } else {            
//         next()
//       }
//     } else {
//       next() // make sure to always call next()!
//     }

//   })

export default router