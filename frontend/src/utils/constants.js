let PORT = process.env.REACT_APP_NODE_ENV === 'test' ? 8010 : 8000;

export const urlApi = `http://localhost:${PORT}`;