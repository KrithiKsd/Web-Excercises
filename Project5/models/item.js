const mongoose=require('mongoose');
const Schema = mongoose.Schema;


const tradeSchema= new Schema({
    name:{type:String, required:[true,'Name is required']},
    category:{type:String, required:[true,'Category is required'],enum: { values: ['Strategy Games', 'Party Games', 'Thematic Games'], message: '{VALUE} is not supported as Category. The accepted values are Strategy Games, Party Games, Thematic Games' }},
    details:{type:String, required:[true,'Details is required'],
            minLength:[10, 'the content should have at least 10 characters']},
    status: {type: String, required: [true, 'Status is required'], enum: { values: ['Available', 'Pending', 'Traded'], message: '{VALUE} is not supported as Status. The accepted values are Available, Pending, Traded' }},
    imageurl:{type:String, required:[true,'Imageurl is required']},
    suggestedAge:{type:String, required:[true,'SuggestedAge is required']},
    publishedBy:{type:String, required:[true,'PublishedBy is required']},
    date: { type: String, required: [true, 'Date is required'] },
    startTime: { type: String, required: [true, 'Start time is required'] },
    endTime: { type: String, required: [true, 'End time is required'] },
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    watchedBy: {type: Array, default: []},
    offerId: {type: Schema.Types.ObjectId, ref: 'Offer'}
   },
   {
    timestamps:true
   }
);

module.exports = mongoose.model('Trade',tradeSchema);

//find item by id
exports.findById = id => items.find(item=>item.id === id);

// fetch all trade items
exports.find = () => items;

exports.allTrades = function(){
    return trades;
}

