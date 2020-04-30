import { Sequelize, Model, DataTypes } from "sequelize";


export class Item extends Model {
  public id!: number;
  public quantite!: number;

}

export const init_model_item = (sequelize: Sequelize) => {
  Item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      quantite: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize
    }
  );
}

