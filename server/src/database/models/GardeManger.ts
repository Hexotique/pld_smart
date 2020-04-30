import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin } from "sequelize";
import { Item } from "./Item";

export class GardeManger extends Model {
  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getItems!: HasManyGetAssociationsMixin<Item>;
  public addItem!: HasManyAddAssociationMixin<Item, number>;
  public removeItem!: HasManyRemoveAssociationMixin<Item, number>;

}


export const init_model_gardemanger = (sequelize: Sequelize) => {
  GardeManger.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    },
    {
      sequelize
    }
  );
}

