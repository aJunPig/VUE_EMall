import { INCREMENT, ADD_TO_CART, CHECKED_CHANGE } from './mutations-type';

const mutations = {
  [INCREMENT](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
  },
  [CHECKED_CHANGE](state, payload) {
    payload.checked = !payload.checked;
  },
  changeSelect(state) {
    let isSelectAll;
    if (!state.cartList.length) {
      isSelectAll = false;
    } else {
      isSelectAll = state.cartList.every(item => item.checked);
    }

    if (isSelectAll) {
      state.cartList.forEach(item => {
        item.checked = false;
      });
    } else {
      state.cartList.forEach(item => {
        item.checked = true;
      });
    }
  },
  deleteGoods(state, payload) {
    state.cartList.splice(payload, 1);
  },
  numOperation(state, payload) {
    // 分3种情况：输入域变更，加减号变更
    if (payload.type == 'text') {
      state.cartList[payload.index].count = payload.num;
    } else if (payload.type == 'dec') {
      state.cartList[payload.index].count -= 1;
    } else {
      state.cartList[payload.index].count += 1;
    }
  },
};

export default mutations;
