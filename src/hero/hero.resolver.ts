import { Resolver, Query } from 'type-graphql'

import { lazyInject } from '../ioc'
import Hero from './hero'
import HeroService from './hero.service'

@Resolver(Hero)
export default class HeroResolver {
  @lazyInject(HeroService)
  public service: HeroService

  @Query(() => [Hero])
  heroes() {
    return this.service.getHeroes()
  }
}
