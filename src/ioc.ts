import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import * as DataLoader from 'dataloader'

import HeroService from './hero/hero.service'
import { createDota } from './dota'
import { Types, ITypes } from './ioc-types'
import logger from './logger'

let iocContainer = new Container()

iocContainer.bind(Types.Logger).toConstantValue(logger)

iocContainer.bind(HeroService).toSelf()

iocContainer.bind(Types.HeroesLoader).toDynamicValue(
  ({ container }): ITypes.HeroesLoader => {
    let heroService = container.get(HeroService)

    return new DataLoader(ids => heroService.getHeroesByIds(ids))
  }
)

iocContainer.bind(Types.Dota).toDynamicValue(createDota)

let { lazyInject } = getDecorators(iocContainer)

export { iocContainer, lazyInject }
