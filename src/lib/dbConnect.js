const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URI;
const dbname = process.env.DB_NAME  

export const collections = {
    PRODUCTS: "products",
    USERS: "users",
    CART: "cart"
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const dbConnect = (cname) => {
    return client.db(dbname).collection(cname)
}