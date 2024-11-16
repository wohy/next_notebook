declare global {
    interface GlobalThis {
      [key: string]: any;  // 允许动态访问 globalThis 上的属性
    }

    interface Window {
      [key: string]: any;
    }
  
}

declare module 'sanitize-html'
