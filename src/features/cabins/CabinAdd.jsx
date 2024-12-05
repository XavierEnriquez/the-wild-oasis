import { useState } from "react";
import Button from "../../ui/Button";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
import Modal from "../../ui/Modal";

function CabinAdd() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <div>
        <Button onClick={() => setIsOpenModal((show) => !show)}>
          Add new cabin
        </Button>
      </div>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateUpdateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default CabinAdd;
