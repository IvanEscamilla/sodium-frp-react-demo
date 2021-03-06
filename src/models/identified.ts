export type Identifier = number;

/** Just assigns an identifier to some data */
export class Identified<D> {
    public static lastId = 0;

    private constructor(public readonly data: D, public readonly id: Identifier) {
    }

    toString() {
        return `${this.constructor.name}#${this.id}`;
    }

    public static register(id: Identifier) {
        Identified.lastId = Math.max(Identified.lastId, id);
    }

    public static getNextId(): Identifier {
        return (++Identified.lastId);
    }

    public static getId(m: Identified<any>) {
        return m.id;
    }

    public static create<D>(data: D): Identified<D> {
        return new Identified<D>(data, Identified.getNextId())
    }

    public static from<D>(id: Identifier, data: D): Identified<D> {
        Identified.register(id);
        return new Identified<D>(data, id);
    }
}

