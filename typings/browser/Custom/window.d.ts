declare module "custom" {
  interface ExtendWindow extends Window {
    devToolsExtension:any
  }
  export let window:ExtendWindow
}
