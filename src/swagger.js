import swaggerAutogen from 'swagger-autogen'
swaggerAutogen()

const outputFile = './swagger_output.json'
const routes = ['./routes.js']

swaggerAutogen(outputFile, routes)