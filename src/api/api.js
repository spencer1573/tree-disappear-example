import axios from 'axios'
import { API_ROOT } from '../urls'
import forEach from 'lodash/forEach'
import store from '../store/store'

export class API {
  findOne(collection, filter) {
    const url = `${API_ROOT}/${collection}/find-one/`
    return axios.post(url, filter)
  }
  find(collection, filter) {
    const url = `${API_ROOT}/${collection}/find/`
    return axios.post(url, filter)
  }
  post(collection, data) {
    if (!Array.isArray(data)) {
      data = [data]
    }
    const url = `${API_ROOT}/${collection}/`
    return axios.post(url, data)
  }
  replaceOne(collection, id, data) {
    const url = `${API_ROOT}/${collection}/${id}/`
    return axios.post(url, data)
  }
  deleteOne(collection, id) {
    const url = `${API_ROOT}/${collection}/${id}/`
    return axios.delete(url)
  }
  // eslint-disable-next-line
  async getCategoryDefinitionsById(thestore) {
    // Returns all categories and templates in an object keyed by id
    let allCategoryDefinitions = {}
    await this.find('templates', {})
      .then((response) => {
        forEach(response.data, function(categoryDefinition) {
          allCategoryDefinitions[categoryDefinition._id] = categoryDefinition
        })
        this.find('terms', {}).then((response) => {
          forEach(response.data, function(template) {
            allCategoryDefinitions[template._id] = template
          })
          store.commit('setAllCategoryDefinitionsById', {
            categoryDefinitions: allCategoryDefinitions,
          })
        })
      })
      .catch((error) => {
        console.log(error)
      })
    return allCategoryDefinitions
  }
  getTypes() {
    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          {
            key: 'section',
            display_name: 'Section',
            description: 'Section',
            needs_data: false,
            class: 'complex',
          },
          {
            key: 'numerical-range',
            display_name: 'Numerical range',
            description:
              'Range of numerical values separated by a colon (e.g. -1:150)',
            needs_data: true,
            class: 'simple',
          },
          {
            key: 'date',
            display_name: 'Date',
            description: 'Date',
            needs_data: false,
            class: 'simple',
          },
          {
            key: 'value',
            display_name: 'Value',
            description: 'Single value.  May be either numerical or a string.',
            needs_data: false,
            class: 'simple',
          },
          {
            key: 'value-list',
            display_name: 'Value list',
            description: 'One or more values separated by commas.',
            needs_data: true,
            class: 'simple',
          },
          {
            key: 'multiple-value-list',
            display_name: 'Multiple value list',
            description: 'One or more values separated by commas.',
            needs_data: true,
            class: 'simple',
          },
          {
            key: 'category',
            display_name: 'Category',
            description: 'An existing Category',
            needs_data: true,
            class: 'simple',
          },
        ],
      })
    })
  }
  /*
   * These api calls replace the legacy calles above that are deprecated.
   * More calls are added as needed.
   * each call returns a promise.
   */
  // eslint-disable-next-line
  get_record_names(pattern) {
    /* return the [{name: nn, _id: yy}, ..] of medical records matching the
       case sensitive pattern.
       Note: can be case insensitivized if needed
    */
    const url = '${API_ROOT}/${pattern}/get_recs'
    return axios.get(url)
  }
  // eslint-disable-next-line
  get_record_name(id) {
    /* return the {name: nn, _id: yy} of medical record given its id.
     */
    const url = '${API_ROOT}/${id}/get_rec'
    return axios.get(url)
  }
  // eslint-disable-next-line
  get_child_fields(root_id, parent_it) {
    /* return the children (entire fields) of children of their parent whose id
       is parent_id and are contained in the medical record root_id
    */
    // const url = '${API_ROOT}/${root_id}/${parent_id}/get_children'
    return axios.get('https://jsonplaceholder.typicode.com/users')
    // return axios.get('https://jsonplaceholder.typicode.com/todos/1')

    // const response = {
    //   data: [
    //     {
    //       text: 'Item 3.1',
    //       data: { id: 31 },
    //     },
    //     {
    //       text: 'Item 3.2',
    //       data: { id: 32 },
    //     },
    //   ],
    // }
    // return response
  }
  async updateIndex(index, index_id) {
    if (!index_id) {
      return this.post('indexes', index)
    } else {
      // eslint-disable-next-line
      if (index.hasOwnProperty('_id')) {
        delete index['_id']
      }
      return this.replaceOne('indexes', index_id, index)
    }
  }
}
