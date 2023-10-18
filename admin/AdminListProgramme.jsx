import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteProgramme, getProgramme } from "../../Services/api";


const AdminListProgramme = () => {
  // état pour rafraîchir le composant après la suppression d'un élève
  const [forceUpdate, setForceUpdate] = useState(false);

  // état pour stocker les données de l'API
  const [programme, setProgramme] = useState([]);

  // état pour stocker la notification contenue dans la sessionStorage
  const [message, setMessage] = useState();

  // exécuter la requête HTTP au premier affichage du composant
  useEffect(() => {
    // récupérer les étudiants à partir de l'API
    getProgramme().then((values) => setProgramme(values.data));
  }, [forceUpdate]);

  // récupérer la notification du sessionStorage
  useEffect(() => {
    // si un message existe en session
    if (window.sessionStorage.getItem("notice")) {
      // stocker le message dans l'état
      setMessage(window.sessionStorage.getItem("notice"));

      // supprimer le massage en session
      window.sessionStorage.removeItem("notice");

      // faire disparaître le message après un délai en millisecondes
      setTimeout(() => setMessage(null), 5000);
    }
  },[]);

  // supprimer un élève
  const handleClick = async (id) => {
    // console.log(id);
    const responseAPI = await deleteProgramme(id);

    if (responseAPI.status === 200) {
      window.sessionStorage.setItem("notice", "Student deleted");
    } else {
      window.sessionStorage.setItem("notice", "Error");
    }

    setForceUpdate(!forceUpdate);
  };

  return (
    <>
      <p>{message}</p>
      <p>
        <Link to={"/admin/programme/form"}>Add</Link>
      </p>
      <table>
        <thead>
          <tr>
            <td>Programme semaine 1</td>
            <td>Date de début</td>
            <td>Date de fin</td>
            <td>list_activiter</td>
          </tr>
        </thead>
        <tbody>
          {programme.map((value) => (
            <tr key={crypto.randomUUID()}>
              <td>`${value.datestart}`</td>
              <td>`${value.datefinish}`</td>
              <td>`${value.firstname}`</td>
              <td>`${value.list_activiter}`</td>

              <td>
                <Link to={`/admin/programme/${value.id}/form`}>Edit</Link>
                <Link onClick={() => handleClick(value.id)}> Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminListProgramme;
