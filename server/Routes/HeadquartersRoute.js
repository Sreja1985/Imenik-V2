import express from 'express'
import con from "../utils/db.js";

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const [result] = await con.query("SELECT * FROM headquarters ORDER BY headquarters_name");
        return res.json(result);
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error", Details: err.message });
    }
});

/* INSERT Headquarter */
router.post("/add", async (req, res) => {
    const { headquarters_name, short_name, headquarters_color } = req.body;

    if (!headquarters_name || !short_name || !headquarters_color) {
        return res.status(400).json({
            Status: false,
            Error: "Invalid input",
            Details: "Both headquarters_name, short_name and headquarters_color are required.",
        });
    }

    try {
        const [existingHeadquarter] = await con.query(
            "SELECT * FROM headquarters WHERE headquarters_name = ? AND short_name = ?",
            [headquarters_name, short_name]
        );

        if (existingHeadquarter.length > 0) {
            return res.status(409).json({
                Status: false,
                Error: "Conflict",
                Details: "Headquarter name already exists.",
            });
        }

        const [result] = await con.query(
            "INSERT INTO headquarters (headquarters_name, short_name, headquarters_color) VALUES (?, ?, ?)",
            [headquarters_name, short_name, headquarters_color]
        );

        return res.status(201).json({
            Status: true,
            Message: "Headquarter added successfully",
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

/* UPDATE Headquarters INVISIBLE */
router.put("/invisible/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await con.query(
            "UPDATE headquarters SET is_deleted = 1 WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: false, Error: "Headquarter not found" });
        }

        return res.json({
            Status: true,
            Message: "Headquarter marked as deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Update Error", Details: err.message });
    }
});

/* UPDATE Headquarters */
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { headquarters_name, short_name, headquarters_color } = req.body;

    if (!headquarters_name || !short_name || !headquarters_color) {
        return res.status(400).json({
            Status: false,
            Error: "Invalid input",
            Details: "All headquarters_name, short_name, and headquarters_color are required for update.",
        });
    }

    try {
        const [result] = await con.query(
            "UPDATE headquarters SET headquarters_name = ?, short_name= ?, headquarters_color = ? WHERE id = ?",
            [headquarters_name, short_name, headquarters_color, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                Status: false,
                Error: "Not Found",
                Details: "No headquarter found with the provided ID.",
            });
        }

        return res.status(200).json({
            Status: true,
            Message: "Headquarter updated successfully",
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


/* UPDATE Headquarters VISIBLE */
router.put("/visible/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await con.query(
            "UPDATE headquarters SET is_deleted = 0 WHERE id = ?",
            [id]
        );
        

        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: false, Error: "Headquarter not found" });
        }

        return res.json({
            Status: true,
            Message: "Headquarter marked as deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Update Error", Details: err.message });
    }
});

export {router as HeadquartersRoute}