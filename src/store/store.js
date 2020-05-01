import Vue from 'vue'
import Vuex from 'vuex'
// import forEach from 'lodash/forEach'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    all_categories: [],
    all_category_definitions_by_id: {},
    categories: {},
    error_message: '',
    show_error: false,
  },
  mutations: {
    showError(state, payload) {
      state.show_error = payload['display']
      if ('message' in payload) {
        state.error_message = payload['message']
      }
    },
    setAllCategoryDefinitions(state, payload) {
      state.all_categories = payload['categories']
    },
    setAllCategoryDefinitionsById(state, payload) {
      state.all_category_definitions_by_id = payload['categoryDefinitions']
    },
    resetCategories(state) {
      state.categories = {}
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setAttributeValue(state, payload) {
      // payload should be {key, val}
      // key can be dot-separated, arbitrary depth.
      // each dot corresponds to a new object, e.g.
      // { key: 'cough.sputum.color', val: 'Clear'}
      const keystr = payload['key']
      const val = payload['val']
      const category_id = payload['category_id']
      const display_name = payload['display_name']
      let keys = keystr.split('.')
      let obj = state.categories
      for (var i = 0; i < keys.length; i++) {
        let key = keys[i]
        if (typeof obj[key] === 'undefined') {
          obj[key] = {}
        }
        // if (i == 0 && !obj[key].category_id && category_id){
        //   obj[key].category_id = category_id
        // }
        if (i === keys.length - 1) {
          obj[key].value = val
          obj[key].display_name = display_name
          if (category_id) {
            obj[key].category_id = category_id
          }
        } else {
          obj = obj[key]
        }
      }
    },
  },
  getters: {
    getAllCategoryDefinitions: (state) => {
      return state.all_categories
    },
    getAllCategoryDefinitionsById: (state) => {
      return state.all_category_definitions_by_id
    },
    getAttributeValue: (state) => (keystr) => {
      let keys = keystr.split('.')
      let obj = state.categories
      let val = ''
      for (var i = 0; i < keys.length; i++) {
        let k = keys[i]
        if (k in obj) {
          obj = obj[k]
        } else {
          return val
        }
      }
      val = obj.value
      return val
    },
    getAttributeDisplayName: (state) => (keystr) => {
      let keys = keystr.split('.')
      let obj = state.categories
      let val = ''
      for (var i = 0; i < keys.length; i++) {
        let k = keys[i]
        if (k in obj) {
          obj = obj[k]
        } else {
          return val
        }
      }
      val = obj.display_name
      return val
    },
  },
})
