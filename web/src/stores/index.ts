import { getApiList } from '../server'
import { defineStore } from 'pinia'

import type { RootObject, Children ,ChinaTotal,ChinaAdd,LocalCityNCOVDataList} from './type'

export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    list: <RootObject>{},
    item: <Children[]>[],
    chinaTotal:<ChinaTotal>{},
    chinaAdd:<ChinaAdd>{},
    cityDetail:<LocalCityNCOVDataList[]>[],
  }),
  actions: {
    async getList() {
      this.list = await getApiList()
      console.log(this.list);
      const {chinaTotal,chinaAdd} = this.list.diseaseh5Shelf
      this.chinaTotal=chinaTotal
      this.chinaAdd=chinaAdd
      this.cityDetail = this.list.localCityNCOVDataList.slice(0,10)
      
    }
  }
})
