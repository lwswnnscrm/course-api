import { ObjectId, MongoClient } from 'mongodb';
import assert from 'assert';


class BataBase {

  constructor(url, dataBaseName) {
    this.url = url;
    this.dataBaseName = dataBaseName;
    this.dataBase = null;
  };

  connect() {
    MongoClient.connect(this.url, (err, client) => {
      if (err) throw err;
      this.dataBase = client.db(this.dataBaseName);
    });
  };

  post(tabel, data, callback) {
    this.dataBase.collection(tabel).insertOne(data, callback);
  };

  get(tabel, callback, { searchQ = '', sortBy = '', cat = '' }) {
    const { search, sort, } = this.createParams(searchQ, sortBy, cat);
    console.log(search, sort)
    this.dataBase.collection(tabel).find(search).sort(sort).toArray(callback);
  };

  getById(tabel, id, callback) {
    this.dataBase.collection(tabel).findOne({ '_id': ObjectId(id) }, callback)
  };

  createParams(searchQ, sortBy, cat) {
    let search = {};
    let sort = {
      name: -1,
    };
    if (searchQ.length > 0) {
      const regex = new RegExp(searchQ, "i");
      search.name = regex;
    };
    if (cat.length > 0) {
      search.category = cat;
    };
    if (sortBy.length > 0) {
      delete sort.name;
      if (sortBy === '-price') {
        sort.price = 1;
      } else if (sortBy === 'price') {
        sort.price = -1;
      } else if (sortBy === '-name') {
        sort.name = 1;
      } else if (sortBy === 'name') {
        sort.name = -1;
      } else if (sortBy === '-time') {
        sort.date = 1;
      } else if (sortBy === 'time') {
        sort.date = -1;
      }
    }
    return { search, sort, };
  };

};

export default BataBase;
