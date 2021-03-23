import rebRoles from '@/auth/rebRoles'
// import dashBoard from '@/components/rebComponents/home.vue'
// import allAccounts from '@/components/rebComponents/allAccount.vue'
// import RebProfile from '@/components/rebComponents/RebProfile.vue'
import Courses from '@/components/rebComponents/curriculumDeveloper/course.vue'
import Course from '@/components/rebComponents/curriculumDeveloper/Newcourse.vue'

import singleCourse from '@/components/rebComponents/curriculumDeveloper/singleCourse.vue'
import courseHome from '@/components/rebComponents/curriculumDeveloper/courseHome.vue'
import curriculumDeveloper  from '@/components/dashboards/curriculumDeveloper.vue'

export default[
  {
      path: '/reb-cd',
      meta: { authorize: [rebRoles.curriculumDeveloper] },
      name: 'curriclemDeveloper',
      component: curriculumDeveloper ,
      children: [
             {
                  path: 'courses',
                  name: 'courses',
                  component: Courses,
              },
              {
                path: 'course',
                name: 'course',
                component: Course,
              },
             {
                path: 'course/:courseId/',
                name: 'singlecourse',
                component: singleCourse,
                children:[
                  {
                    path:'home',
                    name:'courseHome',
                    component:courseHome,
                    
                  },
                  {
                    path:'home',
                    name:'courseAssignments',
                    component:courseHome,
                    
                  },
                ]
             },
      ]
  },
];
