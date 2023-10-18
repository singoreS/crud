import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	createProgramme,
	getProgrammeById,
	updateProgramme,
} from "../../Services/api.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProgramme } from "../../Services/api.js";

const AdminProgrammeForm = () => {
	// récupérer l'identifiant de l'étudiant à modifier
	const { id } = useParams();

	const {
		formState: { errors },
		handleSubmit,
		register,
		watch,
		reset,
	} = useForm();

	// importer le hook de redirection
	const navigate = useNavigate();

	// récupérer les classes
	const [programme, setProgramme] = useState([]);

	useEffect(() => {
		const allPromises = Promise.allSettled([getProgramme()]);

		allPromises.then((results) => {
			setProgramme(results[0].value.data);
		});

		// préremplir le formulaire avec un programme existant
		prefillForm();
	}, );

	// préremplir le formulaire avec un programme existant
	const prefillForm = async () => {
		if (id) {
			// console.log(id);
			const responseAPI = await getProgrammeById(id);
			const programme = responseAPI.data;
			// console.log(student);
			reset({
				id: programme.id,
				datestart: programme.datestart,
				datefinish: programme.datefinish,
				firstname: programme.firstname,
				list_activiter:programme.list_activiter,
				activiter_id: programme.activiter_id,
			});
		}
	};

	// soumission du formulaire
	const onSubmit = async (values) => {
		// appel de la route d'API
		const responseAPI = id
			? await updateProgramme(values)
			: await createProgramme(values);

		if (responseAPI.status === 200) {
			window.sessionStorage.setItem(
				"notice",
				id ? "Programme updated" : "Programme created",
			);
		} else {
			window.sessionStorage.setItem("notice", "Error");
		}
		navigate("/admin/programme");
	};

	// observateur de la saisie
	useEffect(() => {
		const observer = watch((values) => console.log(values));
		// const observer = watch((values) => null);

		return () => observer.unsubscribe();
	}, [watch]);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<p>
					<label>Datestart : </label>
					{/* utiliser les noms des colonnes sql pour le nom des champs */}
					<input
						type="text"
						{...register("datestart", { required: "Datestart is required" })}
					/>
					{/* errors.<nom du champ défini dans register>.message */}
					<small>{errors.datestart?.message}</small>
				</p>
				<p>
					<label>Datefinish : </label>
					<input
						type="text"
						{...register("datefinish", { required: "Datefinish is required" })}
					/>
					<small>{errors.datefinish?.message}</small>
				</p>
				<p>
					<label>Firstname : </label>
					<input
						type="text"
						{...register("firstname", { required: "Firstname is required" })}
					/>
					<small>{errors.firstname?.message}</small>
				</p>
				<p>
					<label>list_activiter : </label>
					<input
						type="text"
						{...register("list_activiter", { required: "List_activiter is required" })}
					/>
					<small>{errors.list_activiter?.message}</small>
				</p>
				<p>
					<select
						{...register("activiter_id", { required: "activiter is required" })}
						value={watch().activiter_id}
					>
						<option value=""></option>
						{programme.map((el) => (
							<option key={crypto.randomUUID()} value={el.id}>
								{el.name}
							</option>
						))}
					</select>
					<small>{errors.programme_id?.message}</small>
				</p>
				<p>
					<input type="hidden" {...register("id")} />
					<input type="submit" />
				</p>
			</form>
			<p>
				<Link to={"/admin/programme"}>Back</Link>
			</p>
		</>
	);
};

export default AdminProgrammeForm;
