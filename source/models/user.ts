import { ObjectId } from "mongodb";

export default interface UserModel {
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  dateCreated: Number;
  dateUpdated: Number;
  id?: ObjectId;
}
