import dotenv from {dotenv}
dotenv.config();

const bedrockConfig = {
    // Configuración de la solicitud
    contentType: "application/json",
    accept: "application/json",
    // Configuración de la región y credenciales de AWS
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  };

  export default bedrockConfig;