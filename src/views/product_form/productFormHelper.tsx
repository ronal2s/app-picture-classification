import Product from "@models/product";

const productHelper = {
  requeridedFields: {
    picture: "",
    name: "",
    quantity: "",
    price: "",
    canContinue: false,
  },
  validateErrors: (form: Product) => {
    const errors = { ...productHelper.requeridedFields, canContinue: true };
    if (!form.picture) {
      errors.picture = "Imagen es requerida";
      errors.canContinue = false;
    }
    if (!form.name) {
      errors.name = "Nombre es requerido";
      errors.canContinue = false;
    }
    if (!form.price) {
      errors.price = "Precio es requerido";
      errors.canContinue = false;
    }
    if (!form.quantity) {
      errors.quantity = "Cantidad es requerida";
      errors.canContinue = false;
    }
    return errors;
  },
};

export default productHelper;
