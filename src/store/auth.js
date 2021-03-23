import User from '@/auth/User'
const activeUser = JSON.parse(localStorage.getItem('loggedInUser'));
const initialState = activeUser ? User.decode(activeUser.token) : User.decode(null)
const state = {
    user: initialState
        // user: null 
}

const mutations = {
    setLogin(state) {
        state.user = User.decode(JSON.parse(localStorage.loggedInUser).token)
    },
    setLogout(state) {
        state.user = null
    }
}

const getters = {
    currentUser(state) {
        return state.user
    }
}

const actions = {
    login({ commit }) {
        commit('setLogin')
    },

    logout({ commit }) {
        commit('setLogout')
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}