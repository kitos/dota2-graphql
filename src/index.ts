import 'reflect-metadata'
import * as Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { config } from 'dotenv'

config()

import buildSchema from './schema'

let { APP_PORT } = process.env

let bootstrap = async () => {
  let server = new ApolloServer({ schema: await buildSchema() })
  let app = new Koa()

  server.applyMiddleware({ app })

  return new Promise(resolve => app.listen({ port: APP_PORT }, resolve))
}

bootstrap().then(() =>
  console.log(`🚀 Server ready at http://localhost:${APP_PORT}`)
)
