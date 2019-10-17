import { IKeyEventConsumer } from './IKeyEventConsumer';
import { KeyEventConsumerContext } from './KeyEventConsumerContext';
import { TextSelection } from '../TextSelection';
import { KeysBlacklist } from './KeysBlacklist';

export class SelectingKeyEventConsumer implements IKeyEventConsumer {
    handle(context: KeyEventConsumerContext ): void {
        this.selectingLogic(context);
        this.clearSelectionLogic(context);
    }

    private selectingLogic(context: KeyEventConsumerContext) {
        const key = context.event.key;

        if (context.event.ctrlKey) {
            if (key === 'ArrowLeft' && context.cursorPosition > 0) {
                if (!context.selection) {
                    context.selection = new TextSelection(context.cursorPosition - 1, context.cursorPosition - 1);
                } else {
                    context.selection.end--;
                }

                context.documentBodyUpdateCallback(context);
            } else if (key === 'ArrowRight' && context.cursorPosition < context.documentBody.length) {
                if (!context.selection) {
                    context.selection = new TextSelection(context.cursorPosition, context.cursorPosition);
                } else {
                    context.selection.end++;
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
}
