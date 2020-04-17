import React from 'react';
import { Text, View, SectionList } from 'react-native';
import styles from './styles';
import TicketLine from '../TicketLine';


interface Purchase {
     article: string;
     prix: Number;
     quantite: Number;
}

interface Category {
     categoryProduit: string;
     data: Array<Purchase>;
}

function _testparser() {

     const Ticketdata = new Array<Category>();
     let newcat1: Category = { categoryProduit: "Epicerie", data: new Array<Purchase>() };
     let newpurch11: Purchase = { article: "tablette de Chocolat", quantite: 4, prix: 11 };
     let newpurch12: Purchase = { article: "Quinoa", quantite: 4, prix: 11 };
     newcat1.data.push(newpurch11);
     newcat1.data.push(newpurch12);


     let newcat2: Category = { categoryProduit: "Hygiène", data: new Array<Purchase>() };
     let newpurch21: Purchase = { article: "Savon", quantite: 4, prix: 11 };
     let newpurch22: Purchase = { article: "Javel", quantite: 4, prix: 11 };
     newcat2.data.push(newpurch21);
     newcat2.data.push(newpurch22);

     Ticketdata.push(newcat1);
     Ticketdata.push(newcat2);

     const temp = JSON.stringify(Ticketdata);
     return temp;
}

function _selectionList() {
     return ([
          {
               categoryProduit: "Epicerie",
               data: [
                    {
                         article: "tablette de Chocolat",
                         quantite: '4',
                         prix: '11,01€',
                    },
                    {
                         article: "Quinoa",
                         quantite: '2',
                         prix: '5,62€',
                    },
                    {
                         article: "Spaghetti",
                         quantite: '1',
                         prix: '1,17€',
                    },
               ]
          },
          {
               categoryProduit: "Hygiène",
               data: [
                    {
                         article: "Savon",
                         quantite: '2',
                         prix: '8,01€',
                    },
                    {
                         article: "Javel",
                         quantite: '1',
                         prix: '7,62€',
                    },
               ]
          },
          {
               categoryProduit: "Boulangerie",
               data: [
                    {
                         article: "Baguette tradition",
                         quantite: '2',
                         prix: '1,54€',
                    },
                    {
                         article: "Croissants au beurre",
                         quantite: '10',
                         prix: '5,99€',
                    },
                    {
                         article: "Fougasse au fromage",
                         quantite: '1',
                         prix: '2,49€',
                    },
               ]
          },
     ])
}


function TicketList(purchases: any) {

     // length = Object.keys(purchases.achats[0]).length;
     // let Ticketdata = new Array<Category>();

     // for (let i = 0; i < length; i++) {
     //      if (!Ticketdata.find(d => d.title === purchases[i].produit.categorieproduit.nom)) { //if category not yet in TicketData
     //           let newcat: Category = { title: purchases[i].produit.categorieproduit.nom, data: new Array<Purchase>() };
     //           Ticketdata.push(newcat);
     //      }
     //      mapcategorie.add(purchases[i].produit.categorieproduit.nom, [purchases[i].article.nom, purchases[i].quantite, purchases[i].prix]);
     // }


     return (
          <View>
               <SectionList
                    sections={_selectionList()}
                    keyExtractor={(item, index) => item.article + index.toString()}
                    renderItem={({ item }) => <TicketLine item_name={item.article} quantity={item.quantite} price={item.prix} />}
                    renderSectionHeader={({ section: { categoryProduit } }) => (
                         <Text style={styles.header}>{categoryProduit}</Text>
                    )}
               />
          </View>
     );
}

export default TicketList;