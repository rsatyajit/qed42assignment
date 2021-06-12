var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * ************************************
 *     SCHEMA  Comments               *
 * ************************************
 *  
 * ************************************
*/
var UserSchema = new Schema({
    "name": { type: Schema.Types.String, required: false },
    "email": { type: Schema.Types.String, required: false },
    /**
     * project :[ARRAY] as single employee can be assigned multiple projects
     */
    "project": [{ type: Schema.Types.ObjectId, required: true, ref: 'project' }]
}, {
    timestamps: { createdAt: 'creation_date', updatedAt: 'modification_date' },
    versionKey: false
});

const model = mongoose.model('user', UserSchema, 'user');


module.exports = model;