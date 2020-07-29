import { INCREMENT, ADD_TO_CART, CHECKED_CHANGE } from './mutations-type';

const actions = {
  addCart(context, payload) {
    return new Promise(resolve => {
      // 1.查看是否添加过
      const oldInfo = context.state.cartList.find(item => item.iid === payload.iid);

      // 2.已添加过，数量+1
      if (oldInfo) {
        context.commit(INCREMENT, oldInfo);
        resolve('当前商品数量+1');
      } else {
        // 新商品，追加到购物车
        payload.count = 1;
        //   payload.checked = true;
        context.commit(ADD_TO_CART, payload);
        resolve('添加新商品');
      }
    });
  },

  // 购物车商品选择按钮
  checkedChange({ commit }, payload) {
    commit(CHECKED_CHANGE, payload);
  },

  changeSelect({ commit }) {
    commit('changeSelect');
  },
};

export default actions;
