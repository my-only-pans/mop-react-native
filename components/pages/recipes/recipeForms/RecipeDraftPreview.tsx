import React from "react";
import { RecipeType } from "../../../../types/RecipeTypes";
import RecipeView from "../../../commonComponents/recipe/RecipeView";

interface Props {
  draft: RecipeType;
}

function RecipeDraftPreview(props: Props) {
  const { draft } = props;

  return <RecipeView recipe={draft} isDraft />;
}

export default RecipeDraftPreview;
