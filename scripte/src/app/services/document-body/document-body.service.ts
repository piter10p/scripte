import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KeysBlacklist } from './KeysBlacklist';

@Injectable({
  providedIn: 'root'
})
export class DocumentBodyService {

  constructor() {
    window.addEventListener('keydown', (event) =>
      this.onKeydownHandler(event));
  }

  private documentBody: string[] = ['t', 'e', 's', 't'];
  private documentBodyChanged = new BehaviorSubject(this.documentBody);

  private cursorPosition: number = 0;
  private cursorPositionChanged = new BehaviorSubject(this.cursorPosition);

  public documentBodyChanged$ = this.documentBodyChanged.asObservable();
  public cursorPositionChanged$ = this.cursorPositionChanged.asObservable();

  private onKeydownHandler(event: KeyboardEvent) {
    this.writableLogic(event);
    this.backspaceLogic(event);
    this.arrowsLogic(event);
  }

  private writableLogic(event: KeyboardEvent) {
    if (this.keyIsWritable(event.key)) {
      this.documentBody.splice(this.cursorPosition, 0, event.key);
      this.cursorPosition++;

      this.updateDocumentBody();
      this.updateCursorPosition();
    }
  }

  private backspaceLogic(event: KeyboardEvent) {
    if (this.keyIsBackspace(event.key) && this.cursorPosition > 0) {
      this.documentBody.splice(this.cursorPosition - 1, 1);
      this.cursorPosition--;

      this.updateDocumentBody();
      this.updateCursorPosition();
    }
  }

  private arrowsLogic(event: KeyboardEvent) {
    const key = event.key;

    if (key === 'ArrowLeft' && this.cursorPosition > 0) {
      this.cursorPosition--;
      this.updateCursorPosition();
    } else if (key === 'ArrowRight' && this.cursorPosition < this.documentBody.length) {
      this.cursorPosition++;
      this.updateCursorPosition();
    }
  }

  private keyIsWritable(key: string): boolean {
    let writable = true;

    KeysBlacklist.BlacklistedKeys.forEach(k => {
      if (key === k) {
        writable = false;
        return;
      }
    });

    return writable;
  }

  private keyIsBackspace(key: string): boolean {
    if (key === 'Backspace') {
      return true;
    }
    return false;
  }

  private updateDocumentBody() {
    this.documentBodyChanged.next(this.documentBody);
  }

  private updateCursorPosition() {
    this.cursorPositionChanged.next(this.cursorPosition);
  }
}
