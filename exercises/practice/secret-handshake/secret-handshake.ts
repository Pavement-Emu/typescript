export default class Handshake {
  _commands: string[] = [];
  constructor(private code: number) {
    const commandBits = ["wink", "double blink", "close your eyes", "jump"];

    this._commands = commandBits.filter((_, idx: number) => {
      const base2 = 2 ** idx;
      const isThisCommandBitSet = (code & base2) === base2;
      return isThisCommandBitSet;
    });
    if ((code & 16) === 16) {
      this._commands = this._commands.reverse();
    }
  }

  commands(): string[] {
    return this._commands;
  }
}
