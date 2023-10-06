import axios from 'axios';
import { useToast } from 'vue-toastification';
const toast = useToast()

export default {
  install: (app: any, options: any) => {
    // Create axios instance
    const service = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    // Request intercepter
    service.interceptors.request.use(
      config => {
        const token = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME)
        if (token) config.headers['Authorization'] = `Bearer ${token}` // Set JWT token
        return config
      },
      error => {
        // Do something with request error
        Promise.reject(error)
      }
    )

    // response pre-processing
    service.interceptors.response.use(
      response => {
        if (response.headers.authorization) {
          localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, response.headers.authorization)
          response.data.token = response.headers.authorization
        }
        return response.data
      },
      error => {
        let message = ''
        if (error.message === 'Network Error') message = app.i18n.t('request.NetworkError')
        if (error.response && error.response.data) {
          if (error.response.data.message) message += `${error.response.data.message}\r\n`
          if (error.response.data.error && error.response.data.error.message) message += `${error.response.data.error.message}\r\n`

          if (error.response.data.errors) {
            const errorsMsg = error.response.data.errors
            if (Object.entries(errorsMsg).length > 0) {
              const responseData = Object.entries(errorsMsg)
              responseData.map(item => (`${Array.isArray(item[1]) ? item[1][0] : item[1]}`)).forEach(item => {
                message += `${item}\r\n`
              })
            }
          }
          if (error.response.data.error === 'invalid_grant') message = app.i18n.t('request.SessionExpired')
          // if (error.response.data.code) {
          //   await $auth.fetchUser()
          //   if (error.response.data.code === 'not_profile_complete') {
          //     await redirect(app.localePath('/account/profile/complete'))
          //   } else if (error.response.data.code === 'profile_complete') {
          //     await redirect(app.localePath('/'))
          //   }
          // }
        }

        toast.error(message, { position: "top-center", timeout: 5000})
        return Promise.reject(error)
      }
    )
    app.config.globalProperties.$axios = service;
    app.provide('$axios', service);
    return service
  }
}
