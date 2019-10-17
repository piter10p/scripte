import { IKeyEventConsumer } from './IKeyEventConsumer';
import { KeyEventConsumerContext } from './KeyEventConsumerContext';

export class CursorMoveKeyEventConsumer implements IKeyEventConsumer {

    public handle(context: KeyEventConsumerContext ): void {
        const key = context.event.key;

        switch (key) {
            case 'ArrowLeft':
                switch (true) {
                    case context.cursorPosition.character > 0:
                        this.moveCursorLeft(context);
                        break;

                    case context.cursorPosition.paragraph > 0:
                        this.moveCursorNextParagraph(context);
                        break;
                }
                break;

            case 'ArrowRight':
                switch (true) {
                    case context.cursorPosition.character < this.getCurrentParagraphLength(context):
                        this.moveCursorRight(context);
                        break;

                    case context.cursorPosition.paragraph < context.documentBody.paragraphsCount - 1:
                        this.moveCursorPreviousParagraph(context);
                        break;
                }
                break;
        }
    }

    private getCurrentParagraphLength(context: KeyEventConsumerContext): number {
        return context.documentBody.getParagraph(context.cursorPosition).length;
    }

    private moveCursorLeft(context: KeyEventConsumerContext) {
        context.cursorPosition.character--;
        context.documentBodyUpdateCallback(context);
    }

    private moveCursorRight(context: KeyEventConsumerContext) {
        context.cursorPosition.character++;
        context.documentBodyUpdateCallback(context);
    }

    private moveCursorNextParagraph(context: KeyEventConsumerContext) {
        context.cursorPosition.paragraph--;
        context.cursorPosition.character = this.getCurrentParagraphLength(context);
        context.documentBodyUpdateCallback(context);
    }

    private moveCursorPreviousParagraph(context: KeyEventConsumerContext) {
        context.cursorPosition.paragraph++;
        context.cursorPosition.character = 0;
        context.documentBodyUpdateCallback(context);
    }
}
