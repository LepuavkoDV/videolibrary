import categories from '../services/categories.service'
import _ from 'lodash'
import formatDate from '../utils/formatDate'

const state = {
  categories: [],
  videos: []
}
const mutations = {
  LOAD_CATEGORIES (state, data) {
    state.categories = data
  },
  SET_VIDEOS (state, data) {
    state.videos = data
  }
}
const getters = {
  getCategoriesList: (state) => () => {
    let list = _.flatMap(state.categories, (item) => {
      return {
        _id: item._id,
        title: item.title,
        videos: item.videos,
        createdAt: formatDate(item.createdAt)
      }
    })
    return list
  },
  getCategoryByName: (state) => (name) => {
    let category = _.find(state.categories, (c) => {
      return _.kebabCase(c.title) === name
    })
    if (category !== undefined) {
      return category
    }
  }
}
const actions = {
  loadCategories: ({commit}) => {
    categories.list().then(res => {
      commit('LOAD_CATEGORIES', res.data)
    })
  },
  addCategory: ({dispatch}, data) => {
    return categories.add(data).then(res => {
      dispatch('loadCategories')
    })
  },
  loadCategoryVideos: ({commit}, id) => {
    categories.videos(id).then(res => {
      commit('SET_VIDEOS', res.data)
    })
  }

}
export default {
  state,
  mutations,
  getters,
  actions
}