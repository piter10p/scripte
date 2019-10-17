import { IKeyEventConsumer } from './IKeyEventConsumer';
import { KeyEventConsumerContext } from './KeyEventConsumerContext';

export class BackspaceKeyEventConsumer implements IKeyEventConsumer {

    public handle(context: KeyEventConsumerContext ): void {

        if (this.isBackspace(context.event.key) && context.cursorPosition > 0) {
            context.documentBody.splice(context.cursorPosition - 1, 1);
            context.cursorPosition--;

            context.documentBodyUpdateCallback(context);
        }
    }

    private isBackspace(key: string): boolean {
        if (key === 'Backspace') {
          return true;
        }
        return false;
    }
}