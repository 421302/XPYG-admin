

import * as types from './mutation-types';

const mutations = {
  [types.SET_NAVRELOAD](state,navReload){
    state.navReload = navReload;
  }
};

export default mutations
