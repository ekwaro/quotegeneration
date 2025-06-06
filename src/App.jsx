import { Button, Container, Flex } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <Container >
      <Flex justify='center' align='center' mt='50px'>
        {/**The line below just displays a link to the dashboard */}
        <Button
          onClick={() => navigate("/dashboard")}
          variant="gradient"
          rightSection={<IconArrowRight />}
        >
          DashBoard
        </Button>
      </Flex>
    </Container>
  );
}

export default App;
