export class TextSelection {

    constructor(start: number = 0, end: number = 0) {
        this.start = start;
        this.end = end;
    }

    public start;
    public end;

    public inRange(value: number): boolean {
        return (value >= this.start && value <= this.end) || (value <= this.start && value >= this.end);
    }
}
