export class UsuarioPermisoDto {
  constructor(
    public name: string,
    public lastname: string,
    public username: string,
    public id: number,
    public roles: string[]

  ) {}
}
