  
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MG_URI: string;
      JWT_SECRET: string;
    }
  }
}

export {}