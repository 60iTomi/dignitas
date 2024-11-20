import { createServer } from 'node:http';
import { Databases, Client } from'node-appwrite';


const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("670145c3000f4c561037")
    .setKey("NOTTELLINYOULOL")

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

