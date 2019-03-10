import * as DataLoader from 'dataloader'

import { ITypes } from '../ioc-types'
import HeroService from './hero.service'

export let createHeroLoader = ({ container }): ITypes.HeroesLoader => {
  let heroService = container.get(HeroService)

  return new DataLoader(ids => heroService.getHeroesByIds(ids))
}

export default createHeroLoader
