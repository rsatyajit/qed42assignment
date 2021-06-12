var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * ************************************
 *     SCHEMA  Comments               *
 * ************************************
 *  
 * ************************************
*/
var ProjectSchema = new Schema({
    "project": { type: Schema.Types.String, required: false }
}, {
    timestamps: { createdAt: 'creation_date', updatedAt: 'modification_date' },
    versionKey: false
});

const model = mongoose.model('project', ProjectSchema, 'project');


module.exports = model;