const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = YAML.load(path.join(__dirname, "../swagger/swagger.yaml"));

app.use(express.json());

app.use(authRoutes);
app.use(checkoutRoutes);
app.use(healthRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
