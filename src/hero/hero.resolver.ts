import { Arg, Query, Resolver } from 'type-graphql'
import { inject, injectable } from 'inversify'

import Hero from './hero'
import HeroService from './hero.service'

@injectable()
@Resolver(Hero)
export default class HeroResolver {
  @inject(HeroService)
  public service: HeroService

  @Query(() => Hero)
  hero(@Arg('id') id: number) {
    return this.service.getHero(id)
  }

  @Query(() => [Hero])
  heroes() {
    return this.service.getHeroes()
  }
}
