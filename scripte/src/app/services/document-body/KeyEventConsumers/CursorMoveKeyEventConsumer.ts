import { IKeyEventConsumer } from './IKeyEventConsumer';
import { KeyEventConsumerContext } from './KeyEventConsumerContext';

export class CursorMoveKeyEventConsumer implements IKeyEventConsumer {

    public handle(context: KeyEventConsumerContext ): void {
        const key = context.event.key;

        if (key === 'ArrowLeft' && context.cursorPosition > 0) {
            context.cursorPosition--;
            context.documentBodyUpdateCallback(context);
        } else if (key === 'ArrowRight' && context.cursorPosition < context.documentBody.length) {
            context.cursorPosition++;
            context.documentBodyUpdateCallback(context);
        }
    }
}
