import { cartModel } from "../../models/cart.model.js";

class cartDBService {
  async addCart(cart) {
    try {
      let response = await cartModel.create({
        cart: {
          products: cart || [],
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  async getCarts() {
    try {
      let response = await cartModel.find();
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getCartById(id) {
    try {
      let response = await cartModel.findById({ _id: id });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProductToCart(idCart, idProd) {
    try {
      let exist = await cartModel.findOne({
        _id: idCart,
        products: {$elemMatch:{ _id: idProd }},
      });
      if (exist) {
        let response = await cartModel.updateOne(
          { _id: idCart, products: { $elemMatch: { _id: idProd } } },
          { $inc: { "products.$.quantity": 1 } },
        );
        return response;
      } else {
        let response = await cartModel.updateOne(
          { _id: idCart },
          { $push: { products: { _id: idProd, quantity: 1 } } },
        );
        return response;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteCartById(id) {
    try {
      let response = await cartModel.deleteOne({ _id: id });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProductToCart(idCart, idProd) {
    try {
      let response = await cartModel.deleteOne({
        _id: idCart,
        products: { $elemMatch: { _id: idProd } },
      });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default cartDBService;
