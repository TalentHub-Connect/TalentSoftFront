// src/app/shared/model/causal.ts
export class Reason {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public createForUser?: string  // El creador es opcional
    ) { }
}
