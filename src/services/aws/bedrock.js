import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import bedrockConfig from "../../config/bedrock.js";
import { modelList } from "../../config/modelList.js";

export const listModels = () => {
  return modelList;
};

// Función auxiliar para validar arrays no vacíos
const isNonEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0;

// Función para extraer el contenido de diferentes estructuras de respuesta
const extractModelResponse = (parsedBody) => {
  if (!parsedBody) {
    throw new Error('Invalid response body');
  }

  // Define la estructura de mapeo para diferentes formatos de respuesta
  const responseFormats = {
    generation: (body) => body.generation,
    results: (body) => body.results[0]?.outputText,
    choices: (body) => body.choices[0]?.message?.content,
    chat_history: (body) => body.chat_history[1].message
  };

  // Verifica cada formato posible
  for (const [key, extractor] of Object.entries(responseFormats)) {
      
    // console.log(extractor)

    if (parsedBody[key]) {
      
      const content = extractor(parsedBody);

      if (content) return content;
      
    }
  }

  throw new Error('No valid content found in model response');
};

// Función auxiliar para actualizar el prompt en el cuerpo de la solicitud
const updatePromptInBody = (body, prompt) => {
  const updatedBody = { ...body };
  
  if (updatedBody.prompt) {
    updatedBody.prompt = prompt;
  }
  if (updatedBody.inputText) {
    updatedBody.inputText = prompt;
  }
  if (updatedBody.messages && Array.isArray(updatedBody.messages) && updatedBody.messages.length > 0) {
    updatedBody.messages[0].content = prompt;
  }
  if (updatedBody.message) {
    updatedBody.message = prompt;
  }

  return updatedBody;
};

const invokeModel = async (prompt, modelId) => {
  // Buscar el modelo en la lista
  const model = modelList.find((m) => m.modelId === modelId);
  
  if (!model) {
    throw new Error(`Model ${modelId} not found in model list.`);
  }

  // Actualizar el cuerpo de la solicitud con el prompt
  const body = updatePromptInBody(model.body, prompt);

  // Configurar la invocación del modelo
  const invokeModelConfig = {
    ...bedrockConfig,
    region: model.region,
    modelId: model.modelId,
    body: JSON.stringify(body)
  };
  console.log(invokeModelConfig)
  try {
    // Crear cliente y comando
    const bedrockClient = new BedrockRuntimeClient({ region: model.region });
    const command = new InvokeModelCommand(invokeModelConfig);

    // Ejecutar la llamada al modelo
    const response = await bedrockClient.send(command);
    

    if (!response?.body) {
      throw new Error("Empty or invalid response from model.");
    }

    // Decodificar y parsear la respuesta
    const decoder = new TextDecoder('utf-8');

    const responseBody = decoder.decode(response.body);
    
    const parsedBody = JSON.parse(responseBody);

    console.log(parsedBody)
    // Extraer y retornar el contenido de la respuesta
    return extractModelResponse(parsedBody);

  } catch (error) {
    console.error("Error invoking model:", error.message);
    throw error;
  }
};

export default invokeModel;