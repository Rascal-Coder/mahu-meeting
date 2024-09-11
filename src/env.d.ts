/// <reference types="@rsbuild/core/types" />
declare namespace NodeJS {
  interface ProcessEnv {
    // process.env.PUBLIC_FIREBASE_API_KEY
    PUBLIC_FIREBASE_API_KEY: string;
    PUBLIC_ZEGOCLOUD_APP_ID: string;
    PUBLIC_ZEGOCLOUD_SERVER_SECRET: string;
  }
}
interface ImportMetaEnv {
  // import.meta.env.PUBLIC_FIREBASE_API_KEY
  readonly PUBLIC_FIREBASE_API_KEY: string;
  readonly PUBLIC_ZEGOCLOUD_APP_ID: string;
  readonly PUBLIC_ZEGOCLOUD_SERVER_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
