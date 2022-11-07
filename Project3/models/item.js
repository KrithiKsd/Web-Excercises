const mongoose=require('mongoose');
const Schema = mongoose.Schema;


const tradeSchema= new Schema({
    name:{type:String, required:[true,'Name is required']},
    category:{type:String, required:[true,'Category is required']},
    details:{type:String, required:[true,'Details is required'],
            minLength:[10, 'the content should have at least 10 characters']},
    status:{type:String, required:[true,'Status is required']},
    imageurl:{type:String, required:[true,'Imageurl is required']},
    suggestedAge:{type:String, required:[true,'SuggestedAge is required']},
    publishedBy:{type:String, required:[true,'PublishedBy is required']},
    date: { type: String, required: [true, 'Date is required'] },
    startTime: { type: String, required: [true, 'Start time is required'] },
    endTime: { type: String, required: [true, 'End time is required'] }
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

