import { Link } from "react-router-dom";

const AdminHomePage = () => {
	return (
		<>
			<h1>Admin</h1>
			<p>
				<br /> <br /> <br />
				<Link to={"/admin/programme"}>Programme</Link>
			</p>
		</>
	);
};

export default AdminHomePage;
