const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const usersRouter = require("./routes/users");

const PORT = process.env.PORT || 5000;
const app = express();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Looksies API",
            version: "1.0.0",
            description: "Looksies Social App APIs",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/users", usersRouter);
app.listen(PORT, () => console.log(`App is listening on the port ${PORT}`))