import { KeyEventConsumerContext } from './KeyEventConsumerContext';

export interface IKeyEventConsumer {

    handle(context: KeyEventConsumerContext ): void;
}
