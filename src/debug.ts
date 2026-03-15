import createDebug from 'debug'

export const debug: createDebug.Debugger = createDebug('vite-tsconfig-paths')

if (process.env.TEST === 'vite-tsconfig-paths') {
  createDebug.enable('vite-tsconfig-paths')
}
