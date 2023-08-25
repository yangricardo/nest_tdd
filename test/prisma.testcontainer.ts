import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';

import { exec } from 'child_process';
import { PrismaModule } from 'nestjs-prisma';
// import { GenericContainer } from 'testcontainers';
const execCommandAsync = (command: string) => new Promise((resolve, reject) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      reject(error);
    } else {
      resolve(stdout);
    }
  });
});

export class E2EPostgresPrismaModule {
  private static instance: E2EPostgresPrismaModule;
  private container: StartedPostgreSqlContainer;

  private constructor() {}

  public static async getInstance(): Promise<E2EPostgresPrismaModule> {
    if (!E2EPostgresPrismaModule.instance) {
      E2EPostgresPrismaModule.instance = new E2EPostgresPrismaModule();
      await E2EPostgresPrismaModule.instance.initialize();
    }
    return E2EPostgresPrismaModule.instance;
  }

  private async initialize() {    
    // const postgresContainer = new GenericContainer("postgres:15.3-alpine3.18");
    this.container = await new PostgreSqlContainer("postgres:15.3-alpine3.18")  
    .withCommand(["-p 5432"])
    .withExposedPorts({
      container: 5432,
      host: 25432
    })
    .withName('e2e.postgres.testcontainer')
    .withDatabase('test')
    .withUsername('test')
    .withPassword('test')
    .withReuse()    
    .withTmpFs({ [`/var/lib/postgresql/data`]: "rw,exec" })
    .start();    
    await this.resetTestDb();
  }

  public async getPrismaModule() {
    console.log('e2e:postgres:uri',this.container.getConnectionUri());
    
    const prismaModule = PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          datasourceUrl: this.container.getConnectionUri()
        }
      }
    });    
    return prismaModule;
  }

  private async resetTestDb() {    
    let cmdResponse = await execCommandAsync(`DATABASE_URL=${this.container.getConnectionUri()} yarn prisma:db:reset`);
    console.log('e2e:postgres:reset',cmdResponse);
    cmdResponse = await execCommandAsync(`DATABASE_URL=${this.container.getConnectionUri()} yarn prisma:db:push`);
    console.log('e2e:prisma:db:push',cmdResponse);
    
  }
  public async stop() {
    await this.container.stop();
  }
};