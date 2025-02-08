declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_DB_IP      : string;
    MONGODB_TIME     : string;
    MONGO_DB_PORT    : string;
    MOGNO_DB_USER    : string;
    MONGO_DB_NAME    : string;
    MONGO_DB_PASSWORD: string;
    MONGO_DB_AUTH_USR: string;

    APPLICATION_PORT: string;
    APPLICATION_HOST: string;
    APPLICATION_NAME: string;
    APPLICATION_TIME: string;

  }
}
