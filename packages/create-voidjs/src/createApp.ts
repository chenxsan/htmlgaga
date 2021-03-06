import path from 'path'
import fs from 'fs-extra'
import os from 'os'
import install from './helpers/install'
import shouldUseYarn from './helpers/shouldUseYarn'
import chalk from 'chalk'

async function createApp(
  name: string,
  template = 'default',
  useNpm = false
): Promise<void> {
  const root = path.resolve(name)
  const appName = path.basename(root)

  // create dir if nonexistent
  fs.ensureDirSync(name)

  // just make sure dir is empty to use
  if (fs.readdirSync(root).length !== 0) {
    console.log(`${name} is not empty`)
    process.exit(1)
  }

  console.log()

  console.log(`Creating a new voidjs app in ${chalk.green(root)}.`)

  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'voidjs dev',
      build: 'voidjs build',
    },
  }

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  )

  console.log(
    `Installing ${chalk.cyan('voidjs-cli')}, ${chalk.cyan(
      'react'
    )} and ${chalk.cyan('react-dom')}...`
  )

  console.log()

  process.chdir(root)
  const useYarn = useNpm ? false : shouldUseYarn()
  const cmd = useYarn ? 'yarn' : 'npm'
  await install(root, ['react', 'react-dom', 'voidjs-cli'], { useYarn })

  console.log()

  // copy template into root
  fs.copySync(path.resolve(__dirname, '..', 'templates', template), root)
  fs.moveSync(path.join(root, 'gitignore'), path.join(root, '.gitignore'))
  fs.moveSync(
    path.join(root, 'browserslistrc'),
    path.join(root, '.browserslistrc')
  )

  console.log(`${chalk.green('Success!')} Created ${appName} at ${root}`)
  console.log('Inside that directory, you can run several commands:')
  console.log()
  console.log(chalk.cyan(`  ${cmd} ${useYarn ? '' : 'run '}dev`))
  console.log('    Starts the development server.')
  console.log()
  console.log(chalk.cyan(`  ${cmd} ${useYarn ? '' : 'run '}build`))
  console.log('    Builds the app for production.')
  console.log()
}
export default createApp
