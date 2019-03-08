import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Hero {
  @Field()
  id: number

  @Field()
  name: string

  @Field()
  localized_name: string

  @Field()
  primary_attr: string

  @Field()
  attack_type: string

  @Field(() => [String])
  roles: string[]
}

export default Hero
