import { Sequelize, Model, DataTypes } from "sequelize";


export class Item extends Model {
  public id!: number;
  public quantite!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export const init_model_item = (sequelize: Sequelize) => {
  Item.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      quantite: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      }
    },
    {
      tableName: "item",
      sequelize
    }
  );
}

