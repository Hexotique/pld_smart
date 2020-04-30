import { Sequelize, Model, DataTypes, HasManyAddAssociationMixin, HasManyCreateAssociationMixin } from "sequelize";
import { Achat } from "./Achat";


export class Article extends Model {
  public id!: number;
  public codebar!: string;
  public nom!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addAchat!: HasManyAddAssociationMixin<Achat, number>;
  public createAchat!: HasManyCreateAssociationMixin<Achat>;
}



export const init_model_article = (sequelize: Sequelize) => {
  Article.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      codebar: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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

