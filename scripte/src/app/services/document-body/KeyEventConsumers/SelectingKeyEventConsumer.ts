import { IKeyEventConsumer } from './IKeyEventConsumer';
import { KeyEventConsumerContext } from './KeyEventConsumerContext';
import { TextSelection } from '../TextSelection';
import { KeysBlacklist } from './KeysBlacklist';
import { DocumentPosition } from '../DocumentPosition';

export class SelectingKeyEventConsumer implements IKeyEventConsumer {
    handle(context: KeyEventConsumerContext ): void {
        this.selectingLogic(context);
        this.clearSelectionLogic(context);
    }

    private selectingLogic(context: KeyEventConsumerContext) {
        const key = context.event.key;

        if (context.event.ctrlKey) {
            if (key === 'ArrowLeft' && context.cursorPosition.character > 0) {
                if (!context.selection) {
                    context.selection = new TextSelection(
                        new DocumentPosition(context.cursorPosition.paragraph, context.cursorPosition.character - 1),
                        new DocumentPosition(context.cursorPosition.paragraph, context.cursorPosition.character - 1)
                    );
                } else {
                    context.selection.end.character--;
                }

                context.documentBodyUpdateCallback(context);
            } else if (key === 'ArrowRight' && context.cursorPosition.character < this.getCurrentParagraphLength(context)) {
                if (!context.selection) {
                    context.selection = new TextSelection(
                        new DocumentPosition(context.cursorPosition.paragraph, context.cursorPosition.character),
                        new DocumentPosition(context.cursorPosition.paragraph, context.cursorPosition.character)
                    );
                } else {
                    context.selection.end.character++;
                }

                context.documentBodyUpdateCallback(context);
            }
        }
    }

    private clearSelectionLogic(context: KeyEventConsumerContext) {
        const key = context.event.key;

        if (!context.event.ctrlKey && this.isKeyClearingSelection(key)) {
            context.selection = null;
            context.documentBodyUpdateCallback(context);
        }
    }

    private isKeyClearingSelection(key: string): boolean {
        return key === 'ArrowLeft' || key === 'ArrowRight' || KeysBlacklist.isKeyWritable(key);
    }

    private getCurrentParagraphLength(context: KeyEventConsumerContext): number {
        return context.documentBody.getParagraph(context.cursorPosition).length;
    }
}
