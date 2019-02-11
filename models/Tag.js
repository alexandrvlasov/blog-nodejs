const { model } = require('mongoose')
const { tagSchema } = require('./schemas/tagSchema')

module.export = model('Tag', tagSchema) 