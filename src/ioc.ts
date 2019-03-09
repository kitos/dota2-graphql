import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import * as DataLoader from 'dataloader'

import HeroService from './hero/hero.service'
import dota from './dota'
import { Types, ITypes } from './ioc-types'

let iocContainer = new Container()

iocContainer.bind(HeroService).toSelf()

iocContainer.bind(Types.HeroesLoader).toDynamicValue(
  ({ container }): ITypes.HeroesLoader => {
    let heroService = container.get(HeroService)

    return new DataLoader(ids => heroService.getHeroesByIds(ids))
  }
)

iocContainer.bind(Types.Dota).toFactory(() => dota)

let { lazyInject } = getDecorators(iocContainer)

export { iocContainer, lazyInject }
