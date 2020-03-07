import yargs from 'yargs';
import rimraf from 'rimraf';
import { existsSync } from 'fs';
import * as path from 'path';
import { logger, cwd } from './config';
import DevServer from './DevServer';
import Builder from './Builder';

yargs
  .scriptName('htmlgaga')
  .usage(`$0 <cmd> [args]`)
  .command(
    'dev',
    'Run development server',
    {
      host: {
        default: 'localhost',
        description: 'Host to run server'
      },
      port: {
        default: 8080,
        description: 'Port to run server'
      }
    },
    async function(argv) {
      const { host, port } = argv;
      const pagesDir = path.resolve(cwd, 'pages');
      const server = new DevServer(pagesDir, { host, port });
      server.start();
    }
  )
  .command(
    'build',
    'Build static html & assets',
    {
      dest: {
        default: 'out',
        description: 'The output directory'
      }
    },
    function(argv) {
      const pagesDir = path.resolve(cwd, 'pages');
      if (!existsSync(pagesDir)) {
        throw new Error(
          "Couldn't find a `pages` directory. Make sure you have it under the project root"
        );
      }

      const { dest } = argv;
      const outDir = path.resolve(cwd, dest);
      // Clean outDir first
      rimraf(outDir, err => {
        if (err) return logger.error(err);
        const builder = new Builder(pagesDir, outDir);
        builder.run();
      });
    }
  )
  .help().argv;
