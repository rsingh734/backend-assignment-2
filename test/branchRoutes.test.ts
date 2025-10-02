import request from "supertest";
import app from "../src/app";

describe("Branch API Endpoints", () => {
  const testBranch = {
    name: "Test Branch",
    address: "123 Test Street, Test City, TC 12345",
    phone: "555-1234"
  };

  describe("POST /api/v1/branches", () => {
    it("should create a new branch successfully", async () => {
      const response = await request(app)
        .post("/api/v1/branches")
        .send(testBranch)
        .expect(201);

      expect(response.body).toHaveProperty("message", "Branch created successfully");
      expect(response.body.data).toMatchObject(testBranch);
      expect(response.body.data).toHaveProperty("id");
    });

    it("should return 400 when required parameters are missing", async () => {
      const response = await request(app)
        .post("/api/v1/branches")
        .send({ name: "Incomplete Branch" })
        .expect(400);

      expect(response.body).toHaveProperty("message", "All fields are required: name, address, phone");
    });
  });

  describe("GET /api/v1/branches", () => {
    it("should return all branches as an array", async () => {
      const response = await request(app)
        .get("/api/v1/branches")
        .expect(200);

      expect(response.body).toHaveProperty("message", "Branches retrieved successfully");
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/v1/branches/:id", () => {
    it("should return specific branch by ID", async () => {
      const response = await request(app)
        .get("/api/v1/branches/1")
        .expect(200);

      expect(response.body).toHaveProperty("message", "Branch found");
      expect(response.body.data).toHaveProperty("id", "1");
    });

    it("should return 404 for non-existent branch ID", async () => {
      const response = await request(app)
        .get("/api/v1/branches/999")
        .expect(404);

      expect(response.body).toHaveProperty("message", "Branch not found");
    });
  });

  describe("PUT /api/v1/branches/:id", () => {
    it("should update branch successfully", async () => {
      const updateData = { 
        name: "Updated Branch Name", 
        phone: "555-9999" 
      };
      
      const response = await request(app)
        .put("/api/v1/branches/1")
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty("message", "Branch updated successfully");
      expect(response.body.data).toMatchObject(updateData);
    });

    it("should return 404 when updating non-existent branch", async () => {
      const response = await request(app)
        .put("/api/v1/branches/999")
        .send({ name: "New Name" })
        .expect(404);

      expect(response.body).toHaveProperty("message", "Branch not found");
    });
  });

  describe("DELETE /api/v1/branches/:id", () => {
    it("should delete branch successfully", async () => {
      const response = await request(app)
        .delete("/api/v1/branches/2")
        .expect(200);

      expect(response.body).toHaveProperty("message", "Branch deleted successfully");
    });

    it("should return 404 when deleting non-existent branch", async () => {
      const response = await request(app)
        .delete("/api/v1/branches/999")
        .expect(404);

      expect(response.body).toHaveProperty("message", "Branch not found");
    });
  });
});