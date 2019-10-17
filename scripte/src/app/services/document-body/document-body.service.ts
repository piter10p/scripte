import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KeyEventConsumerContext } from './KeyEventConsumers/KeyEventConsumerContext';
import { KeyEventConsumerRegistryService } from './KeyEventConsumers/key-event-consumer-registry.service';
import { TextSelection } from './TextSelection';
import { DocumentPosition } from './DocumentPosition';
import { DocumentBody } from './DocumentBody';

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

  private documentBody: DocumentBody = new DocumentBody();
  private documentBodyChanged = new BehaviorSubject(this.documentBody);

  private cursorPosition: DocumentPosition = new DocumentPosition(0, 0);
  private cursorPositionChanged = new BehaviorSubject(this.cursorPosition);

  private selection: TextSelection;
  private selectionChanged = new BehaviorSubject(this.selection);

  public documentBodyChanged$ = this.documentBodyChanged.asObservable();
  public cursorPositionChanged$ = this.cursorPositionChanged.asObservable();
  public selectionChanged$ = this.selectionChanged.asObservable();

  private onKeydownHandler(event: KeyboardEvent) {
    this.keyEventConsumerRegistry.getKeyEventConsumers()
    .forEach(consumer => {
      const context = this.createKeyEventConsumerContext(event);
      consumer.handle(context);
    });
  }

  private createKeyEventConsumerContext(event: KeyboardEvent): KeyEventConsumerContext {
    const context = new KeyEventConsumerContext();
    context.event = event;
    context.documentBody = this.documentBody;
    context.cursorPosition = this.cursorPosition;
    context.selection = this.selection;
    context.documentBodyUpdateCallback = (c: KeyEventConsumerContext) => {
      this.documentBody = c.documentBody;
      this.cursorPosition = c.cursorPosition;
      this.selection = c.selection;

      this.documentBodyChanged.next(this.documentBody);
      this.cursorPositionChanged.next(this.cursorPosition);
      this.selectionChanged.next(this.selection);
    };

    return context;
  }
}
