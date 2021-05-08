  
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      MG_URI: string;
    }
  }
}

export {}