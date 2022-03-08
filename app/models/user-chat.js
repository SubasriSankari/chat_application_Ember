import Model, { attr } from '@ember-data/model';

export default class ProductModel extends Model {
    @attr('string') username;
    @attr('date') time; 
}