import fs from "fs";

class CartManager {
    constructor() {
        this.carts = [];
        this.path = "./carrito.json";
        this.id = 0;

    }
    addCart = async (prods) => {
        const cart = {
            id: ++this.id,
            products: [...prods],
        };
    }
    getCartById = (id) => {
        return this.carts.find((cart) => cart.id === id);
    }
    addProductToCart = (idCart, idProd, quant) => {
        const prod = {
            product: id,
            quantity: quant,
        }
        let coincidenciasCart = this.carts.findIndex((cart) => cart.id === idCart);
        if (coincidenciasCart === -1) {
            return console.error("Not found cart");
        } else {
            let coincidenciasProd = this.carts[coincidenciasCart].findIndex((prod) => prod.id === idProd);

            if (coincidenciasProd === -1) {
                this.carts[coincidenciasCart].products.push(prod);
            } else {
                this.carts[coincidenciasCart].products[coincidenciasProd].quantity += quant;
            }

        }

    };
    sendCarts = async () => {
        try {
            const carts = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(carts);
        }
        catch (error) {
            console.log(error);
            return this.carts
        }

    };
}
export default CartManager;