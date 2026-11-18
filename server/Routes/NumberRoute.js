import express from "express";
import con from "../utils/db.js";

const router = express.Router();
// Get NUMBER for Search
router.get("/", async (req, res) => {
  try {
    const [result] = await con.query(
      `
      SELECT 
        n.*, 
        l.locality_name, 
        d.department_name,
        h.headquarters_name,
        h.short_name
      FROM numbers n
      LEFT JOIN locality l ON n.id_locality = l.id
      LEFT JOIN departments d ON n.id_departments = d.id
      LEFT JOIN headquarters h ON n.id_headquarters = h.id
      WHERE n.to_delete = 0 
      ORDER BY n.phone_name ASC
      `
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
//Get Single NUMBER
router.get("/details/:phoneNumber", async (req, res) => {
  const { phoneNumber } = req.params;
  try {
    const [result] = await con.query(
      `
      SELECT 
        n.*, 
        l.locality_name, 
        d.department_name,
        h.headquarters_name,
        h.short_name
      FROM numbers n
      LEFT JOIN locality l ON n.id_locality = l.id
      LEFT JOIN departments d ON n.id_departments = d.id
      LEFT JOIN headquarters h ON n.id_headquarters = h.id
      WHERE n.phone_number = ? AND n.to_delete = 0
      `,
      [phoneNumber]
    );
    if (result.length > 0) {
      return res.status(200).json(result[0]);
    } else {
      return res.status(404).json({
        Status: false,
        Error: "Number not found.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      Status: false,
      Error: "Query Error",
      Details: err.message,
    });
  }
});

// GEt DELETED Numbers
router.get("/deleted-numbers", async (req, res) => {
  try {
    const [result] = await con.query(
      `
      SELECT 
        n.*, 
        l.locality_name, 
        d.department_name,
        h.headquarters_name,
        h.short_name
      FROM numbers n
      LEFT JOIN locality l ON n.id_locality = l.id
      LEFT JOIN departments d ON n.id_departments = d.id
      LEFT JOIN headquarters h ON n.id_headquarters = h.id
      WHERE n.to_delete = 1
      ORDER BY n.phone_name ASC
      `
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


router.post("/add", async (req, res) => {
  const {
    phone_name,
    phone_number,
    vip_number,
    id_headquarters,
    id_locality,
    id_departments,
  } = req.body;
  if (
    !phone_name ||
    !phone_number ||
    !id_headquarters ||
    !id_locality ||
    !id_departments
  ) {
    return res.status(400).json({
      Status: false,
      Error: "Invalid input",
      Details: "Sva polja moraju biti popunjena",
    });
  }
  try {
    const vipNumberToInsert = vip_number === 0 ? null : vip_number;
    const [result] = await con.query(
      `
      INSERT INTO numbers 
      (phone_name, phone_number, vip_number, id_locality, id_headquarters, id_departments) 
      VALUES (?, ?, ?, ?, ?, ?
      )`,
      [
        phone_name,
        phone_number,
        vipNumberToInsert,
        id_locality,
        id_headquarters,
        id_departments,
      ]
    );
    return res.status(201).json({
      Status: true,
      Message: "Number added successfully",
      InsertedID: result.insertId,
    });
  } catch (err) {
    return res.status(500).json({
      Status: false,
      Error: "Insertion Error",
      Details: err.message,
    });
  }
});

/* UPDATE Number */
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    phone_name,
    phone_number,
    vip_number,
    id_headquarters,
    id_locality,
    id_departments,
  } = req.body;

  if (
    !phone_name ||
    !phone_number ||
    !id_headquarters ||
    !id_locality ||
    !id_departments
  ) {
    return res.status(400).json({
      Status: false,
      Error: "Invalid input",
      Details: "Sva polja moraju biti popunjena",
    });
  }

  try {
    const vipNumberToUpdate = vip_number === "" ? null : vip_number;

    // Ispravan SQL upit
    const [result] = await con.query(
      `UPDATE numbers 
      SET phone_name = ?, phone_number = ?, vip_number = ?, id_headquarters = ?, id_locality = ?, id_departments = ? 
      WHERE id = ?
      `,
      [
        phone_name,
        phone_number,
        vipNumberToUpdate,
        id_headquarters,
        id_locality,
        id_departments,
        id,
      ]
    );

    // Provjerite je li ažuriran barem jedan red
    if (result.affectedRows === 0) {
      return res.status(404).json({
        Status: false,
        Error: "Not Found",
        Details: "No number found with the provided ID.",
      });
    }

    return res.status(200).json({
      Status: true,
      Message: "Number updated successfully",
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

// Set NUMBER InActive
router.put("/invisible/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await con.query(
      "UPDATE numbers SET is_active = 0 WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ Status: false, Error: "Number not found" });
    }
    return res.json({
      Status: true,
      Message: "Number marked as inactive successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Status: false, Error: "Update Error", Details: err.message });
  }
});
// Set NUMBER Active
router.put("/visible/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await con.query(
      "UPDATE numbers SET is_active = 1 WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ Status: false, Error: "Number not found" });
    }
    return res.json({
      Status: true,
      Message: "Number marked as active successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Status: false, Error: "Update Error", Details: err.message });
  }
});
// Set NUMBER Deleted
router.put("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await con.query(
      "UPDATE numbers SET to_delete = 1 WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ Status: false, Error: "Number not found" });
    }
    return res.json({
      Status: true,
      Message: "Number deleted successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Status: false, Error: "Update Error", Details: err.message });
  }
});
// Return Deleted NUMBER
router.put("/return/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await con.query(
      "UPDATE numbers SET to_delete = 0, is_active = 1 WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ Status: false, Error: "Number not found" });
    }
    return res.json({
      Status: true,
      Message: "Number returned successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Status: false, Error: "Update Error", Details: err.message });
  }
});

////COUNTERS////
/// Deleted Numbers Counter
router.get("/deleted-count", async (req, res) => {
  try {
    const [result] = await con.query(
      "SELECT COUNT(*) AS deleted_numbers_count FROM numbers WHERE to_delete = TRUE"
    );
    return res.status(200).json(result[0]);
  } catch (err) {
    return res.status(500).json({
      Status: false,
      Error: "Query Error",
      Details: err.message,
    });
  }
});

///VIP NUmbers Counter
router.get("/vip-count", async (req, res) => {
  try {
    const [result] = await con.query(
      /*"SELECT COUNT(*) AS vip_numbers FROM numbers WHERE vip_number IS NOT NULL AND to_delete = FALSE"*/
        ` SELECT 
            COUNT(*) AS numbers_count 
            FROM 
            numbers 
            WHERE 
            LENGTH(CAST(phone_number AS CHAR)) = 5
            AND (
                CAST(phone_number AS CHAR) LIKE '26%'
                OR CAST(phone_number AS CHAR) LIKE '27%'
            )
            AND to_delete = FALSE;
        `
    );

    return res.status(200).json(result[0]);
  } catch (err) {
    return res.status(500).json({
      Status: false,
      Error: "Query Error",
      Details: err.message,
    });
  }
});

//Locality Counter
router.get("/locality-count", async (req, res) => {
  try {
    const [result] = await con.query(
      `
      SELECT 
          L.locality_name,
          L.locality_color,
          COUNT(N.id) AS number_count
      FROM
          locality AS L
      LEFT JOIN
          numbers AS N ON N.id_locality = L.id
      WHERE
          N.to_delete = FALSE OR N.to_delete IS NULL
      GROUP BY
          L.id, L.locality_name, L.locality_color
      ORDER BY
          L.locality_name ASC;
      `
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      Status: false,
      Error: "Query Error",
      Details: err.message,
    });
  }
});

export { router as NumberRoute };
