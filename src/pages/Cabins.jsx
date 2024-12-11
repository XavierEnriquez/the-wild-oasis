import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Container from "../ui/Container";
import CabinAdd from "../features/cabins/CabinAdd";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <Container size="large">
      <Row>
        <Row type="horizontal">
          <Heading as="h1">All cabins</Heading>
          <CabinTableOperations />
        </Row>
        <CabinTable />
        <CabinAdd />
      </Row>
    </Container>
  );
}

export default Cabins;
