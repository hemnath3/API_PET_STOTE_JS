const request = require("supertest");
const expect = require("chai").expect;
require("dotenv").config();
animalData = require("../testData/petStoreData.json");
helper = require("../testData/helperfile.json");
global.AnimalId = null;

const TOKEN = process.env.USER_TOKEN;

describe("Pet Store API Testing", () => {
  it("Post Request-Add a pet to the store", async () => {
    const randomNo = Math.floor(Math.random() * 123456);
    animalData.id = randomNo;

    const response = await request(helper.url)
      .post("/pet")
      .set("Content-Type", "application/json")
      .send(animalData);

    global.AnimalId = response.body.id;

    expect(200);
    expect(response.body).to.not.be.empty;

    expect(response.body.id).to.be.eq(animalData.id);
    expect(response.body.name).to.be.eq(animalData.name);
    expect(response.body.status).to.be.eq(animalData.status);

    console.log(
      "The animal(Id: " +
        animalData.id +
        ") added to the store is : " +
        animalData.name
    );
  });

  it("GET Request-Get a pet from the store", async () => {
    const response = await request(helper.url).get("/" + global.AnimalId);

    expect(200);

    console.log(
      "The animal(Id: " + animalData.id + ") is available in the store"
    );
  });

  it("PUT Request-Update a pet in the store", async () => {
    animalData.name = "Moonfish";
    const response = await request(helper.url)
      .put("/pet")

      .send(animalData);

    expect(200);
    expect(response.body).to.not.be.empty;

    expect(response.body.id).to.be.eq(animalData.id);
    expect(response.body.name).to.be.eq(animalData.name);
    expect(response.body.status).to.be.eq(animalData.status);
    console.log(
      "The name of the animal(Id: " +
        animalData.id +
        ") is updated to : " +
        animalData.name
    );
  });

  it("Delete Request-Delete a pet from the store", async () => {
    const response = await request(helper.url).delete("/" + global.AnimalId);

    expect(200);

    console.log(
      "The animal(Id: " + animalData.id + ") is now deleted from the store"
    );
  });

  it("Negative Test-GET Request-Pass a deleted Id", async () => {
    const response = await request(helper.url)
      .get("/" + global.AnimalId)

      .expect(404);

    console.log("The animal(Id: " + animalData.id + ") is not found");
  });
});
