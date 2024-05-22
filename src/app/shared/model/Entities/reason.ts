export class Reason {
    id: number;
    name: string;
    description: string;
    createForUser: string;
    companyId: number;

    constructor(id: number = 0, name: string = '', description: string = '', createForUser: string = 'Admin', companyId: number = 0) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createForUser = createForUser;
        this.companyId = companyId;
    }
}
