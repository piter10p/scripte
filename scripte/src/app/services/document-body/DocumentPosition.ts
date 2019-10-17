export class DocumentPosition {

    public paragraph: number;
    public character: number;

    constructor(paragraph: number = 0, character: number = 0) {
        this.paragraph = paragraph;
        this.character = character;
    }

    public equals(position: DocumentPosition): boolean {
        return this.paragraph === position.paragraph && this.character === position.character;
    }

    public smallerOrEqual(position: DocumentPosition): boolean {
        return this.paragraph <= position.paragraph && this.character <= position.character;
    }

    public greaterOrEqual(position: DocumentPosition): boolean {
        return this.paragraph >= position.paragraph && this.character >= position.character;
    }
}
