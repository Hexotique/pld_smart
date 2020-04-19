import React from 'react';
import { Text, View} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { FlatList } from 'react-native-gesture-handler';
import Categorie from '../../ComposantsGénériques/CategorieListeRetractable'

// imports peronnels
import styles from './styles';
import LigneTicket from '../LigneTicket';

interface Purchase {
     article : string;
     prix    : Number;
     quantite: Number;
}

interface Category {
     categorieProduit: string;
     donnees         : Array<Purchase>;
}

function _testparser() {

     const Ticketdonnees        = new Array<Category>();
     let   newcat1: Category    = { categorieProduit: "Epicerie", donnees: new Array<Purchase>() };
     let   newpurch11: Purchase = { article: "tablette de Chocolat", quantite: 4, prix: 11 };
     let   newpurch12: Purchase = { article: "Quinoa", quantite: 4, prix: 11 };
     newcat1.donnees.push(newpurch11);
     newcat1.donnees.push(newpurch12);


     let newcat2: Category    = { categorieProduit: "Hygiène", donnees: new Array<Purchase>() };
     let newpurch21: Purchase = { article: "Savon", quantite: 4, prix: 11 };
     let newpurch22: Purchase = { article: "Javel", quantite: 4, prix: 11 };
     newcat2.donnees.push(newpurch21);
     newcat2.donnees.push(newpurch22);

     Ticketdonnees.push(newcat1);
     Ticketdonnees.push(newcat2);

     const temp = JSON.stringify(Ticketdonnees);
     return temp;
}

function _genereListe() {
     return ([
          {
               categorieProduit: "Epicerie",
               donnees         : [
                    {
                         article : "tablette de Chocolat",
                         quantite: '4',
                         prix    : '11,01€',
                    },
                    {
                         article : "Quinoa",
                         quantite: '2',
                         prix    : '5,62€',
                    },
                    {
                         article : "Spaghetti",
                         quantite: '1',
                         prix    : '1,17€',
                    },
               ]
          },
          {
               categorieProduit: "Hygiène",
               donnees         : [
                    {
                         article : "Savon",
                         quantite: '2',
                         prix    : '8,01€',
                    },
                    {
                         article : "Javel",
                         quantite: '1',
                         prix    : '7,62€',
                    },
               ]
          },
          {
               categorieProduit: "Boulangerie",
               donnees         : [
                    {
                         article : "Baguette tradition",
                         quantite: '2',
                         prix    : '1,54€',
                    },
                    {
                         article : "Croissants au beurre",
                         quantite: '10',
                         prix    : '5,99€',
                    },
                    {
                         article : "Fougasse au fromage",
                         quantite: '1',
                         prix    : '2,49€',
                    },
               ]
          },
          {
               categorieProduit: "Epicerie",
               donnees         : [
                    {
                         article : "tablette de Chocolat",
                         quantite: '4',
                         prix    : '11,01€',
                    },
                    {
                         article : "Quinoa",
                         quantite: '2',
                         prix    : '5,62€',
                    },
                    {
                         article : "Spaghetti",
                         quantite: '1',
                         prix    : '1,17€',
                    },
               ]
          },{
               categorieProduit: "Epicerie",
               donnees         : [
                    {
                         article : "tablette de Chocolat",
                         quantite: '4',
                         prix    : '11,01€',
                    },
                    {
                         article : "Quinoa",
                         quantite: '2',
                         prix    : '5,62€',
                    },
                    {
                         article : "Spaghetti",
                         quantite: '1',
                         prix    : '1,17€',
                    },
               ]
          },
     ])
}


function ListeDetailTicket(purchases: any) {

     // length = Object.keys(purchases.achats[0]).length;
     // let Ticketdonnees = new Array<Category>();

     // for (let i = 0; i < length; i++) {
     //      if (!Ticketdonnees.find(d => d.title === purchases[i].produit.categorieproduit.nom)) { //if category not yet in Ticketdonnees
     //           let newcat: Category = { title: purchases[i].produit.categorieproduit.nom, donnees: new Array<Purchase>() };
     //           Ticketdonnees.push(newcat);
     //      }
     //      mapcategorie.add(purchases[i].produit.categorieproduit.nom, [purchases[i].article.nom, purchases[i].quantite, purchases[i].prix]);
     // }


     return (
          <View>
               <FlatList
                    data         = {_genereListe()}
                    keyExtractor = {(item, index) => item + index.toString() }
                    renderItem   = {({ item }) =>
                    <View>
                        <Collapse>
                            <CollapseHeader>
                              <Categorie item = {item.categorieProduit}/>
                            </CollapseHeader>
                            <CollapseBody>
                                <FlatList
                                    data         = {item.donnees}
                                    keyExtractor = {(item, index) => item.article + index.toString() }
                                    renderItem   = {({ item }) =>
                                         <LigneTicket nomItem = {item.article} quantite = {item.quantite} prix = {item.prix} />
                                    }
                                />
                            </CollapseBody>
                        </Collapse>
                    </View>
                }
               />
          </View>
     );
}

export default ListeDetailTicket;