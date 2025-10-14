// test/employeeRoutes.test.ts
import request from "supertest";
import app from "../src/app";

describe("Employee API Endpoints", () => {
  const testEmployee = {
    name: "Test Employee",
    position: "Senior Developer",
    department: "Test Department",
    email: "test@example.com",
    phone: "555-999-9999",
    branchId: "1"
  };

  describe("POST /api/v1/employees", () => {
    it("should create a new employee successfully", async () => {
      const response = await request(app)
        .post("/api/v1/employees")
        .send(testEmployee)
        .expect(201);

      expect(response.body).toHaveProperty("message", "Employee created successfully");
      expect(response.body.data).toMatchObject(testEmployee);
      expect(response.body.data).toHaveProperty("id");
    });

    it("should return 400 when required parameters are missing", async () => {
      const response = await request(app)
        .post("/api/v1/employees")
        .send({ name: "Incomplete Employee", position: "Tester" })
        .expect(400);

      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("errors");
    });
  });

  describe("GET /api/v1/employees", () => {
    it("should return all employees as an array", async () => {
      const response = await request(app)
        .get("/api/v1/employees")
        .expect(200);

      expect(response.body).toHaveProperty("message", "Employees retrieved successfully");
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("GET /api/v1/employees/:id", () => {
    it("should return specific employee by ID", async () => {
      const response = await request(app)
        .get("/api/v1/employees/1")
        .expect(200);

      expect(response.body).toHaveProperty("message", "Employee found");
      expect(response.body.data).toHaveProperty("id", "1");
    });

    it("should return 404 for non-existent employee ID", async () => {
      const response = await request(app)
        .get("/api/v1/employees/999")
        .expect(404);

      expect(response.body).toHaveProperty("message", "Employee not found");
    });
  });

  describe("PUT /api/v1/employees/:id", () => {
    it("should update employee successfully", async () => {
      const updateData = { position: "Test Position", phone: "555-123-9999" };
      
      const response = await request(app)
        .put("/api/v1/employees/1")
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty("message", "Employee updated successfully");
      expect(response.body.data).toMatchObject(updateData);
    });

    it("should return 404 when updating non-existent employee", async () => {
      const response = await request(app)
        .put("/api/v1/employees/999")
        .send({ position: "Senior Developer" })
        .expect(404);

      expect(response.body).toHaveProperty("message", "Employee not found");
    });
  });

  describe("DELETE /api/v1/employees/:id", () => {
    it("should delete employee successfully", async () => {
      const response = await request(app)
        .delete("/api/v1/employees/2")
        .expect(200);

      expect(response.body).toHaveProperty("message", "Employee deleted successfully");
    });

    it("should return 404 when deleting non-existent employee", async () => {
      const response = await request(app)
        .delete("/api/v1/employees/999")
        .expect(404);

      expect(response.body).toHaveProperty("message", "Employee not found");
    });
  });
});

describe("Employee Logical Operations API Endpoints", () => {
  describe("GET /api/v1/branches/:branchId/employees", () => {
    it("should return all employees for a specific branch successfully", async () => {
      const response = await request(app)
        .get("/api/v1/branches/1/employees")
        .expect(200);

      expect(response.body).toHaveProperty("message", "Employees for branch 1 retrieved successfully");
      expect(Array.isArray(response.body.data)).toBe(true);
      
      // Verify all returned employees belong to branch 1
      response.body.data.forEach((employee: any) => {
        expect(employee).toHaveProperty("branchId", "1");
      });
    });

    it("should return 400 when branch ID parameter is missing", async () => {
      const response = await request(app)
        .get("/api/v1/branches/%20/employees") 
        .expect(400);

      expect(response.body).toHaveProperty("message", "Branch ID parameter is required");
    });

    it("should return empty array for non-existent branch ID", async () => {
      const response = await request(app)
        .get("/api/v1/branches/999/employees")
        .expect(200);

      expect(response.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/departments/:department/employees", () => {
    it("should return all employees for a specific department successfully", async () => {
      const response = await request(app)
        .get("/api/v1/departments/Management/employees")
        .expect(200);

      expect(response.body).toHaveProperty("message", "Employees in department Management retrieved successfully");
      expect(Array.isArray(response.body.data)).toBe(true);
      
      // Verify all returned employees belong to Management department
      response.body.data.forEach((employee: any) => {
        expect(employee.department.toLowerCase()).toBe("management");
      });
    });

    it("should return 400 when department parameter is missing", async () => {
      const response = await request(app)
        .get("/api/v1/departments/%20/employees") 
        .expect(400);

      expect(response.body).toHaveProperty("message", "Department parameter is required");
    });

    it("should handle case-insensitive department names", async () => {
      const response = await request(app)
        .get("/api/v1/departments/managEMENT/employees")
        .expect(200);

      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});