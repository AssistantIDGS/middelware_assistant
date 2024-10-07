import express from 'express';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import dotenv from "dotenv";
import cors from 'cors';
import bedrockRouter from './src/routes/bedrockRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite todas las solicitudes
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/bedrock', bedrockRouter)


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});