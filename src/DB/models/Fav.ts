import {
   BelongsTo,
   Column,
   DataType,
   Model,
   Table,
} from "sequelize-typescript/dist";
import {FavList} from "./FavList";
import {User} from "./User";

@Table
export class Fav extends Model<Fav, FavAttributes> {
   @Column({
      type: DataType.STRING,
      allowNull: false,
   })
   declare title: string;

   @Column({
      type: DataType.STRING,
      allowNull: false,
   })
   declare description: string;

   @Column({
      type: DataType.STRING,
      allowNull: false,
   })
   declare link: string;

   @Column({
      type: DataType.INTEGER,
      allowNull: false,
   })
   declare userId: number;

   @BelongsTo(() => User, {
      foreignKey: "userId",
   })
   declare user: User;

   @Column({
      type: DataType.INTEGER,
      allowNull: false,
   })
   declare favListId: number;

   @BelongsTo(() => FavList, {
      foreignKey: "favListId",
   })
   declare favList: FavList;
}

export interface FavAttributes {
   title: string;
   description: string;
   link: string;
   favListId: number;
   userId: number;
}
