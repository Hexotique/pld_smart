import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManyRemoveAssociationMixin } from "sequelize";
import { Article } from "./Article";
import { Item } from "./Item";
import { AchatRegulier } from "./AchatRegulier";

export class Produit extends Model {
  public id!: number;
  public nom!: string;
  public url_image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getArticles!: HasManyGetAssociationsMixin<Article>;
  public addArticle!: HasManyAddAssociationMixin<Article, number>;

  public getItems!: HasManyGetAssociationsMixin<Item>;
  public addItem!: HasManyAddAssociationMixin<Item, number>;
  public removeItem!: HasManyRemoveAssociationMixin<Item, number>;

  public getAchatsRegulier!: HasManyGetAssociationsMixin<AchatRegulier>;
  public addAchatRegulier!: HasManyAddAssociationMixin<AchatRegulier, number>;
  public removeAchatRegulier!: HasManyRemoveAssociationMixin<AchatRegulier, number>;
}

export const init_model_produit = (sequelize: Sequelize) => {
  Produit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      url_image: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize
    }
  );

}

