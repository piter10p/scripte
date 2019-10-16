import { IKeyEventConsumer } from './IKeyEventConsumer';
import { KeyEventConsumerContext } from './KeyEventConsumerContext';
import { KeysBlacklist } from './KeysBlacklist';

export class WritableKeyEventConsumer implements IKeyEventConsumer {

    public handle(context: KeyEventConsumerContext ): void {
        if (this.keyIsWritable(context.event.key)) {
            context.documentBody.splice(context.cursorPosition, 0, context.event.key);
            context.cursorPosition++;

            context.documentBodyUpdateCallback(context);
          }
    }

    private keyIsWritable(key: string): boolean {
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
