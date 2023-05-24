import {Fav} from "./Fav";
import {
   Column,
   DataType,
   HasMany,
   Model,
   Table,
} from "sequelize-typescript/dist";

@Table
export class User extends Model<User, UserAttributes> {
   @Column({
      type: DataType.STRING,
      allowNull: false,
   })
   declare name: string;

   @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
   })
   declare email: string;

   @Column({
      type: DataType.STRING,
      allowNull: false,
   })
   declare password: string;

   @HasMany(() => Fav, {
      foreignKey: "userId",
   })
   declare favs: Fav[];
}

export interface UserAttributes {
   name: string;
   email: string;
   password: string;
}
