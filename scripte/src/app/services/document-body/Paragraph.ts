import { TextRange } from './TextRange';

export class Paragraph {

    constructor(chars: string[] = []) {
        this.characters = chars;
    }

    private characters: string[];

    static createFromText(text: string): Paragraph {
        const chars = Array.from(text);
        return new Paragraph(chars);
    }

    get length(): number {
        return this.characters.length;
    }

    get text(): string[] {
        return this.characters;
    }

    public getCharacter(position: number): string {
        return this.characters[position];
    }

    public addCharacter(position: number, character: string) {
        this.characters.splice(position, 0, character);
    }

    public removeCharacter(position: number) {
        this.characters.splice(position, 1);
    }

    public cutCharacter(position: number): string {
        const char = this.getCharacter(position);
        this.removeCharacter(position);
        return char;
    }

    public getCharacterRange(start: number, end: number): string[] {
        return this.characters.slice(start, end);
    }

    public addCharacterRange(position: number, characters: string[]) {
        for (let i = position; i < position + characters.length; i++) {
            this.characters.splice(i, 0, characters[i - position]);
        }
    }

    public removeCharacterRange(start: number, end: number) {
        this.characters.splice(start, end - start);
    }

    public cutCharacterRange(start: number, end: number): string[] {
        const chars = this.getCharacterRange(start, end);
        this.removeCharacterRange(start, end);
        return chars;
    }
}
