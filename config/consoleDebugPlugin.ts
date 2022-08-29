import chalk from 'chalk';

interface IConsoleDebugPlugin {
  local: string;
  network?: string;
}

class ConsoleDebugPlugin {
  options: IConsoleDebugPlugin;

  constructor(options: IConsoleDebugPlugin) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync(
      'ConsoleDebugPlugin',
      (compilation, callback) => {
        console.log('  App running at:');
        console.log(`- Local:   ${chalk.cyan(this.options.local)}`);
        console.log(`- Network: ${chalk.cyan(this.options.network)}`);
        console.log();
        callback();
      }
    );
  }
}

export default ConsoleDebugPlugin;
