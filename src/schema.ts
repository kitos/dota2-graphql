import { buildSchema as bs } from 'type-graphql'
import HeroResolver from './hero/hero.resolver'
import MatchesResolver from './matches/matches.resolver'
import { iocContainer } from './ioc'

export let buildSchema = () =>
  bs({
    resolvers: [HeroResolver, MatchesResolver],
    container: iocContainer
  })

export default buildSchema
