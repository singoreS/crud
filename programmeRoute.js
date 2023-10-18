import express from "express";
import dbConnection from "../service/dbConnection.js";

const programmeRouter = express.Router();

programmeRouter.get("/", async (req, res) => {
  // requete SQL a éxécuter
  const query = `
    SELECT 
    programme.*, activiter.*
    FROM 
    Intergen.programme
    JOIN 
    Intergen.activiter
    JOIN 
    Intergen.programme_activiter
    ON 
    programme_activiter.programme_id = programme.id
    AND 
    programme_activiter.activiter_id = activiter.id
    ;`;

  try {
    const [results] = await dbConnection.execute(query, req.body);

    return res.status(200).json({
      status: 200,
      message: "OK",
      data: results,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error",
    });
  }
});

programmeRouter.get("/:id", async (req, res) => {
	// récupérer la variable id de la route
	const { id } = req.params;
	// console.log(req.params);

	// requête
	const query = `
		SELECT programme.*
		FROM Intergen.programme
		WHERE programme.id = :id;
	`;

	/*
		la valeur de la variable id de la requête SQL est définie dans un objet JS dont les propriétés reprennent les noms des variables SQL
			variable SQL :id > { id: ... }
			variable SQL :name et :id > { name: ..., id: ... }
	*/

	try {
		// const [results] = await dbConnection.execute(query, { id: 1 });
		const [results] = await dbConnection.execute(query, req.params);
		return res.status(200).json({
			status: 200,
			message: "OK",
			// shift : récupérer le premier indice d'un array
			data: results.shift(),
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}
});


// créer un programme
programmeRouter.post("/create", async (req, res) => {
	// requête
	const query = `
		INSERT INTO Intergen.programme
		VALUE (NULL, :datestart, :datefinish, :firstname, :association_id);
	`;

	/*
		la valeur de la variable id de la requête SQL est définie dans un objet JS dont les propriétés reprennent les noms des variables SQL
			variable SQL :id > { id: ... }
			variable SQL :name et :id > { name: ..., id: ... }
	*/

	try {
		const [results] = await dbConnection.execute(query, req.body);
		return res.status(200).json({
			status: 200,
			message: "OK",
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}
});

programmeRouter.put("/update", async (req, res) => {
	// requête
	const query = `
		UPDATE Intergen.programme
		SET
			programme.datestart = :datestart,
			programme.datefinish = :datefinish,
			programme.firstname = :firstname,
			programme.association_id = :association_id
		WHERE programme.id = :id;
	`;

	/*
		la valeur de la variable id de la requête SQL est définie dans un objet JS dont les propriétés reprennent les noms des variables SQL
			variable SQL :id > { id: ... }
			variable SQL :name et :id > { name: ..., id: ... }
	*/

	try {
		const [results] = await dbConnection.execute(query, req.body);
		return res.status(200).json({
			status: 200,
			message: "OK",
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}
});


programmeRouter.delete("/delete", async (req, res) => {
	// requête
	const query = `
		DELETE FROM Intergen.programme
		WHERE programme.id = :id;
	`;

	/*
		la valeur de la variable id de la requête SQL est définie dans un objet JS dont les propriétés reprennent les noms des variables SQL
			variable SQL :id > { id: ... }
			variable SQL :name et :id > { name: ..., id: ... }
	*/

	try {
		const [results] = await dbConnection.execute(query, req.body);
		return res.status(200).json({
			status: 200,
			message: "OK",
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}
});

export default programmeRouter;
