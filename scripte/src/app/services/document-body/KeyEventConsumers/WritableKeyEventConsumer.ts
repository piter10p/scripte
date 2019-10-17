import { IKeyEventConsumer } from './IKeyEventConsumer';
import { KeyEventConsumerContext } from './KeyEventConsumerContext';
import { KeysBlacklist } from './KeysBlacklist';

export class WritableKeyEventConsumer implements IKeyEventConsumer {

    public handle(context: KeyEventConsumerContext ): void {
        if (KeysBlacklist.isKeyWritable(context.event.key)) {
            context.documentBody.getParagraph(context.cursorPosition).addCharacter(context.cursorPosition.character, context.event.key);
            context.cursorPosition.character++;

            context.documentBodyUpdateCallback(context);
        }
    }
}
