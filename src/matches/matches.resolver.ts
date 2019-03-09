import { FieldResolver, Query, Resolver, ResolverInterface, Root } from 'type-graphql'

import Match from './match'
import { lazyInject } from '../ioc'
import { ITypes, Types } from '../ioc-types'
import Hero from '../hero/hero'

let convertIds = (idsString: string) => idsString.split(',').map(Number)

@Resolver(() => Match)
export default class MatchesResolver implements ResolverInterface<Match> {
  @lazyInject(Types.Dota)
  dota: ITypes.Dota

  @lazyInject(Types.HeroesLoader)
  heroesLoader: ITypes.HeroesLoader

  @Query(() => [Match])
  async publicMatches() {
    let { data: matches } = await this.dota.get('/publicMatches')
    return matches
  }

  @FieldResolver(() => [Hero])
  radiantTeam(@Root() match: Match) {
    return this.getTeam(convertIds(match.radiant_team))
  }

  @FieldResolver(() => [Hero])
  direTeam(@Root() match: Match) {
    return this.getTeam(convertIds(match.dire_team))
  }

  getTeam(ids: number[]) {
    return this.heroesLoader.loadMany(ids)
  }
}
