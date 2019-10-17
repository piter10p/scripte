import { Component, OnInit } from '@angular/core';
import { DocumentBodyService } from '../services/document-body/document-body.service';
import { TextSelection } from '../services/document-body/TextSelection';

@Component({
  selector: 'app-text-renderer',
  templateUrl: './text-renderer.component.html',
  styleUrls: ['./text-renderer.component.css']
})
export class TextRendererComponent implements OnInit {

  constructor(private documentBodyService: DocumentBodyService) {
  }

  private text: string[];
  private cursorPosition: number = 0;
  private textSelection: TextSelection;

  private isCharInSelection(position: number) {
    if (this.textSelection) {
      return this.textSelection.inRange(position);
    }
    return false;
  }

  ngOnInit() {
    this.documentBodyService.documentBodyChanged$.subscribe((value: string[]) => {
      this.text = value;
    });

    this.documentBodyService.cursorPositionChanged$.subscribe((value: number) => {
      this.cursorPosition = value;
    });

    this.documentBodyService.selectionChanged$.subscribe((value: TextSelection) => {
      this.textSelection = value;
    });
  }
}
