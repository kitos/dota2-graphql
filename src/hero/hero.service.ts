import { inject, injectable } from 'inversify'
import { AxiosInstance } from 'axios'

import Hero from './hero'
import Types from '../ioc-types'

@injectable()
export default class HeroService {
  @inject(Types.Dota)
  dota: AxiosInstance

  async getHeroes() {
    let { data: heroes } = await this.dota.get<Hero[]>('/heroes')

    return heroes
  }

  async getHeroesByIds(ids: number[]) {
    let heroes = await this.getHeroes()

    return heroes.filter(({ id }) => ids.includes(id))
  }

  async getHero(heroId: number) {
    return (await this.getHeroesByIds([heroId]))[0]
  }
}
