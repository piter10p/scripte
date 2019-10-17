export class KeysBlacklist {
    public static readonly BlacklistedKeys: string[] = [
        //Basic
        'Shift',
        'Alt',
        'Control',
        'AltGraph',
        'Backspace',
        'Enter',
        'Meta',
        'Escape',
        'Tab',
        'CapsLock',
        'NumLock',
        'ContextMenu',
    
        //Functional
        'Insert',
        'Delete',
        'Home',
        'End',
        'PageUp',
        'PageDown',
        'ScrollLock',
        'Pause',
    
        //FKeys
        'F1',
        'F2',
        'F3',
        'F4',
        'F5',
        'F6',
        'F7',
        'F8',
        'F9',
        'F10',
        'F11',
        'F12',

        //Arrows
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight'
      ];

    public static isKeyWritable(key: string): boolean {
      let writable = true;

      KeysBlacklist.BlacklistedKeys.forEach(k => {
          if (key === k) {
          writable = false;
          return;
          }
      });

      return writable;
    }
}
