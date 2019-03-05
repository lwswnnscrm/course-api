"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validate =
/*#__PURE__*/
function () {
  function Validate() {
    _classCallCheck(this, Validate);
  }

  _createClass(Validate, [{
    key: "product",
    value: function product(_ref) {
      var _ref$name = _ref.name,
          name = _ref$name === void 0 ? "" : _ref$name,
          _ref$category = _ref.category,
          category = _ref$category === void 0 ? "" : _ref$category,
          _ref$brand = _ref.brand,
          brand = _ref$brand === void 0 ? "" : _ref$brand,
          _ref$model = _ref.model,
          model = _ref$model === void 0 ? "" : _ref$model,
          _ref$price = _ref.price,
          price = _ref$price === void 0 ? 0 : _ref$price,
          _ref$currency = _ref.currency,
          currency = _ref$currency === void 0 ? "" : _ref$currency;
      console.log(currency);

      if (name.length === 0) {
        return {
          status: false,
          descriptions: 'Name is required'
        };
      } else if (category.length === 0) {
        return {
          status: false,
          descriptions: 'Category is required'
        };
      } else if (model.length === 0) {
        return {
          status: false,
          descriptions: 'Model is required'
        };
      } else if (brand.length === 0) {
        return {
          status: false,
          descriptions: 'Brand is required'
        };
      } else if (currency.length === 0 || currency.length !== 3) {
        return {
          status: false,
          descriptions: 'Currency is required and must be in ISO 4217'
        };
      } else if (typeof price !== "number" || price < 1) {
        return {
          status: false,
          descriptions: 'Price must be over 0 and number'
        };
      }

      return {
        status: true
      };
    }
  }, {
    key: "category",
    value: function category(_ref2) {
      var _ref2$name = _ref2.name,
          name = _ref2$name === void 0 ? "" : _ref2$name,
          _ref2$short = _ref2.short,
          short = _ref2$short === void 0 ? "" : _ref2$short;

      if (name.length === 0) {
        return {
          status: false,
          descriptions: 'Name is required'
        };
      } else if (short.length === 0) {
        return {
          status: false,
          descriptions: 'Short name is required'
        };
      }

      return {
        status: true
      };
    }
  }]);

  return Validate;
}();

;
var _default = Validate;
exports.default = _default;