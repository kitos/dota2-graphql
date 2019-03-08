import 'reflect-metadata'
import * as Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import buildSchema from './schema'

let bootstrap = async () => {
  let server = new ApolloServer({ schema: await buildSchema() })
  let app = new Koa()

  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

bootstrap()
