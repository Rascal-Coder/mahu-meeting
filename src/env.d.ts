/// <reference types="@rsbuild/core/types" />
declare namespace NodeJS {
  interface ProcessEnv {
    // process.env.PUBLIC_FIREBASE_API_KEY
    PUBLIC_FIREBASE_API_KEY: string;
  }
}
interface ImportMetaEnv {
  // import.meta.env.PUBLIC_FIREBASE_API_KEY
  readonly PUBLIC_FIREBASE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
