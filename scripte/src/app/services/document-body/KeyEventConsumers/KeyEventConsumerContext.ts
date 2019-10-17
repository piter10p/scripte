import { TextRange } from '../TextRange';
import { DocumentBody } from '../DocumentBody';
import { DocumentPosition } from '../DocumentPosition';

export class KeyEventConsumerContext {

    public event: KeyboardEvent;
    public documentBody: DocumentBody;
    public cursorPosition: DocumentPosition;
    public selection: TextRange;

    public documentBodyUpdateCallback: (context: KeyEventConsumerContext) => any;
}
