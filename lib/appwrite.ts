import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client()
    .setEndpoint("https://sgp.cloud.appwrite.io/v1")
    .setProject("6a1cf32a002c668912cc");

if (typeof window === 'undefined' && process.env.APPWgtrailskey) {
  client.setKey(process.env.APPWgtrailskey);
}

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage };
