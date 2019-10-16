export class KeyEventConsumerContext {

    public event: KeyboardEvent;
    public documentBody: string[];
    public cursorPosition: number;

    public documentBodyUpdateCallback: (context: KeyEventConsumerContext) => any;
}
