import pool from "../db/db.js";

export async function getAllTasks(req, res, next) {
  try {
    console.log(req.params);

    const boardId = req.params.boardId;

    const getData = await pool.query("SELECT * FROM tasks where boardId = $1", [
      boardId,
    ]);

    res.status(200).send({
      status: "Success",
      data: getData.rows,
    });
  } catch (error) {
    next(error);
  }
}

export async function createTask(req, res, next) {
  try {
    const data = req.body;
    const boardId = req.params.boardId;
    const { title, order, description, userId, columnId } = req.body;
    if (!title || !order || !description || !userId || !columnId) {
      return res.status(400).send("Enter all informations");
    }

    const wdate = await pool.query(
      `INSERT INTO
    tasks (title, orderss, description, userId, boardId, columnId)
VALUES
    ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [title, order, description, userId, boardId, columnId]
    );

    res.status(200).send({
      status: "created",
      id: wdate.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

export async function getTasksById(req, res, next) {
  try {
    const id = req.params.id;

    const boardId = req.params.boardId;

    const data = await pool.query(
      "SELECT * FROM tasks WHERE id=$1 and boardid = $2",
      [id, boardId]
    );

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
    const boardD = req.params.boardId;
    const data = await pool.query(
      "SELECT * FROM tasks WHERE id=$1 and boardId = $2",
      [id, boardD]
    );
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
        columnId || oldUser.columnId,
        id,
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
    const boardId = req.params.boardId;
    const oldData = await pool.query(
      "SELECT * FROM tasks WHERE id=$1 and boardId = $2",
      [id, boardId]
    );

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
