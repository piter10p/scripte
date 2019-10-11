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

  private documentBody: string = "test-body";
  private documentBodyChanged = new BehaviorSubject(this.documentBody);

  public documentBodyChanged$ = this.documentBodyChanged.asObservable();

  private onKeydownHandler(event: KeyboardEvent) {

    if(this.keyIsWritable(event.key)) {
      this.documentBody += event.key;
      this.documentBodyChanged.next(this.documentBody);
    }
    else if(this.keyIsBackspace(event.key)) {
      this.documentBody = this.documentBody.slice(null, this.documentBody.length - 1);
      this.documentBodyChanged.next(this.documentBody);
    }
  }

  private keyIsWritable(key: string): boolean {

    var writable = true;

    KeysBlacklist.BlacklistedKeys.forEach(k => {
      if(key == k) {
        writable = false;
        return;
      }
    });

    return writable;
  }

  private keyIsBackspace(key: string): boolean {
    if(key == "Backspace")
      return true;
    return false;
  }
}
