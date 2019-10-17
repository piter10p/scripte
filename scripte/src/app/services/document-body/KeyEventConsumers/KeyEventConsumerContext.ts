import { TextSelection } from '../TextSelection';

export class KeyEventConsumerContext {

    public event: KeyboardEvent;
    public documentBody: string[];
    public cursorPosition: number;
    public selection: TextSelection;

    public documentBodyUpdateCallback: (context: KeyEventConsumerContext) => any;
}
