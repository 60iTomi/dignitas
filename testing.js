import { Client, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("670145c3000f4c561037")

const databases = new Databases(client);

let promise = databases.listDocuments(
    "673c4f1b00129f34b96a",
    "673c5142003d61bb913a",
);

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});
