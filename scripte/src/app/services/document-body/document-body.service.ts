import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KeyEventConsumerContext } from './KeyEventConsumers/KeyEventConsumerContext';
import { KeyEventConsumerRegistryService } from './KeyEventConsumers/key-event-consumer-registry.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentBodyService {

  constructor(keyEventConsumerRegistry: KeyEventConsumerRegistryService) {
    window.addEventListener('keydown', (event) =>
      this.onKeydownHandler(event));
  
    this.keyEventConsumerRegistry = keyEventConsumerRegistry;
  }

  private keyEventConsumerRegistry: KeyEventConsumerRegistryService;

  private documentBody: string[] = ['t', 'e', 's', 't'];
  private documentBodyChanged = new BehaviorSubject(this.documentBody);

  private cursorPosition: number = 0;
  private cursorPositionChanged = new BehaviorSubject(this.cursorPosition);

  public documentBodyChanged$ = this.documentBodyChanged.asObservable();
  public cursorPositionChanged$ = this.cursorPositionChanged.asObservable();

  private onKeydownHandler(event: KeyboardEvent) {

    const context = this.createKeyEventConsumerContext(event);

    this.keyEventConsumerRegistry.getKeyEventConsumers()
    .forEach(consumer => {
      consumer.handle(context);
    });
  }

  private createKeyEventConsumerContext(event: KeyboardEvent): KeyEventConsumerContext {
    const context = new KeyEventConsumerContext();
    context.event = event;
    context.documentBody = this.documentBody;
    context.cursorPosition = this.cursorPosition;
    context.documentBodyUpdateCallback = (c: KeyEventConsumerContext) => {
      this.documentBody = c.documentBody;
      this.cursorPosition = c.cursorPosition;

      this.documentBodyChanged.next(this.documentBody);
      this.cursorPositionChanged.next(this.cursorPosition);
    };

    return context;
  }
}
