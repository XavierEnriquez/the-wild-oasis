import { useState } from "react";

import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Container from "../ui/Container";
import ButtonGroup from "../ui/ButtonGroup";
import CreateUpdateCabinForm from "../features/cabins/CreateUpdateCabinForm";

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
        {showForm && <CreateUpdateCabinForm />}
      </Row>
    </Container>
  );
}

export default Cabins;
