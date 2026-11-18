import express from "express";
import con from "../utils/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [result] = await con.query(
      `SELECT 
        departments.id, 
        departments.department_name,
        departments.is_deleted,
        departments.id_locality,          
        departments.id_headquarters,      
        locality.locality_name,
        headquarters.headquarters_name,   
        headquarters.short_name AS polinom
        FROM departments
        LEFT JOIN locality ON departments.id_locality = locality.id
        LEFT JOIN headquarters ON departments.id_headquarters = headquarters.id
        ORDER BY department_name;
    `.trim()
    );
    return res.json(result);
  } catch (err) {
    return res.json({
      Status: false,
      Error: "Query Error",
      Details: err.message,
    });
  }
});

/* INSERT Department */
router.post("/add", async (req, res) => {
  const { department_name, id_headquarters, id_locality } = req.body; // Extract data from request body

  // Check for missing fields
  if (!department_name || !id_headquarters || !id_locality) {
    return res.status(400).json({
      Status: false,
      Error: "Invalid input",
      Details:
        "department_name, id_headquarters, and id_locality are required.",
    });
  }

  try {
    // Insert the new department without checking existing names
    const [result] = await con.query(
      "INSERT INTO departments (department_name, id_headquarters, id_locality) VALUES (?, ?, ?)",
      [department_name, id_headquarters, id_locality]
    );

    // Respond with a success message and the ID of the inserted row
    return res.status(201).json({
      Status: true,
      Message: "Department added successfully",
      InsertedID: result.insertId, // The ID of the newly inserted row
    });
  } catch (err) {
    // Handle any database or query errors
    return res.status(500).json({
      Status: false,
      Error: "Insertion Error",
      Details: err.message,
    });
  }
});

// UPDATE Department
router.put("/update/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL parameters
  const { department_name, id_headquarters, id_locality } = req.body; // Extract data from the request body

  // Validate that required fields are provided
  if (!department_name || !id_headquarters || !id_locality) {
    return res.status(400).json({
      Status: false,
      Error: "Invalid input",
      Details:
        "All department_name, id_headquarters, and id_locality are required for update.",
    });
  }

  try {
    // Update query
    const [result] = await con.query(
      "UPDATE departments SET department_name = ?, id_headquarters= ?, id_locality = ? WHERE id = ?",
      [department_name, id_headquarters, id_locality, id]
    );

    // Check if any row was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({
        Status: false,
        Error: "Not Found",
        Details: "No department found with the provided ID.",
      });
    }

    return res.status(200).json({
      Status: true,
      Message: "Department updated successfully",
      UpdatedID: id,
    });
  } catch (err) {
    return res.status(500).json({
      Status: false,
      Error: "Update Error",
      Details: err.message,
    });
  }
});

/* UPDATE  Departments INVISIBLE */
router.put("/invisible/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await con.query(
      "UPDATE departments SET is_deleted = 1 WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      // If no rows were updated, return a not found error
      return res
        .status(404)
        .json({ Status: false, Error: "Department not found" });
    }

    return res.json({
      Status: true,
      Message: "Department marked as deleted successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Status: false, Error: "Update Error", Details: err.message });
  }
});

/* UPDATE  Departments VISIBLE */
router.put("/visible/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await con.query(
      "UPDATE departments SET is_deleted = 0 WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      // If no rows were updated, return a not found error
      return res
        .status(404)
        .json({ Status: false, Error: "Department not found" });
    }

    return res.json({
      Status: true,
      Message: "Department marked as deleted successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Status: false, Error: "Update Error", Details: err.message });
  }
});

export { router as DepartmentRoute };
