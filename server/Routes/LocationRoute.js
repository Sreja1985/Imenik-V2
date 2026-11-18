import express from "express";
import con from "../utils/db.js";

const router = express.Router();
/* GET All from table locality */
router.get("/", async (req, res) => {
  try {
    const [result] = await con.query("SELECT * FROM locality ORDER BY locality_name ASC");
    return res.json(result);
  } catch (err) {
    return res.json({
      Status: false,
      Error: "Query Error",
      Details: err.message,
    });
  }
});
/* INSERT Locality */
router.post("/add", async (req, res) => {
  const { locality_name, locality_color } = req.body; // Extract data from request body

  if (!locality_name || !locality_color) {
    return res.status(400).json({
      Status: false,
      Error: "Invalid input",
      Details: "Both locality_name and locality_color are required.",
    });
  }

  try {
    // Check if the locality_name already exists in the table
    const [existingLocality] = await con.query(
      "SELECT * FROM locality WHERE locality_name = ?",
      [locality_name]
    );

    if (existingLocality.length > 0) {
      return res.status(409).json({
        Status: false,
        Error: "Conflict",
        Details: "Locality name already exists.",
      });
    }

    // Insert the new locality
    const [result] = await con.query(
      "INSERT INTO locality (locality_name, locality_color) VALUES (?, ?)",
      [locality_name, locality_color]
    );

    return res.status(201).json({
      Status: true,
      Message: "Locality added successfully",
      InsertedID: result.insertId, // ID of the inserted row
    });
  } catch (err) {
    return res.status(500).json({
      Status: false,
      Error: "Insertion Error",
      Details: err.message,
    });
  }
});

/* UPDATE Locality */
router.put("/update/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL parameters
  const { locality_name, locality_color } = req.body; // Extract data from the request body

  // Validate that required fields are provided
  if (!locality_name || !locality_color) {
    return res.status(400).json({
      Status: false,
      Error: "Invalid input",
      Details: "Both locality_name and locality_color are required for update.",
    });
  }

  try {
    // Update query
    const [result] = await con.query(
      "UPDATE locality SET locality_name = ?, locality_color = ? WHERE id = ?",
      [locality_name, locality_color, id]
    );

    // Check if any row was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({
        Status: false,
        Error: "Not Found",
        Details: "No locality found with the provided ID.",
      });
    }

    return res.status(200).json({
      Status: true,
      Message: "Locality updated successfully",
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



/* UPDATE  Locality INVISIBLE */
router.put("/invisible/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await con.query(
      "UPDATE locality SET is_deleted = 1 WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      // If no rows were updated, return a not found error
      return res
        .status(404)
        .json({ Status: false, Error: "Locality not found" });
    }

    return res.json({
      Status: true,
      Message: "Locality marked as deleted successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Status: false, Error: "Update Error", Details: err.message });
  }
});

/* UPDATE  Locality VISIBLE */
router.put("/visible/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await con.query(
      "UPDATE locality SET is_deleted = 0 WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      // If no rows were updated, return a not found error
      return res
        .status(404)
        .json({ Status: false, Error: "Locality not found" });
    }

    return res.json({
      Status: true,
      Message: "Locality marked as deleted successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Status: false, Error: "Update Error", Details: err.message });
  }
});


export { router as LocationRoute };
