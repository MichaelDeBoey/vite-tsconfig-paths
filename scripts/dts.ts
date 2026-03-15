import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { isolatedDeclarationSync } from 'oxc-transform'

const srcDir = 'src'
const outDir = 'dist'

const files = readdirSync(srcDir).filter((file) => file.endsWith('.ts'))

for (const file of files) {
  const srcPath = join(srcDir, file)
  const source = readFileSync(srcPath, 'utf8')
  const { code, errors } = isolatedDeclarationSync(srcPath, source)

  if (errors.length > 0) {
    console.error(`Failed to generate declarations for ${srcPath}:`)
    for (const error of errors) {
      console.error(error.codeframe ?? error.message)
    }
    process.exit(1)
  }

  const dtsFile = basename(file, '.ts') + '.d.ts'
  writeFileSync(join(outDir, dtsFile), code)
}

console.log(`DTS ${files.length} declaration files (oxc-transform)`)
