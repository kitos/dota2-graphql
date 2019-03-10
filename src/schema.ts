import { buildSchema as bs } from 'type-graphql'

import HeroResolver from './hero/hero.resolver'
import MatchesResolver from './matches/matches.resolver'
import { iocContainer } from './ioc'

export let buildSchema = () => {
  let resolvers = [HeroResolver, MatchesResolver]

  resolvers.forEach(r =>
    iocContainer
      .bind(r as NewableFunction)
      .toSelf()
      .inSingletonScope()
  )

  return bs({
    resolvers,
    container: iocContainer
  })
}

export default buildSchema
