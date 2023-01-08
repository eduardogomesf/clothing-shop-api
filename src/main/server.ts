import { NestFactory } from '@nestjs/core'
import { ENVS } from './configs'
import { AppModule } from './modules'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  await app.listen(ENVS.APP.PORT, () => console.log(`Running on port ${ENVS.APP.PORT}`))
}

bootstrap()
