import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import bedrockConfig from "../../config/bedrock.js";
import { modelList } from "../../config/modelList.js";


export const listModels = () => {
  return modelList;
};


const invokeModel = async (prompt, modelId) => {
  const model = modelList.find((m) => m.modelId === modelId);
  // console.log(model);

  // Verificar si el modelo existe
  if (!model) {
    throw new Error(`Modelo ${modelId} no encontrado en la lista de modelos.`);
  }

  // Crear una copia del objeto de configuración del cuerpo del modelo para evitar mutaciones
  const body = { ...model.body };

  // Actualizar el prompt en la configuración del cuerpo si existe
  if (body.hasOwnProperty('prompt')) {
    body.prompt = prompt;
  }

  // Si el cuerpo del modelo utiliza 'inputText', lo actualizamos
  if (body.hasOwnProperty('inputText')) {
    body.inputText = prompt;
  }

  // Si el cuerpo del modelo utiliza 'messages', actualizamos el contenido del primer mensaje
  if (body.messages && Array.isArray(body.messages) && body.messages.length > 0) {
    body.messages[0].content = prompt;
  }

  // Crear la configuración para invocar el modelo sin la referencia circular
  const invokeModelConfig = {
    ...bedrockConfig,
    region: model.region,
    modelId: model.modelId,
    body: JSON.stringify(body) // Convierte el objeto modificado a una cadena JSON antes de enviarlo
  };

  console.log(invokeModelConfig);

  // Crear una instancia del cliente Bedrock con la configuración general
  const bedrockClient = new BedrockRuntimeClient({ region: model.region });

  // Crear el comando con la configuración específica para invocar el modelo
  const command = new InvokeModelCommand(invokeModelConfig);

  try {
    const response = await bedrockClient.send(command);

    // console.log("Respuesta completa del modelo:", response);

    if (!response || !response.body) {
      throw new Error("Respuesta inválida o vacía del modelo.");
    }

    const decoder = new TextDecoder('utf-8');
    const responseBody = decoder.decode(response.body);
    const parsedBody = JSON.parse(responseBody);

    // Imprimimos la estructura completa de la respuesta para analizarla
    console.log("Estructura de la respuesta decodificada:", parsedBody);

    // Ajusta la lógica basada en la estructura real de la respuesta
    if ((parsedBody.results && parsedBody.results.length > 0)||(parsedBody.generation && parsedBody.generation.length > 0)) {
      return parsedBody.generation || parsedBody.results[0].outputText;
    } else {
      throw new Error("Estructura inesperada en la respuesta del modelo.");
    }
  } catch (error) {
    console.error("Error al invocar el modelo:", error.message);
    throw error;
  }
};

export default invokeModel;
