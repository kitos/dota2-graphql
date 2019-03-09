import { ObjectType, Field } from 'type-graphql'
import Hero from '../hero/hero'

@ObjectType()
export class Match {
  @Field()
  match_id: number

  @Field()
  match_seq_num: number

  @Field()
  radiant_win: boolean

  @Field()
  start_time: number

  @Field()
  duration: number

  @Field(() => [Hero])
  radiantTeam: Hero[]

  @Field(() => [Hero])
  direTeam: Hero[]

  radiant_team: string
  dire_team: string
}

export default Match
