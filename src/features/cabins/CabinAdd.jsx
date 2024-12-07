import Button from "../../ui/Button";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
import Modal from "../../ui/Modal";

// V-2 CabinAdd as a Compound component
// Multiple windows can be open by referencing them by name
function CabinAdd() {
  return (
    <div>
      <Modal>
        <Modal.Open windowName="cabinadd-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabinadd-form">
          <CreateUpdateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default CabinAdd;

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
