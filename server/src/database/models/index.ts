import { Sequelize, HasMany, BelongsToMany, DataTypes } from 'sequelize';
import { init_model_client, Client } from './Client';
import { init_model_ticket, Ticket } from './Ticket';
import { init_model_achat, Achat } from './Achat';
import { init_model_article, Article } from './Article';
import { init_model_produit, Produit } from './Produit';
import { init_model_categorieproduit, CategorieProduit } from './CategorieProduit';
import { init_model_listecourses, ListeCourses } from './ListeCourses';
import { init_model_item, Item} from './Item';
import { init_model_produitcourse, ProduitCourse } from './Produitcourse';
import { init_model_gardemanger, GardeManger } from './GardeManger';
import { init_model_commerce, Commerce } from './Commerce';
import { init_model_groupe, Groupe } from './Groupe';


const init_models = (sequelize: Sequelize) => {

    init_model_client(sequelize);
    init_model_ticket(sequelize);
    init_model_achat(sequelize);
    init_model_article(sequelize);
    init_model_produit(sequelize);
    init_model_categorieproduit(sequelize);
    init_model_listecourses(sequelize);
    init_model_produitcourse(sequelize);
    init_model_item(sequelize);
    init_model_gardemanger(sequelize);
    init_model_commerce(sequelize);
    init_model_groupe(sequelize);

    Groupe.hasMany(Commerce, {as: "magasins"});
    Commerce.hasMany(Ticket, { as: "recus" });

    CategorieProduit.hasMany(Produit, {as: 'produits'});
    Produit.hasMany(Article, { as: 'articles' });

    Ticket.belongsToMany(Article, { through: Achat });
    Article.belongsToMany(Ticket, { through: Achat });

    GardeManger.belongsToMany(Produit, { through: Item });
    Produit.belongsToMany(GardeManger, { through: Item });

    ListeCourses.belongsToMany(Produit, { through: ProduitCourse });
    Produit.belongsToMany(ListeCourses, { through: ProduitCourse });

    Client.hasMany(Ticket, { as: "recus" });
    Client.hasMany(GardeManger, { as: "gardesmanger" });
    Client.hasMany(ListeCourses, { as: "listescourses"});

    sequelize.sync();
}

export default init_models;
export { Client } from './Client';
export { Ticket } from './Ticket';
export { Article } from './Article';
export { Produit } from './Produit';
export { CategorieProduit } from './CategorieProduit';
export { ListeCourses } from './ListeCourses';
export { GardeManger } from './GardeManger';
export { Commerce} from './Commerce';
export { Groupe } from './Groupe';

