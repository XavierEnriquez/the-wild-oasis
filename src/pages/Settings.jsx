import Heading from "../ui/Heading";
import Container from "../ui/Container";
import Row from "../ui/Row";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <Container>
      <Row>
        <Heading as="h1">Update hotel settings</Heading>
        <UpdateSettingsForm />
      </Row>
    </Container>
  );
}

export default Settings;
