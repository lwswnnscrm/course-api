class Validate {
  product({ name = "", category = "", brand = "", model = "", price = 0, currency = "" }) {
    console.log(currency)
    if (name.length === 0) {
      return { status: false, descriptions: 'Name is required', };
    } else if (category.length === 0) {
      return { status: false, descriptions: 'Category is required', };
    } else if (model.length === 0) {
      return { status: false, descriptions: 'Model is required', };
    } else if (brand.length === 0) {
      return { status: false, descriptions: 'Brand is required', };
    } else if (currency.length === 0 || currency.length !== 3) {
      return { status: false, descriptions: 'Currency is required and must be in ISO 4217', };
    } else if (typeof price !== "number" || price < 1) {
      return { status: false, descriptions: 'Price must be over 0 and number' }
    }
    return { status: true, };
  };

  category({ name = "", short = "" }) {
    if (name.length === 0) {
      return { status: false, descriptions: 'Name is required', };
    } else if (short.length === 0) {
      return { status: false, descriptions: 'Short name is required', };
    }
    return { status: true, };
  }
};

export default Validate;
