const { DateTime } = require("luxon");
const {v4:uuidv4} = require('uuid');

const stories=[
{
    id: '1',
    title: 'A funny story',
    content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nluctus interdum bibendum in elit. Praesent egestas augue nec magna vehicula efficitur.',
    author:'Krithika',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id: '2',
    title: 'It is raining',
    content:'Nullam pharetra sem non commodo posuere. Aliquam consequat pellentesque hendrerit.',
    author:'Karthik',
    createdAt: DateTime.local(2022, 09, 29, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)

}
];


exports.save = function(story){
    story.id = uuidv4();
    story.createdAt = DateTime.local(2022, 09, 29, 18, 0).toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
}

exports.updateById= function(id, newStory){
    let story = stories.find(story=>story.id === id);
    if(story){
        story.title= newStory.title;
        story.content= newStory.content;
        return true;
    }else{
        return false;
    }   
   
}

exports.deleteById= function(id){
    let index= stories.findIndex(story=> story.id === id);
    if(index!== -1){
        stories.splice(index,1);
        return true;
    }else{
        return false;
    }
}

// to get stories
exports.find = () => stories;

exports.findById = id => stories.find(story=>story.id === id);