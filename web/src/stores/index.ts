import { getApiList } from '../server'
import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    list: {}
  }),
  actions:{
    async getList(){
      const res = await getApiList()
      console.log(res);
      
    }
  }
})
