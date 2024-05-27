export class EmpleadoN {
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public department: string,
        public contractType: string,
        public startdate: Date,
        public status: string,
        public discount: number,
    ) { }

    get nombre(): string {
        return `${this.name} ${this.surname}`;
    }
}
