import { Sequelize, Model, DataTypes } from "sequelize";


export class Groupe extends Model {
  public id!: number;
  public nom!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export const init_model_groupe = (sequelize: Sequelize) => {
  Groupe.init(
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

