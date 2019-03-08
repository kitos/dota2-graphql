import { buildSchema as bs } from 'type-graphql'
import HeroResolver from './hero/hero.resolver'

export let buildSchema = () =>
  bs({
    resolvers: [HeroResolver]
  })

export default buildSchema
