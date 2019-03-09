import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import * as DataLoader from 'dataloader'

import HeroService from './hero/hero.service'
import dota from './dota'
import Hero from './hero/hero'

let iocContainer = new Container()

iocContainer.bind(HeroService).toSelf()

iocContainer.bind('heroesLoader').toDynamicValue(({ container }) => {
  let heroService = container.get(HeroService)

  return new DataLoader<number, Hero>(ids => heroService.getHeroesByIds(ids))
})

iocContainer.bind('dota').toFactory(() => dota)

let { lazyInject } = getDecorators(iocContainer)

export { iocContainer, lazyInject }
