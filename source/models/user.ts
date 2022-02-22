import { ObjectId } from "mongodb";

export default class UserModel {
  constructor(
    public username: string,
    public firstName: string,
    public lastName: string,
    public role: string,
    public password: string,
    public dateCreated: Number,
    public dateUpdated: Number,
    public id?: ObjectId
  ) {}
}

module.exports = UserModel;
