import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import * as DataLoader from 'dataloader'

import HeroService from './hero/hero.service'
import dota from './dota'
import Hero from './hero/hero'
import Types from './ioc-types'

let iocContainer = new Container()

iocContainer.bind(HeroService).toSelf()

iocContainer.bind(Types.HeroesLoader).toDynamicValue(({ container }) => {
  let heroService = container.get(HeroService)

  return new DataLoader<number, Hero>(ids => heroService.getHeroesByIds(ids))
})

iocContainer.bind(Types.Dota).toFactory(() => dota)

let { lazyInject } = getDecorators(iocContainer)

export { iocContainer, lazyInject }
