import { app } from "./app.js";
import { ConnectDb } from "./data/connectDB.js";

ConnectDb();
const PORT_URL = process.env.PORT_URL || 4000;
app.listen(PORT_URL, () => {
  console.log(`Server started at Port ${PORT_URL}`);
});
