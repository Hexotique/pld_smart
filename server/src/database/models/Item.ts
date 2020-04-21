import { Sequelize, Model, DataTypes } from "sequelize";


export class Item extends Model {

  public quantite!: number;

}

export const init_model_item = (sequelize: Sequelize) => {
  Item.init(
    {
      quantite: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      }
    },
    {
      tableName: "Item",
      sequelize
    }
  );
}

