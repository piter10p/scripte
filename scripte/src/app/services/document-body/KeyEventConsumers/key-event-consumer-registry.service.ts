import { Injectable } from '@angular/core';
import { IKeyEventConsumer } from './IKeyEventConsumer';
import { WritableKeyEventConsumer } from './WritableKeyEventConsumer';
import { BackspaceKeyEventConsumer } from './BackspaceKeyEventConsumer';
import { CursorMoveKeyEventConsumer } from './CursorMoveKeyEventConsumer';
import { SelectingKeyEventConsumer } from './SelectingKeyEventConsumer';

@Injectable({
  providedIn: 'root'
})
export class KeyEventConsumerRegistryService {

  constructor() { }

  private keyEventConsumers: IKeyEventConsumer[] = [
    new WritableKeyEventConsumer(),
    new BackspaceKeyEventConsumer(),
    new SelectingKeyEventConsumer(),
    new CursorMoveKeyEventConsumer()
  ];

  public getKeyEventConsumers(): IKeyEventConsumer[] {
    return this.keyEventConsumers;
  }
}
