import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'

import HeroService from './hero/hero.service'
import dota from './dota'

let iocContainer = new Container()

iocContainer.bind(HeroService).toSelf()
iocContainer.bind('dota').toFactory(() => dota)

let { lazyInject } = getDecorators(iocContainer)

export { iocContainer, lazyInject }
