import { inject, injectable } from 'inversify'

import Hero from './hero'
import { AxiosInstance } from 'axios'

@injectable()
export default class HeroService {
  @inject('dota')
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
