import { AxiosInstance } from 'axios'
import * as DataLoader from 'dataloader'
import { Logger as PinoLogger } from 'pino'

import Hero from './hero/hero'

export let Types = {
  Logger: Symbol('Logger'),
  Dota: Symbol('Dota axios service'),
  HeroesLoader: Symbol('Heroes dataloader')
}

export namespace ITypes {
  export type Logger = PinoLogger
  export type Dota = AxiosInstance
  export type HeroesLoader = DataLoader<number, Hero>
}

export default Types
