
import { Sequelize, HasMany, BelongsToMany, HasOne, DataTypes } from 'sequelize';
import { init_model_client, Client } from './Client';
import { init_model_ticket, Ticket } from './Ticket';
import { init_model_achat, Achat } from './Achat';
import { init_model_article, Article } from './Article';
import { init_model_produit, Produit } from './Produit';
import { init_model_categorieproduit, CategorieProduit } from './CategorieProduit';
import { init_model_item, Item } from './Item';
import { init_model_gardemanger, GardeManger } from './GardeManger';
import { init_model_commerce, Commerce } from './Commerce';
import { init_model_groupe, Groupe } from './Groupe';
import { init_model_liste, Liste } from './Liste';

const init_models = (sequelize: Sequelize) => {

    init_model_client(sequelize);
    init_model_ticket(sequelize);
    init_model_achat(sequelize);
    init_model_article(sequelize);
    init_model_produit(sequelize);
    init_model_categorieproduit(sequelize);
    // init_model_produitcourse(sequelize);
    init_model_item(sequelize);
    init_model_gardemanger(sequelize);
    init_model_commerce(sequelize);
    init_model_groupe(sequelize);
    init_model_liste(sequelize);

    Groupe.hasMany(Commerce, { as: "commerces" });

    Commerce.hasMany(Ticket, { as: "tickets" });

    CategorieProduit.hasMany(Produit, { as: 'produits' });

    Produit.hasMany(Article, { as: 'articles' });

    Ticket.hasMany(Achat, { as: 'achats' });
    Article.hasMany(Achat, { as: 'achats' });

    GardeManger.hasMany(Item, { as: 'items' });
    Produit.hasMany(Item, { as: 'items' });

    Liste.belongsToMany(Produit, { through: 'Course' });
    Produit.belongsToMany(Liste, { through: 'Course' });

    Client.hasMany(Ticket, { as: "tickets" });

    Client.hasOne(Liste);

    Client.hasOne(GardeManger);

    sequelize.sync();
}

export default init_models;
export { Client } from './Client';
export { Ticket } from './Ticket';
export { Article } from './Article';
export { Produit } from './Produit';
export { CategorieProduit } from './CategorieProduit';
export { GardeManger } from './GardeManger';
export { Commerce } from './Commerce';
export { Groupe } from './Groupe';
export { Item } from './Item';
export { Achat } from './Achat';
export { Liste } from './Liste';

