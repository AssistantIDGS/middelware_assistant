const bedrockClient = new BedrockRuntimeClient(bedrockConfig);

async function invokeModel(prompt) {
  const command = new InvokeModelCommand({
    modelId: bedrockConfig.modelId,
    contentType: bedrockConfig.contentType,
    accept: bedrockConfig.accept,
    body: JSON.stringify({
      prompt: prompt,
      max_gen_len: bedrockConfig.max_gen_len,
      temperature: bedrockConfig.temperature,
      top_p: bedrockConfig.top_p,
    }),
  });

  try {
    const response = await bedrockClient.send(command);

    const decoder = new TextDecoder('utf-8');
    const responseBody = decoder.decode(response.body);

    const parsedBody = JSON.parse(responseBody);

    if (parsedBody.generation || parsedBody.generation.length > 0) {
      return parsedBody.generation;
    } else {
      throw new Error("Estructura inesperada en la respuesta del modelo.");
    }
  } catch (error) {
    console.error("Error al invocar el modelo:", error.message);
    throw error;
  }
}
