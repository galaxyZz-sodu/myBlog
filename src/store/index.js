import { createStore } from "vuex"
export default createStore({
    state: {
        listData: [],
        listData2: []
    },
    getters: {

    },
    actions: {

    },
    mutations: {
        listDataMut(state, listData) {
            state.listData = listData
            state.listData2 = listData
            // console.log('state里', state.listData);
        },
        searchMut(state, info) {
            state.listData = state.listData2
            state.listData = state.listData.filter(item => {
                return item.title.indexOf(info.toString()) != -1
            })
            // console.log(state.listData);
            // state.listData.shift()
        }
    }
})