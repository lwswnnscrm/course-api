import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import DataBase from './database';
import Validate from './validate';

// Connection URL
const url = 'mongodb+srv://admin:testadmin@courseapi-zkvbf.gcp.mongodb.net/test?retryWrites=true';
// Database Name
const dataBaseName = 'CourseApi';

const Base = new DataBase(url, dataBaseName);
const Validator = new Validate();

Base.connect();

dotenv.config();

const port = '8080';

const app = express();
const router = express.Router();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router.use((req, res, next) => {
  next();
});


router.get('/categories', (req, res) => {
  Base.get('categories', (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    return res.status(200).json(data);
  }, req.query);
});
router.post('/categories', (req, res) => {
  const result = Validator.category(req.body);
  if (result.status) {
    const {
      name,
      short,
    } = req.body;
    const category = {
      name,
      short,
    };
    Base.post('categories', category, (err, data) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      return res.status(200).json(data);
    });
  } else {
    res.status(500).json({ message: result.descriptions });
  }
});

router.get('/products', (req, res) => {
  Base.get('products', (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    return res.status(200).json(data);
  }, req.query);
});
router.post('/products', (req, res) => {
  const result = Validator.product(req.body);
  if (result.status) {
    const date = new Date().getTime();
    console.log(date)
    const {
      name,
      descriptions = '',
      images = [],
      category,
      brand,
      model,
      specifications = null,
      price,
      currency,
    } = req.body;
    const product = {
      name,
      descriptions,
      images,
      category,
      brand,
      model,
      specifications,
      price,
      currency,
      date,
    };

    Base.post('products', product, (err, data) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      return res.status(200).json(data);
    });
  } else {
    res.status(500).json({ message: result.descriptions });
  }
});

router.get('/product/:id', (req, res) => {
  Base.getById('products', req.params.id, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    return res.status(200).json(data);
  });
});

router.get('/', (req, res) => {
  return res.status(200).json({ status: 'ok' });
});

app.use('/', router);

app.listen(port);
