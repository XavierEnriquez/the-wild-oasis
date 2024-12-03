import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Container from "../ui/container";
import ButtonGroup from "../ui/ButtonGroup";

function Cabins() {
  return (
    <Container size="xl">
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
          <Button>Add new cabin</Button>
        </div>
      </Row>
    </Container>
  );
}

export default Cabins;
