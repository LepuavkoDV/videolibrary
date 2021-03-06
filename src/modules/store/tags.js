import tags from '../services/tags.service'
import _ from 'lodash'
import formatDate from '../utils/formatDate'

const state = {
  tags: [],
  currentTags: [],
  videos: [],
  videosLoaded: false
}
const mutations = {
  LOAD_TAGS (state, data) {
    state.tags = data
  },
  SET_CURRENT_TAGS (state, tags) {
    state.currentTags = tags
  },
  RESET_CURRENT_TAGS (state) {
    state.currentTags = []
  },
  SET_VIDEOS (state, data) {
    state.videos = data
  },
  VIDEOS_NOT_LOADED (state) {
    state.videosLoaded = false
  },
  VIDEOS_LOADED (state) {
    state.videosLoaded = true
  }
}
const getters = {
  getTagsList: (state) => () => {
    let list = _.flatMap(state.tags, (item) => {
      return {
        _id: item._id,
        title: item.title,
        videos: item.videos,
        createdAt: formatDate(item.createdAt)
      }
    })
    return list
  },
  getTagByName: (state) => (name) => {
    let tag = _.find(state.tags, (c) => {
      return _.kebabCase(c.title) === name
    })
    if (tag !== undefined) {
      return tag
    }
  }
}
const actions = {
  loadTags: ({commit}) => {
    tags.list().then(res => {
      commit('LOAD_TAGS', res.data)
    })
  },
  addTag: ({dispatch}, data) => {
    return tags.add(data).then(res => {
      dispatch('loadTags')
    })
  },
  setCurrentTags: ({commit}, tags) => {
    commit('SET_CURRENT_TAGS', tags)
  },
  resetCurrentTags: ({commit}) => {
    commit('RESET_CURRENT_TAGS')
  },
  loadTagVideos: ({commit}, id) => {
    commit('VIDEOS_NOT_LOADED')
    tags.videos(id).then(res => {
      commit('SET_VIDEOS', res.data)
      commit('VIDEOS_LOADED')
    })
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}
