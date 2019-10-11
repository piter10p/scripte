import { Component, OnInit } from '@angular/core';
import { DocumentBodyService } from '../services/document-body/document-body.service';

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

  ngOnInit() {
    this.documentBodyService.documentBodyChanged$.subscribe((value: string[]) => {
      this.text = value;
    });

    this.documentBodyService.cursorPositionChanged$.subscribe((value: number) => {
      this.cursorPosition = value;
    });
  }
}
