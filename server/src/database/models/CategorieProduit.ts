import { Sequelize, Model, DataTypes } from "sequelize";

export class CategorieProduit extends Model {
  public id!: number;
  public nom!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export const init_model_categorieproduit = (sequelize: Sequelize) => {
  CategorieProduit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize
    }
  );

}

