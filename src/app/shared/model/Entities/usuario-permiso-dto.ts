export class UsuarioPermisoDto {
  constructor(
    public firstname: string,
    public lastname: string,
    public username: string,
    public id: number,
    public roles: string[]

  ) { }
}
