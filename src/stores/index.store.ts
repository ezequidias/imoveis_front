import { defineStore } from 'pinia';

export const useIndexStore = defineStore({
    id: 'index',
    state: () => ({
      queryUrl: '',
    }),
  actions: {
    getQueryUrl(format: string): any {
      const query = this.queryUrl
      return (query) ? ((format == 'json') ? JSON.parse(`{"${  decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')  }"}`) : query) :  query
    },
    setQueryUrl(val: object) {
      this.queryUrl = Object.entries(val).filter(([k, v]) => (v && [k, v])).map(([k, v]) => (!k.includes('redirect') ? `${k}=${v}` : '')).join('&') 
    },
  },
});
