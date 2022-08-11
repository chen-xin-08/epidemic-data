import { getApiList } from '../server'
import { defineStore } from 'pinia'

import type {RootObject} from './type'

export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    list : <RootObject>{}
  }),
  actions:{
    async getList(){
      this.list = await getApiList()
      console.log(this.list);
      
    }
  }
})
