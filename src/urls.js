/*
    URLs for the REST API
*/
/* eslint-disable no-multi-spaces */

export const ROOT_URL =
  process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8000/'
export const API_ROOT = [ROOT_URL, 'api'].join('')
export const CDG_API = [API_ROOT, 'cdg'].join('/')
export const FETCH_CATS = [API_ROOT, 'fetch_cats'].join('/')
export const NODE_CHILDREN = [API_ROOT, 'node_children'].join('/')

/*
 * MAKE_STATE takes optional parameters:
 * No parameters: Make state for all cartegories.
 * [array of cats]: Make state for listed categories.
 * [array of cats]/index: Make stae for listed categories against an index case.
 */
export const MAKE_STATE = [CDG_API, 'make_state'].join('/')

// Same options as for MAKE_STATE only generate ransom cases.
export const GEN_STATE = [CDG_API, 'gen_state'].join('/')
/*
 * SUBSPACE_CATS/state_id
 * Returns list of categories in the state.
 */
export const SUB_SPACE_CATS = [CDG_API, 'sub_space_names'].join('/')

/*
 * SCORE/state_id/[array of cats]
 * Returns scores for listed cats in state.
 */
export const SCORE = [CDG_API, 'score'].join('/')

/*
 * FACTORS/state_id/cat/[array of scores]
 * Returns common factors with given scores for a category
 */
export const FACTORS = [CDG_API, 'factors'].join('/')
