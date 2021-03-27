export default class Handshake {
  _commands: string[] = [];
  constructor(private code: number) {
    const commandBits = ["wink", "double blink", "close your eyes", "jump"];

    this._commands = commandBits.filter(
      (_: string, idx: number) => (code & (2 ** idx)) === 2 ** idx
    );
    if ((code & 16) === 16) {
      this._commands = this._commands.reverse();
    }
  }

  commands(): string[] {
    return this._commands;
  }
}
