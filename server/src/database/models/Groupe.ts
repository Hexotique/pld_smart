import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, HasManyAddAssociationMixin } from "sequelize";
import { Commerce } from "./Commerce";

export class Groupe extends Model {
  public id!: number;
  public nom!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getCommerces!: HasManyGetAssociationsMixin<Commerce>;
  public createCommerce!: HasManyCreateAssociationMixin<Commerce>;
  public addCommerce!: HasManyAddAssociationMixin<Commerce, number>;
}


export const init_model_groupe = (sequelize: Sequelize) => {
  Groupe.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
      sequelize
    }
  );


}

