import pool from "../db/db.js";
import bcrypt from "bcrypt";

export async function getAllBoards(req, res, next) {
  try {
    const getData = await pool.query("SELECT * FROM boards");
    res.status(200).send({
      status: "Success",
      data: getData.rows,
    });
  } catch (error) {
    next(error);
  }
}

export async function searchBoards(req, res, next) {
  try {
    const { q } = req.query;
    const searchData = await pool.query(
      "SELECT * FROM users WHERE title ILIKE '%$1%'",
      [q]
    );
    res.status(200).send({
      status: "Success",
      data: searchData.rows,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBoardsById(req, res, next) {
  try {
    const id = req.params.id;
    const data = await pool.query("SELECT * FROM boards WHERE id=$1", [id]);
    res.status(200).send({
      status: "Success",
      data: data.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBoards(req, res, next) {
  try {
    const id = req.params.id;
    const { title, columns} = req.body;

    const data = await pool.query("SELECT * FROM boards WHERE id=$1", [id]);
    if (!data.rows.length) {
      return res.status(404).send("Board was not found!");
    }
    let oldUser = data.rows[0];

    const editData = await pool.query(
      "UPDATE boards SET title=$1, columns=$2 RETURNING id",
      [
        title || oldUser.title,
        columns || oldUser.columns,
        id
      ]
    );

    if (editData.rows.length !== 1)
      return res.status(500).send("Some error on server!");

    res.status(200).send({
      message: "Updated",
      data: editData.rows[0].id,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeBoards(req, res, next) {
  try {
    const id = req.params.id;
    const oldData = await pool.query("SELECT * FROM boards WHERE id=$1", [id]);

    if (!oldData.rows.length) {
      return res.status(404).send("Board was not found!");
    }

    const data = await pool.query(
      "DELETE FROM boards WHERE id=$1 RETURNING id",
      [id]
    );

    res.status(200).send({
      status: "Deleted",
      user_id: data.rows[0].id,
    });
  } catch (error) {
    next(error);
  }
}
