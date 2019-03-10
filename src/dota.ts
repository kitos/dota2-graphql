import axios from 'axios'
import { interfaces } from 'inversify'
import { ITypes, Types } from './ioc-types'

export let createDota = ({ container }: interfaces.Context) => {
  let logger = container.get<ITypes.Logger>(Types.Logger)

  let dota = axios.create({
    baseURL: 'https://api.opendota.com/api/'
  })

  dota.interceptors.request.use(
    config => {
      logger.trace(
        `dota: request "${config.method.toUpperCase()} ${config.url}" fulfilled`
      )

      return config
    },
    error => {
      logger.warn(`dota: request rejected - ${error.message}`)

      return Promise.reject(error)
    }
  )

  dota.interceptors.response.use(
    res => {
      logger.debug(
        `dota: response "${res.config.method.toUpperCase()} ${
          res.config.url
        }" fulfilled`
      )

      return res
    },
    error => {
      logger.warn(`dota: response rejected - "${error.message}"`)

      return Promise.reject(error)
    }
  )

  return dota
}

export default createDota
