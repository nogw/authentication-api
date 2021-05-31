  
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MG_URI: string;
      JWT_SECRET: string;
      EMAIL2SEND: string;
      PASSWORD2SEND: string
    }
  }
}

export {}