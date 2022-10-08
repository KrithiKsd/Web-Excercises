const { DateTime } = require("luxon");
const {v4:uuidv4} = require('uuid');
const {isEmpty} = require('lodash');
const _ = require("lodash");

const items=[
{
    id: '1',
    name: 'A Game of Thrones',
    category:'Strategy Games',
    details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nluctus interdum bibendum in elit. Praesent egestas augue nec magna vehicula efficitur.',
    status:'',
    imageurl:'',
    suggestedAge:'10',
    publishedBy: ''
},
{
    id: '2',
    name: 'Kingdom Builder',
    category:'Strategy Games',
    details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nluctus interdum bibendum in elit. Praesent egestas augue nec magna vehicula efficitur.',
    status:'',
    imageurl:'',
    suggestedAge:'',
    publishedAt: ''
},
{
    id: '3',
    name: 'Cave Troll',
    category:'Strategy Games',
    details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nluctus interdum bibendum in elit. Praesent egestas augue nec magna vehicula efficitur.',
    status:'',
    imageurl:'',
    suggestedAge:'',
    publishedBy: ''
},
{
    id: '4',
    name: 'The Resistance',
    category:'Party Games',
    details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nluctus interdum bibendum in elit. Praesent egestas augue nec magna vehicula efficitur.',
    status:'',
    imageurl:'',
    suggestedAge:'',
    publishedBy: ''
},
{
    id: '5',
    name: 'Cards Against Humanity',
    category:'Party Games',
    details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nluctus interdum bibendum in elit. Praesent egestas augue nec magna vehicula efficitur.',
    status:'',
    imageurl:'',
    suggestedAge:'',
    publishedBy: ''
},
{
    id: '6',
    name: 'Dixit',
    category:'Party Games',
    details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nluctus interdum bibendum in elit. Praesent egestas augue nec magna vehicula efficitur.',
    status:'',
    imageurl:'',
    suggestedAge:'',
    publishedBy: ''
},
{
    id: '7',
    name: 'Elder Sign',
    category:'Thematic Games',
    details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nluctus interdum bibendum in elit. Praesent egestas augue nec magna vehicula efficitur.',
    status:'',
    imageurl:'',
    suggestedAge:'',
    publishedBy: ''
},
{
    id: '8',
    name: 'Munchkin',
    category:'Thematic Games',
    details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nluctus interdum bibendum in elit. Praesent egestas augue nec magna vehicula efficitur.',
    status:'',
    imageurl:'',
    suggestedAge:'',
    publishedBy: ''
},
{
    id: '9',
    name: 'Nothing Personal',
    category:'Thematic Games',
    details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nluctus interdum bibendum in elit. Praesent egestas augue nec magna vehicula efficitur.',
    status:'',
    imageurl:'',
    suggestedAge:'',
    publishedBy: ''
}
];

exports.save = function(item){
    console.log("Item to save: "+item);
    item.id = uuidv4();
    item.status='Active Status';
    //item.createdAt = DateTime.local(2022, 09, 29, 18, 0).toLocaleString(DateTime.DATETIME_SHORT);
    items.push(item);
    console.log('All items:'+items);
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
