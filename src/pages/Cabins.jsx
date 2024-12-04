import { useState } from "react";

import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Container from "../ui/container";
import ButtonGroup from "../ui/ButtonGroup";
import CreateEditCabinForm from "../features/cabins/CreateEditCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <Container size="large">
      <Row>
        <Row type="horizontal">
          <Heading as="h1">All cabins</Heading>
          <ButtonGroup>
            <Button size="medium" variation="secondary">
              Filter
            </Button>
            <Button size="medium" variation="secondary">
              Filter
            </Button>
          </ButtonGroup>
        </Row>
        <CabinTable />
        <div>
          <Button onClick={() => setShowForm((show) => !show)}>
            Add new cabin
          </Button>
        </div>
        {showForm && <CreateEditCabinForm />}
      </Row>
    </Container>
  );
}

export default Cabins;
