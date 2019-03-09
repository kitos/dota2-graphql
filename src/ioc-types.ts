import { AxiosInstance } from 'axios'
import * as DataLoader from 'dataloader'
import Hero from './hero/hero'

export let Types = {
  Dota: Symbol('Dota axios service'),
  HeroesLoader: Symbol('Heroes dataloader')
}

export namespace ITypes {
  export type Dota = AxiosInstance
  export type HeroesLoader = DataLoader<number, Hero>
}

export default Types
