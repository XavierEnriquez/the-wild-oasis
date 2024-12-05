import Button from "../../ui/Button";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
import Modal from "../../ui/Modal";

// V-1 CabinAdd component
// function CabinAdd() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <div>
//         <Button onClick={() => setIsOpenModal((show) => !show)}>
//           Add new cabin
//         </Button>
//       </div>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateUpdateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

// V-2 CabinAdd as a Compound component
// Multiple windows can be open by naming them each one differently and referencing them by name
function CabinAdd() {
  return (
    <Modal>
      <Modal.Open windowName="cabinadd-form">
        <div>
          <Button>Add new cabin</Button>
        </div>
      </Modal.Open>
      <Modal.Window name="cabinadd-form">
        <CreateUpdateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default CabinAdd;
