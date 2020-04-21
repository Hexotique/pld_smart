import { Sequelize } from 'sequelize';
import { init_model_client } from './Client';
import { init_model_ticket } from './Ticket';
import { init_model_achat } from './Achat';
import { init_model_article } from './Article';
import { init_model_item } from './Item';
import { init_model_produit } from './Produit';
import { init_model_categorieproduit } from './CategorieProduit';
import { init_model_listecourses } from './ListeCourses';
import { init_model_gardemanger } from './GardeManger';
import { init_model_commerce } from './Commerce';
import { init_model_groupe } from './Groupe';


const init_models = (sequelize: Sequelize) => {

    init_model_client(sequelize);
    init_model_ticket(sequelize);
    init_model_achat(sequelize);
    init_model_article(sequelize);
    init_model_item(sequelize);
    init_model_produit(sequelize);
    init_model_categorieproduit(sequelize);
    init_model_listecourses(sequelize);
    init_model_gardemanger(sequelize);
    init_model_commerce(sequelize);
    init_model_groupe(sequelize);

    sequelize.sync();
}

export default init_models;
export { Client } from './Client';
export { Ticket } from './Ticket';
export { Achat } from './Achat';
export { Article } from './Article';
export { Item } from './Item';
export { Produit } from './Produit';
export { CategorieProduit } from './CategorieProduit';
export { ListeCourses } from './ListeCourses';
export { GardeManger } from './GardeManger';
export { Commerce} from './Commerce';
export { Groupe } from './Groupe';

