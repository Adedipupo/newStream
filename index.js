const grpc = require('grpc');
const { GreetingService } = require('./generated/service_grpc_pb');
const { HelloResponse } = require('./generated/service_pb');

const server = new grpc.Server();

server.addService(GreetingService, {
  sayHello: (call, callback) => {
    const request = call.request;
    const response = new HelloResponse();
    response.setMessage(`Hello, ${request.getName()}!`);
    callback(null, response);
  },
});

const PORT = 50051;
server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
console.log(`Server running on port ${PORT}`);
server.start();
