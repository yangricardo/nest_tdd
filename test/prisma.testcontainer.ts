/**
 * Author: Yang Miranda <yangricardo17@gmail.com>
 */
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';

import { exec } from 'child_process';
import { PrismaModule } from 'nestjs-prisma';

const execCommandAsync = (command: string) => new Promise((resolve, reject) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      reject(error);
    } else {
      resolve(stdout);
    }
  });
});

/**
 * A module for setting up an end-to-end testing environment with a PostgreSQL database and Prisma ORM.
 */
export class E2EPostgresPrismaModule {
  /**
   * The singleton instance of the module.
   */
  private static instance: E2EPostgresPrismaModule;
  /**
   * The Testcontainers PostgreSQL container instance.
   */
  private container: StartedPostgreSqlContainer;

  private constructor() {}

  /**
   * Creates or returns the singleton instance of the module.
   * @returns The singleton instance of the module.
   */
  public static async getInstance(): Promise<E2EPostgresPrismaModule> {
    if (!E2EPostgresPrismaModule.instance) {
      E2EPostgresPrismaModule.instance = new E2EPostgresPrismaModule();
      await E2EPostgresPrismaModule.instance.initialize();
    }
    return E2EPostgresPrismaModule.instance;
  }

  /**
   * Initializes the module by starting the PostgreSQL container, initializing the Prisma module, and resetting the test database.
   */
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

  /**
   * Prepare the prisma module with the connection string from the container
   */
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

  /**
   * Cleans up the module by dropping the public schema, disconnecting the Prisma client, and stopping the PostgreSQL container.
   */

  private async resetTestDb() {    
    let cmdResponse = await execCommandAsync(`DATABASE_URL=${this.container.getConnectionUri()} yarn prisma:db:reset`);
    console.log('e2e:postgres:reset',cmdResponse);
    cmdResponse = await execCommandAsync(`DATABASE_URL=${this.container.getConnectionUri()} yarn prisma:db:push`);
    console.log('e2e:prisma:db:push',cmdResponse);
    
  }

  /**
   * Stop the container
   */
  public async stop() {
    await this.container.stop();
  }
};