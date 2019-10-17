import { Injectable } from '@angular/core';
import { IKeyEventConsumer } from './IKeyEventConsumer';
import { WritableKeyEventConsumer } from './WritableKeyEventConsumer';
import { BackspaceKeyEventConsumer } from './BackspaceKeyEventConsumer';
import { CursorMoveKeyEventConsumer } from './CursorMoveKeyEventConsumer';

@Injectable({
  providedIn: 'root'
})
export class KeyEventConsumerRegistryService {

  constructor() { }

  private keyEventConsumers: IKeyEventConsumer[] = [
    new WritableKeyEventConsumer(),
    new BackspaceKeyEventConsumer(),
    new CursorMoveKeyEventConsumer()
  ];

  public getKeyEventConsumers(): IKeyEventConsumer[] {
    return this.keyEventConsumers;
  }
}
