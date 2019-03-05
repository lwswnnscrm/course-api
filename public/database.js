"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = require("mongodb");

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BataBase =
/*#__PURE__*/
function () {
  function BataBase(url, dataBaseName) {
    _classCallCheck(this, BataBase);

    this.url = url;
    this.dataBaseName = dataBaseName;
    this.dataBase = null;
  }

  _createClass(BataBase, [{
    key: "connect",
    value: function connect() {
      var _this = this;

      _mongodb.MongoClient.connect(this.url, function (err, client) {
        if (err) throw err;
        _this.dataBase = client.db(_this.dataBaseName);
      });
    }
  }, {
    key: "post",
    value: function post(tabel, data, callback) {
      this.dataBase.collection(tabel).insertOne(data, callback);
    }
  }, {
    key: "get",
    value: function get(tabel, callback, _ref) {
      var _ref$searchQ = _ref.searchQ,
          searchQ = _ref$searchQ === void 0 ? '' : _ref$searchQ,
          _ref$sortBy = _ref.sortBy,
          sortBy = _ref$sortBy === void 0 ? '' : _ref$sortBy,
          _ref$cat = _ref.cat,
          cat = _ref$cat === void 0 ? '' : _ref$cat;

      var _this$createParams = this.createParams(searchQ, sortBy, cat),
          search = _this$createParams.search,
          sort = _this$createParams.sort;

      console.log(search, sort);
      this.dataBase.collection(tabel).find(search).sort(sort).toArray(callback);
    }
  }, {
    key: "getById",
    value: function getById(tabel, id, callback) {
      this.dataBase.collection(tabel).findOne({
        '_id': (0, _mongodb.ObjectId)(id)
      }, callback);
    }
  }, {
    key: "createParams",
    value: function createParams(searchQ, sortBy, cat) {
      var search = {};
      var sort = {
        name: -1
      };

      if (searchQ.length > 0) {
        var regex = new RegExp(searchQ, "i");
        search.name = regex;
      }

      ;

      if (cat.length > 0) {
        search.category = cat;
      }

      ;

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

      return {
        search: search,
        sort: sort
      };
    }
  }]);

  return BataBase;
}();

;
var _default = BataBase;
exports.default = _default;