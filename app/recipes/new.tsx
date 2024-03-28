import React from "react";
import RecipeDetailsForm from "../../components/pages/recipes/recipeForms/RecipeDetailsForm";
import Container from "../../components/commonComponents/Container";

interface Props {}

function New(props: Props) {
  const {} = props;

  return (
    <Container style={{ flex: 1, justifyContent: "space-between" }}>
      <RecipeDetailsForm />
    </Container>
  );
}

export default New;
