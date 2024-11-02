import pool from "../db/db.js";
import bcrypt from "bcrypt";

export async function getAllTasks(req, res, next) {
  try {
    const getData = await pool.query("SELECT * FROM tasks");
    res.status(200).send({
      status: "Success",
      data: getData.rows,
    });
  } catch (error) {
    next(error);
  }
}

export async function searchTasks(req, res, next) {
  try {
    const { q } = req.query;
    const searchData = await pool.query(
      "SELECT * FROM tasks WHERE title ILIKE '%$1%'",
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

export async function getTasksById(req, res, next) {
  try {
    const id = req.params.id;
    const data = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);
    res.status(200).send({
      status: "Success",
      data: data.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTasks(req, res, next) {
  try {
    const id = req.params.id;
    const { title, order, description, userId, boardId, columnId } = req.body;

    const data = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);
    if (!data.rows.length) {
      return res.status(404).send("Task was not found!");
    }
    let oldUser = data.rows[0];

    const editData = await pool.query(
      "UPDATE boards SET title=$1, order=$2, description=$3, userId=$4, boardId=$5, columnId=$6 WHERE id=$7 RETURNING id",
      [
        title || oldUser.title,
        order || oldUser.order,
        description || oldUser.description,
        userId || oldUser.userId,
        boardId || oldUser.boardId,
        columnId|| oldUser.columnId,
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

export async function removeTasks(req, res, next) {
  try {
    const id = req.params.id;
    const oldData = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);

    if (!oldData.rows.length) {
      return res.status(404).send("Task was not found!");
    }

    const data = await pool.query(
      "DELETE FROM tasks WHERE id=$1 RETURNING id",
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
