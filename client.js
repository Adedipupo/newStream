const grpc = require('grpc');
const { GreetingService } = require('./generated/service_grpc_pb');
const { HelloRequest } = require('./generated/service_pb');

const client = new GreetingService('localhost:50051', grpc.credentials.createInsecure());

const request = new HelloRequest();
request.setName('Alice');

client.sayHello(request, (error, response) => {
  if (!error) {
    console.log('Server Response:', response.getMessage());
  } else {
    console.error('Error:', error.message);
  }
});

