import express from "express";
import productsRouter from "./routes/products.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/products", productsRouter);

app.get("/products", (req, res) => {
    res.send("Hello world");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
