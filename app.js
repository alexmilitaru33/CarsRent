const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require("./routes/carRoutes")
const inchiriereRoutes = require("./routes/inchiriereRoutes")
const specificatiiRoutes = require('./routes/specificatiiRoutes');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
 
app.use(cors());
app.use(bodyParser.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/inchiriere', inchiriereRoutes);
app.use('/specificatii', specificatiiRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
