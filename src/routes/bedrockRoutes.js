import express from "express";
import invokeModel from "../services/aws/bedrock.js";
import { listModels } from "../services/aws/bedrock.js";

const bedrockRouter = express.Router();

bedrockRouter.use((req, res, next)=>{
    console.log(req.ip)
    next();
});


bedrockRouter.post('/invoke', async (req, res) => {  
  const { prompt, modelId } = req.body;
  
    if (!prompt || !modelId) {
    
      return res.status(400).send({ error: 'Prompt y modelId son requeridos.' });
    
    }
  
    try {
      
      const result = await invokeModel(prompt, modelId);
      console.log(result)
      res.json({ response: result });

    } catch (error) {
      
      res.status(500).json({ error: error.message });
    }
});

bedrockRouter.post('/models', async (req, res) => {
  try {
    const models = await listModels();
    res.json({ models });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  export default bedrockRouter;