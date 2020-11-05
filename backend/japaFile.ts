import 'reflect-metadata'
import execa from 'execa'
import { join } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'

process.env.NODE_ENV = 'testing'
process.env.DB_CONNECTION = 'sqlite'
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })

async function startHttpServer () {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

async function runMigrations () {
  await execa.node('ace', ['migration:run'], {
    stdio: 'inherit',
  })
}

async function rollbackMigrations () {
  await execa.node('ace', ['migration:rollback'], {
    stdio: 'inherit',
  })
}

function getTestFiles () {
  let userDefined = process.argv.slice(2)[0]
  if (!userDefined) {
    return 'test/**/*.spec.ts'
  }

  return `${userDefined.replace(/\.ts$|\.js$/, '')}.ts`
}

/**
 * Configure test runner
 */
configure({
  files: getTestFiles(),
  before: [
    runMigrations,
    startHttpServer,
  ],
  after: [rollbackMigrations],
})
