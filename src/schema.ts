import { buildSchema as bs } from 'type-graphql'
import HeroResolver from './hero/hero.resolver'
import MatchesResolver from './matches/matches.resolver'

export let buildSchema = () =>
  bs({
    resolvers: [HeroResolver, MatchesResolver]
  })

export default buildSchema
