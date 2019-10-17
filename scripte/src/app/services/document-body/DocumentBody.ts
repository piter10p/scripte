import { DocumentPosition } from './DocumentPosition';
import { Paragraph } from './Paragraph';

export class DocumentBody {
    private paragraphs: Paragraph[];

    constructor() {
        this.paragraphs = [
            Paragraph.createFromText('Hello world!'),
            Paragraph.createFromText('I\'m another paragraph! c:')
          ];
    }

    get paragraphsCount(): number {
        return this.paragraphs.length;
    }

    public getParagraph(position: DocumentPosition): Paragraph {
        return this.paragraphs[position.paragraph];
    }

    public addParagraph(position: DocumentPosition, paragraph: Paragraph) {
        this.paragraphs.splice(position.paragraph, 0, paragraph);
    }

    public removeParagraph(position: DocumentPosition) {
        this.paragraphs.splice(position.paragraph, 1);
    }
}
