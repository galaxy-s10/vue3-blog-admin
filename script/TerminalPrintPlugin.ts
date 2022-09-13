import chalk from 'chalk';

interface ITerminalPrintPlugin {
  local: string;
  network?: string;
}

class TerminalPrintPlugin {
  options: ITerminalPrintPlugin;

  constructor(options: ITerminalPrintPlugin) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync(
      'TerminalPrintPlugin',
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

export default TerminalPrintPlugin;
