export class User {
  public id?: string | null = null;
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public username: string = '';
  public password: string = '';
  public role: string = '';
  public emergencyContactName?: string = '';

  constructor();
  constructor(firstName: string, lastName: string, email: string, role: string, id?: string, username?: string, password?: string);
  constructor(firstName?: string, lastName?: string, email?: string, role?: string, id?: string, username?: string, password?: string) {
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (email) this.email = email;
    if (role) this.role = role;
    if (id) this.id = id;
    if (username) this.username = username;
    if (password) this.password = password;
  }
}
