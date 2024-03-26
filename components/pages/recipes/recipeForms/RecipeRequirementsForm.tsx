import React from "react";
import { Text, View } from "react-native";
import { RecipeType } from "../../../../types/RecipeTypes";
import { textStyles } from "../../../../theme/text";

interface Props {
  draft: RecipeType;
  setDraft?: React.Dispatch<React.SetStateAction<RecipeType | undefined>>;
  onClickNext: (section: string) => void;
  onClickBack: (section: string) => void;
}

function RecipeRequirementsForm(props: Props) {
  const { draft } = props;

  return (
    <View>
      <Text style={[textStyles.header]}>Recipe Requirements</Text>
      <Text style={[textStyles.subHeader]}>{draft.title}</Text>
    </View>
  );
}

export default RecipeRequirementsForm;
