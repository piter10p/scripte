import { IKeyEventConsumer } from './IKeyEventConsumer';
import { KeyEventConsumerContext } from './KeyEventConsumerContext';
import { Paragraph } from '../Paragraph';
import { DocumentPosition } from '../DocumentPosition';

export class NewParagraphKeyEventConsumer implements IKeyEventConsumer {
    handle(context: KeyEventConsumerContext ): void {
        if (context.event.key === 'Enter') {
            const actualParagraph = context.documentBody.getParagraph(context.cursorPosition);
            const charsAfterCursor = actualParagraph.cutCharacterRange(context.cursorPosition.character, actualParagraph.length);
            const newParagraph = new Paragraph(charsAfterCursor);
            context.documentBody.addParagraph(new DocumentPosition(context.cursorPosition.paragraph + 1, 0), newParagraph);

            context.cursorPosition.paragraph++;
            context.cursorPosition.character = 0;

            context.documentBodyUpdateCallback(context);
        }
    }
}
