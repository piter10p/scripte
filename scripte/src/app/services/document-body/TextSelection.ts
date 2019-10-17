import { DocumentPosition } from './DocumentPosition';

export class TextSelection {

    constructor(start: DocumentPosition, end: DocumentPosition) {
        this.start = start;
        this.end = end;
    }

    public start: DocumentPosition;
    public end: DocumentPosition;

    public inRange(value: DocumentPosition): boolean {
        return (value.greaterOrEqual(this.start) && value.smallerOrEqual(this.end)
            || value.smallerOrEqual(this.start) && value.greaterOrEqual(this.end));
    }
}
