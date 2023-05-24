import {
   BelongsTo,
   Column,
   DataType,
   HasMany,
   Model,
   Table,
} from "sequelize-typescript/dist";
import {Fav} from "./Fav";
import {User} from "./User";

@Table
export class FavList extends Model<FavList, FavListAttributes> {
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
      type: DataType.STRING,
      allowNull: false,
   })
   declare name: string;

   @HasMany(() => Fav, {
      foreignKey: "favListId",
   })
   declare favLists: Fav[];
}

export interface FavListAttributes {
   name: string;
   userId: number;
}
