import { Sequelize, Model, DataTypes } from "sequelize";


export class Grouoe extends Model {
  public id!: number;
  public nom!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export const init_model_commerce = (sequelize: Sequelize) => {
  Grouoe.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      }
    },
    {
      tableName: "groupe",
      sequelize
    }
  );
}

