import {
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root
} from 'type-graphql'
import { AxiosInstance } from 'axios'

import Match from './match'
import { lazyInject } from '../ioc'
import HeroService from '../hero/hero.service'
import Hero from '../hero/hero'

@Resolver(() => Match)
export default class MatchesResolver implements ResolverInterface<Match> {
  @lazyInject('dota')
  dota: AxiosInstance

  @lazyInject(HeroService)
  heroService: HeroService

  @Query(() => [Match])
  async publicMatches() {
    let { data: matches } = await this.dota.get('/publicMatches')
    return matches
  }

  @FieldResolver(() => [Hero])
  async radiantTeam(@Root() match: Match) {
    let ids = match.radiant_team.split(',')

    return await this.getTeam(ids)
  }

  @FieldResolver(() => [Hero])
  async direTeam(@Root() match: Match) {
    let ids = match.dire_team.split(',')

    return await this.getTeam(ids)
  }

  getTeam(ids: string[]) {
    return Promise.all(
      ids.map(async heroId => this.heroService.getHero(+heroId))
    )
  }
}
