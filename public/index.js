"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _database = _interopRequireDefault(require("./database"));

var _validate = _interopRequireDefault(require("./validate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connection URL
var url = 'mongodb+srv://admin:testadmin@courseapi-zkvbf.gcp.mongodb.net/test?retryWrites=true'; // Database Name

var dataBaseName = 'CourseApi';
var Base = new _database.default(url, dataBaseName);
var Validator = new _validate.default();
Base.connect();

_dotenv.default.config();

var port = '8080';
var app = (0, _express.default)();

var router = _express.default.Router();

app.use((0, _morgan.default)('dev'));
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
router.use(function (req, res, next) {
  next();
});
router.get('/categories', function (req, res) {
  Base.get('categories', function (err, data) {
    if (err) {
      return res.status(500).json({
        message: err
      });
    }

    return res.status(200).json(data);
  }, req.query);
});
router.post('/categories', function (req, res) {
  var result = Validator.category(req.body);

  if (result.status) {
    var _req$body = req.body,
        name = _req$body.name,
        short = _req$body.short;
    var category = {
      name: name,
      short: short
    };
    Base.post('categories', category, function (err, data) {
      if (err) {
        return res.status(500).json({
          message: err
        });
      }

      return res.status(200).json(data);
    });
  } else {
    res.status(500).json({
      message: result.descriptions
    });
  }
});
router.get('/products', function (req, res) {
  Base.get('products', function (err, data) {
    if (err) {
      return res.status(500).json({
        message: err
      });
    }

    return res.status(200).json(data);
  }, req.query);
});
router.post('/products', function (req, res) {
  var result = Validator.product(req.body);

  if (result.status) {
    var date = new Date().getTime();
    console.log(date);
    var _req$body2 = req.body,
        name = _req$body2.name,
        _req$body2$descriptio = _req$body2.descriptions,
        descriptions = _req$body2$descriptio === void 0 ? '' : _req$body2$descriptio,
        _req$body2$images = _req$body2.images,
        images = _req$body2$images === void 0 ? [] : _req$body2$images,
        category = _req$body2.category,
        brand = _req$body2.brand,
        model = _req$body2.model,
        _req$body2$specificat = _req$body2.specifications,
        specifications = _req$body2$specificat === void 0 ? null : _req$body2$specificat,
        price = _req$body2.price,
        currency = _req$body2.currency;
    var product = {
      name: name,
      descriptions: descriptions,
      images: images,
      category: category,
      brand: brand,
      model: model,
      specifications: specifications,
      price: price,
      currency: currency,
      date: date
    };
    Base.post('products', product, function (err, data) {
      if (err) {
        return res.status(500).json({
          message: err
        });
      }

      return res.status(200).json(data);
    });
  } else {
    res.status(500).json({
      message: result.descriptions
    });
  }
});
router.get('/product/:id', function (req, res) {
  Base.getById('products', req.params.id, function (err, data) {
    if (err) {
      return res.status(500).json({
        message: err
      });
    }

    return res.status(200).json(data);
  });
});
router.get('/', function (req, res) {
  return res.status(200).json({
    status: 'ok'
  });
});
app.use('/', router);
app.listen(port);