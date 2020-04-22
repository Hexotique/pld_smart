import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin } from "sequelize";
import { Article } from "./Article";
import { ProduitCourse } from './Produitcourse';
import { Item } from "./Item";

export class Produit extends Model {
  public id!: number;
  public nom!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getArticles!: HasManyGetAssociationsMixin<Article>;
  public addArticle!: HasManyAddAssociationMixin<Article, number>;

  public getProduitCourses!: HasManyGetAssociationsMixin<ProduitCourse>;
  public addProduitCourse!: HasManyAddAssociationMixin<ProduitCourse, number>;
  public removeProduitCourse!: HasManyRemoveAssociationMixin<ProduitCourse, number>;

  public getItems!: HasManyGetAssociationsMixin<Item>;
  public addItem!: HasManyAddAssociationMixin<Item, number>;
  public removeItem!: HasManyRemoveAssociationMixin<Item, number>;
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
      }
    },
    {
      sequelize
    }
  );

}

