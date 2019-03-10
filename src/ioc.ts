import { Container } from 'inversify'
import * as DataLoader from 'dataloader'

import HeroService from './hero/hero.service'
import { createDota } from './dota'
import { Types, ITypes } from './ioc-types'
import logger from './logger'
import MatchesResolver from './matches/matches.resolver'
import HeroResolver from './hero/hero.resolver'

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

iocContainer
  .bind(HeroService)
  .toSelf()
  .inSingletonScope()

iocContainer
  .bind(Types.HeroesLoader)
  .toDynamicValue(
    ({ container }): ITypes.HeroesLoader => {
      let heroService = container.get(HeroService)

      return new DataLoader(ids => heroService.getHeroesByIds(ids))
    }
  )
  .inSingletonScope()

iocContainer
  .bind(MatchesResolver)
  .toSelf()
  .inSingletonScope()

iocContainer
  .bind(HeroResolver)
  .toSelf()
  .inSingletonScope()

iocContainer
  .bind(Types.Dota)
  .toDynamicValue(createDota)
  .inSingletonScope()

export { iocContainer }
