
export class User {

  public name: string;
  public email: string;
  public uid: string;

  constructor(obj: DataObj ) {

    this.name = obj && obj.name || null;
    this.uid = obj && obj.uid || null;
    this.email = obj && obj.email || null;
  }

}
interface DataObj {

  uid: string;
  email: string;
  name: string;
}
