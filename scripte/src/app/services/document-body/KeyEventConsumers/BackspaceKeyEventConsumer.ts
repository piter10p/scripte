import { IKeyEventConsumer } from './IKeyEventConsumer';
import { KeyEventConsumerContext } from './KeyEventConsumerContext';

export class BackspaceKeyEventConsumer implements IKeyEventConsumer {

    public handle(context: KeyEventConsumerContext ): void {

        if (context.event.key === 'Backspace') {
            switch (true) {
                case context.cursorPosition.character > 0:
                    context.documentBody.getParagraph(context.cursorPosition).removeCharacter(context.cursorPosition.character - 1);
                    context.cursorPosition.character--;
                    context.documentBodyUpdateCallback(context);
                    break;

                case context.cursorPosition.paragraph > 0:
                    const text = context.documentBody.getParagraph(context.cursorPosition).text;
                    context.documentBody.removeParagraph(context.cursorPosition);

                    context.cursorPosition.paragraph--;
                    const targetParagraph = context.documentBody.getParagraph(context.cursorPosition);
                    context.cursorPosition.character = targetParagraph.length;
                    targetParagraph.addCharacterRange(context.cursorPosition.character, text);
            }
        }
    }
}
