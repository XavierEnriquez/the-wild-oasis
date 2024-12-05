import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Container from "../ui/Container";
import CabinAdd from "../features/cabins/CabinAdd";

function Cabins() {
  return (
    <Container size="large">
      <Row>
        <Row type="horizontal">
          <Heading as="h1">All cabins</Heading>
          <div>
            <Button size="medium" variation="secondary">
              Filter
            </Button>
            <Button size="medium" variation="secondary">
              Sort
            </Button>
          </div>
        </Row>
        <CabinTable />
        <CabinAdd />
      </Row>
    </Container>
  );
}

export default Cabins;
