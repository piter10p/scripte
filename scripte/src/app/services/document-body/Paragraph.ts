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

    public removeCharacter(position: number) {
        this.characters.splice(position, 1);
    }

    public addCharacter(position: number, character: string) {
        this.characters.splice(position, 0, character);
    }

    public addCharacterRange(position: number, characters: string[]) {
        for (let i = position; i < position + characters.length; i++) {
            this.characters.splice(i, 0, characters[i - position]);
        }
    }
}
