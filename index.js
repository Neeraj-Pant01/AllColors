const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors")
const helmet = require("helmet")
const {xss} = require("express-xss-sanitizer")
const compression = require("compression")
const swaggerSpec = require("./src/swagger/swagger")
const swaggerUi = require("swagger-ui-express");
const { sanitizeNoassign } = require("./src/middlewares/sanitize");
const authRoute = require("./src/routes/auth.route");


const app = express();

app.use(express.json())
app.use(cors())
app.use(helmet())

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "Internal server error !"
    return res.status(errStatus).json(errMessage);
})

app.use(xss())
app.use(compression())
app.use(sanitizeNoassign)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/auth', authRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running at the ${PORT}`)
})