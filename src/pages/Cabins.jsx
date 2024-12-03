import CabinTable from "../features/cabins/CabinTable";
import { ContainerXl } from "../styles/containers";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  return (
    <ContainerXl>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <div>Filter / Sort</div>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </ContainerXl>
  );
}

export default Cabins;
