import { Sequelize, Model, DataTypes, HasManyAddAssociationMixin, HasManyCreateAssociationMixin, HasManyAddAssociationMixinOptions,HasManyGetAssociationsMixin, BelongsToManyAddAssociationMixin } from "sequelize";
import { Article } from "./Article";
import { Achat } from "./Achat";
import { Options } from "body-parser";


export class Ticket extends Model {
  public id!: number;
  public date_achat!: Date;
  public montant!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addAchat!: HasManyAddAssociationMixin<Achat, number>;
  public createAchat!: HasManyCreateAssociationMixin<Achat>;
  public getAchats!: HasManyGetAssociationsMixin<Achat>;

}

export const init_model_ticket = (sequelize: Sequelize) => {
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      date_achat: {
        type: DataTypes.DATE,
        allowNull: false
      },
      montant: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
    },
    {
      sequelize
    }
  );
}

