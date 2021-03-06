import { Container } from 'inversify'

import HeroService from './hero/hero.service'
import { createDota } from './dota'
import { Types } from './ioc-types'
import logger from './logger'
import createHeroLoader from './hero/hero.loader'

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
  logger.trace(`ioc: resolved "${serviceId}" in ${sec}s ${nanoSec / 1000000}ms`)

  return result
})

iocContainer.bind(Types.Logger).toConstantValue(logger)

iocContainer
  .bind(HeroService)
  .toSelf()
  .inSingletonScope()

iocContainer
  .bind(Types.HeroesLoader)
  .toDynamicValue(createHeroLoader)
  .inSingletonScope()

iocContainer
  .bind(Types.Dota)
  .toDynamicValue(createDota)
  .inSingletonScope()

export { iocContainer }
