const { DateTime } = require("luxon");
const {v4:uuidv4} = require('uuid');
const {isEmpty} = require('lodash');
const _ = require("lodash");

const items=[
{
    id: '1',
    name: 'A Game of Thrones',
    category:'Strategy Games',
    details:'The Wars to Come features everything you and your friends need to expand your games of The Iron Throne to seven players, including two new Houses—House Greyjoy and House Martell—and their ten new leaders.',
    status:'Active',
    imageurl:'',
    suggestedAge:'18+',
    publishedBy: 'Fantasy Flight Games'
},
{
    id: '2',
    name: 'Kingdom Builder',
    category:'Strategy Games',
    details:'In Kingdom Builder the players create their own Kingdoms by skillfully building their settlements and aiming to earn the most gold at the end of the game.',
    status:'Active',
    imageurl:'',
    suggestedAge:'8+',
    publishedAt: 'Queen Games'
},
{
    id: '3',
    name: 'Cave Troll',
    category:'Strategy Games',
    details:'Gather your team of heroes and monsters and enter the dungeon in Cave Troll! In this classic board game of strategic positioning, two to four player command heroes and monsters, moving them through a dungeon labyrinth to claim ancient treasures.',
    status:'Active',
    imageurl:'',
    suggestedAge:'10+',
    publishedBy: 'Fantasy Flight Games'
},
{
    id: '4',
    name: 'The Resistance',
    category:'Party Games',
    details:'The Empire must fall. Our mission must succeed. By destroying their key bases, we will shatter Imperial strength and liberate our people. Yet spies have infiltrated our ranks, ready for sabotage. We must unmask them. In five nights we reshape destiny or die trying. We are the Resistance!',
    status:'Active',
    imageurl:'',
    suggestedAge:'17+',
    publishedBy: 'Indie Boards & Cards'
},
{
    id: '5',
    name: 'Cards Against Humanity',
    category:'Party Games',
    details:'The first official expansion for Cards Against Humanity, featuring 80 brand-new white cards, 20 brand-new black cards, and, for the first time, blank cards which will allow you to seamlessly add your own inside jokes to the game.',
    status:'Active',
    imageurl:'',
    suggestedAge:'16+',
    publishedBy: 'Cards Against Humanity LLC, Estrela'
},
{
    id: '6',
    name: 'Dixit',
    category:'Party Games',
    details:'One player is the storyteller for the turn and looks at the images on the 6 cards in her hand. From one of these, she makes up a sentence and says it out loud (without showing the card to the other players).',
    status:'Active',
    imageurl:'',
    suggestedAge:'18+',
    publishedBy: 'Libellud'
},
{
    id: '7',
    name: 'Elder Sign',
    category:'Thematic Games',
    details:'Gilman felt that the twilight abysses around him were those of the fourth dimension. Those organic entities whose motions seemed least flagrantly irrelevant and unmotivated were probably projections of life-forms from our own planet, including human beings.',
    status:'Active',
    imageurl:'',
    suggestedAge:'10+',
    publishedBy: 'Fantasy Flight Games '
},
{
    id: '8',
    name: 'Munchkin',
    category:'Thematic Games',
    details:'In Munchkin Dungeon, players take on the role of Munchkins adventuring through a dungeon.',
    status:'Active',
    imageurl:'',
    suggestedAge:'14+',
    publishedBy: 'Steve Jackson Games'
},
{
    id: '9',
    name: 'Nothing Personal',
    category:'Thematic Games',
    details:'The Capo is getting old and about to retire. You think. Maybe it is time for you to make your moves from behind the scenes, to put the gangsters into play that support your goals. Will you gain the most respect?',
    status:'Active',
    imageurl:'',
    suggestedAge:'8+',
    publishedBy: 'Game Salute, Dice Tower Games'
}
];

exports.save = function(item){
    //console.log("Item to save: "+item);
    item.id = uuidv4();
    item.status='Active Status';
    //item.createdAt = DateTime.local(2022, 09, 29, 18, 0).toLocaleString(DateTime.DATETIME_SHORT);
    items.push(item);
   // console.log('All items:'+items);
}

exports.updateById= function(id, newItem){
    let item = items.find(item=>item.id === id);
    if(item){
        item.name= newItem.name;
        item.details= newItem.details;
        item.category= newItem.category;
        item.status= newItem.status;
        item.imageurl= newItem.imageurl;
        item.suggestedAge= newItem.suggestedAge;
        item.publishedBy= newItem.publishedBy;
        return true;
    }else{
        return false;
    }   
   
}

exports.deleteById= function(id){
    let index= items.findIndex(item=> item.id === id);
    if(index!== -1){
        items.splice(index,1);
        return true;
    }else{
        return false;
    }
}

// to get trades
exports.find = () => items;

exports.findById = id => items.find(item=>item.id === id);

exports.allItemsByCategory = function () {
    let grouped = _.reduce(items, (result, item) => {
        (result[item.category] || (result[item.category] = [])).push(item);
        return result;
    }, {});
    
    console.log(grouped);

    if (!isEmpty(grouped))
        return grouped;
    else return false;
}
