import dataStore from 'nedb-promise';

export class ProductStore {
    constructor({ filename, autoload }) {
        this.store = dataStore({ filename, autoload });
    }

    async find(props) {
        return this.store.find(props);
    }

    async findOne(props) {
        return this.store.findOne(props);
    }

    async insert(product) {
        let productName = product.name;
        if (!productName) { // validation
            throw new Error('Missing product name property')
        }
        return this.store.insert(product);
    };

    async update(props, product) {
        return this.store.update(props, product);
    }

    async remove(props) {
        return this.store.remove(props);
    }
}

export default new ProductStore({ filename: './db/products.json', autoload: true });
