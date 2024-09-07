import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST'], // Allowed methods
  origin: '*', // Allow all origins
});

// Helper function to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Export the initMiddleware function
export default async function initMiddleware(req, res) {
  await runMiddleware(req, res, cors);
}
