import { defineStore } from 'pinia'

export const useAstrosStore = defineStore('astros', {
    state: () => {
        return { data: {} as Record<string, any> }
    },
    getters: {
        hasData: (state) => {
            return state.data && Object.keys(state.data).length > 0;
        },
        // data: (state) => {
        //     return state.data;
        // }
    },
    actions: {
        set(data: Record<string, any>) {
            this.data = data;
        }
    },
    // cookies (the default) cap at 4KB and the API response is ~5KB
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    },
})