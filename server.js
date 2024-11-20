import { createServer } from 'node:http';
import { Databases, Client } from'node-appwrite';


const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("670145c3000f4c561037")
    .setKey("standard_e2b215d1be614da28aefe5c23f01a7ff0858ab30e8c18183647d31f05db5bb6aec9d74ec72d42a81b12d66dcbbbcd37eadb40e0a845edba402693a5b203e4d1183d952ecc66715626216810db1d331e10b63170ccf358f8675145a685b4b180a417168449b7160b8668b779e67d82ac0cc2de92f21cbc44a4f55e38c52689440")

const databases = new Databases(client);

let promise = databases.listDocuments(
    "673c4f1b00129f34b96a",
    "673c5142003d61bb913a",
);

let establishments = [];

promise.then(function (response) {
    console.log(response);
    establishments = response.documents;
  }, function (error) {
    console.log(error);
});

