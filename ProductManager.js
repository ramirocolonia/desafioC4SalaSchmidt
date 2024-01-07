const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./Usuarios.json";
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data) || [];
    } catch (err) {
      console.error(err);
    }
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!this.products.find(({ code }) => code === code)) {
      const newProduct = {
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      if (
        Object.values(newProduct).every(
          (value) => String(value).trim() !== "" && value !== undefined
        )
      ) {
        this.products.push(newProduct);
        try {
          fs.writeFileSync(this.path, JSON.stringify(this.products));
          console.log("OK, producto agregado correctamente");
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log("ERROR, todos los campos son obligatorios");
      }
    } else {
      console.log("ERROR, el codigo ingresado del producto ya existe");
    }
  }

  getProducts() {
    this.loadProducts();
    return this.products;
  }

  getProductById(pid) {
    this.loadProducts();
    return this.products.find((prod) => prod.id === pid) || "Not Found";
  }

  updateProduct(pid, { title, description, price, thumbnail, code, stock }) {
    const product = this.getProductById(pid);
    if (product != "Not Found") {
      product.title = title;
      product.description = description;
      product.price = price;
      product.thumbnail = thumbnail;
      product.code = code;
      product.stock = stock;
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      console.log("OK, producto modificado correctamente");
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteProduct(pid) {
    if (this.getProductById(pid) !== "Not Found") {
      this.products = this.products.filter(({ id }) => id !== pid);
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      console.log("OK, producto eliminado correctamente");
    } else {
      console.log("El producto que desea eliminar no se encuentra");
    }
  }
}

//   TESTING SUGERIDO EN SLIDE
const productManager = new ProductManager();
console.log(productManager.getProducts());

productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto de prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 25,
});

productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto de prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 25,
});

console.log(productManager.getProducts());

console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2));

productManager.updateProduct(1, {
  title: "producto prueba modificado",
  description: "Este es un producto de prueba modificado",
  price: 100,
  thumbnail: "con imagen",
  code: "123",
  stock: 250,
});

productManager.updateProduct(2, {
  title: "producto prueba modificado",
  description: "Este es un producto de prueba modificado",
  price: 100,
  thumbnail: "con imagen",
  code: "123",
  stock: 250,
});

console.log(productManager.getProducts());

productManager.deleteProduct(1);
productManager.deleteProduct(1);
