import { Component, OnInit } from '@angular/core';
import { DocumentBodyService } from '../services/document-body/document-body.service';
import { TextSelection } from '../services/document-body/TextSelection';
import { DocumentPosition } from '../services/document-body/DocumentPosition';
import { DocumentBody } from '../services/document-body/DocumentBody';

@Component({
  selector: 'app-text-renderer',
  templateUrl: './text-renderer.component.html',
  styleUrls: ['./text-renderer.component.css']
})
export class TextRendererComponent implements OnInit {

  constructor(private documentBodyService: DocumentBodyService) {
  }

  private documentBody: DocumentBody;
  private cursorPosition: DocumentPosition;
  private textSelection: TextSelection;

  private isCharInSelection(position: DocumentPosition) {
    if (this.textSelection) {
      return this.textSelection.inRange(position);
    }
    return false;
  }

  private createDocumentPosition(paragraphIndex: number, charIndex: number) {
    return new DocumentPosition(paragraphIndex, charIndex);
  }

  ngOnInit() {
    this.documentBodyService.documentBodyChanged$.subscribe((value: DocumentBody) => {
      this.documentBody = value;
    });

    this.documentBodyService.cursorPositionChanged$.subscribe((value: DocumentPosition) => {
      this.cursorPosition = value;
    });

    this.documentBodyService.selectionChanged$.subscribe((value: TextSelection) => {
      this.textSelection = value;
    });
  }
}
