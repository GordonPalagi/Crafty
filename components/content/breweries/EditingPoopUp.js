import "./editingPopup.css";
import Model from "../../layout/Model";
const EditingPopup = (props) => {
  return (
    <Model onClose={props.onClose}>
      <section className="editingpopup">{props.componentToShowForEdit}</section>
    </Model>
  );
};
export default EditingPopup;
