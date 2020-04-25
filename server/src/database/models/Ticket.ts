import { Sequelize, Model, DataTypes, HasManyAddAssociationMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin } from "sequelize";
import { Achat } from "./Achat";


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

