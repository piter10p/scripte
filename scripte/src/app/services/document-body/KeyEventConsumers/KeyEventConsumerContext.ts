import { TextSelection } from '../TextSelection';
import { DocumentBody } from '../DocumentBody';
import { DocumentPosition } from '../DocumentPosition';

export class KeyEventConsumerContext {

    public event: KeyboardEvent;
    public documentBody: DocumentBody;
    public cursorPosition: DocumentPosition;
    public selection: TextSelection;

    public documentBodyUpdateCallback: (context: KeyEventConsumerContext) => any;
}
