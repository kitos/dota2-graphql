import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import * as DataLoader from 'dataloader'

import HeroService from './hero/hero.service'
import { createDota } from './dota'
import { Types, ITypes } from './ioc-types'
import logger from './logger'

let iocContainer = new Container()

iocContainer.applyMiddleware(planAndResolve => args => {
  let serviceId =
    typeof args.serviceIdentifier === 'function'
      ? args.serviceIdentifier.name
      : args.serviceIdentifier.toString()

  logger.trace(`ioc: start resolving "${serviceId}"`)

  let start = process.hrtime()

  let result = planAndResolve(args)

  let [sec, nanoSec] = process.hrtime(start)
  logger.debug(`ioc: resolved "${serviceId}" in ${sec}s ${nanoSec / 1000000}ms`)

  return result
})

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
