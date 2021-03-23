import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import marks from './modules/marks'
import reset from './modules/reset'
import register from './modules/register'
import update from './modules/update'


//regional admin
import adminReg from './modules/reb/admin/register'
import userRegister from './modules/reb/admin/userRegister'
import rebProfile from './modules/reb/admin/profile'
import rebAllUsers from './modules/reb/admin/users'

// regional curriculum developers
import regionalCurriculumDeveloperRegister from './modules/reb/curriculumDeveloper/register'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        reset,
        marks,
        register,
        update,
        rebAllUsers,
        userRegister,
        rebProfile,
        adminReg,
        regionalCurriculumDeveloperRegister
    }
})
