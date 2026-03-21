const config = {
  SERVICE_ID: import.meta.env.VITE_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_PUBLIC_KEY,
};

if (!config.SERVICE_ID) throw new Error("SERVICE_ID missing");
if (!config.TEMPLATE_ID) throw new Error("TEMPLATE_ID missing");
if (!config.PUBLIC_KEY) throw new Error("PUBLIC_KEY missing");

export default config;
