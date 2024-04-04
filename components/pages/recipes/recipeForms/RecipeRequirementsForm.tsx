import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RecipeType } from "../../../../types/RecipeTypes";
import { textStyles } from "../../../../theme/text";
import { Button, HelperText, TextInput } from "react-native-paper";
import Row from "../../../commonComponents/Row";
import Tag from "../../../commonComponents/Tag";
import { Icon } from "react-native-elements";
import RecipeIngredientList from "./RecipeIngredientList";
import StyledButton from "../../../commonComponents/StyledButton";
import colors from "../../../../theme/colors";

interface Props {
  draft: RecipeType;
  setDraft: React.Dispatch<React.SetStateAction<RecipeType | undefined>>;
}

function RecipeRequirementsForm(props: Props) {
  const { draft, setDraft } = props;
  const { equipment, ingredients } = draft;
  const [equipmentValue, setEquipmentValue] = useState<string>("");
  const [ingredientName, setIngredientName] = useState<string>("");
  const [ingredientAmount, setIngredientAmount] = useState<string>("");
  const [ingredientUnit, setIngredientUnit] = useState<string>("");

  const handleRemoveEquipment = (deletedEquipment: string) => {
    const newEquipment = equipment.filter((e) => e !== deletedEquipment);

    setDraft({ ...draft, equipment: newEquipment });
  };

  const handleAddEquipment = () => {
    const equipmentArr = equipmentValue
      .split(/,|\n/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e);

    const newEquipment = [...new Set([...equipment, ...equipmentArr])];
    setDraft({ ...draft, equipment: newEquipment });
    setEquipmentValue("");
  };

  const handleAddIngredient = () => {
    if (!ingredientName || !ingredientAmount || !ingredientUnit) {
      return;
    }

    const newRecipeIngredient = {
      _id: ingredientName,
      amount: parseFloat(ingredientAmount),
      unit: ingredientUnit,
    };

    console.log(newRecipeIngredient);

    setDraft({
      ...draft,
      ingredients: [...ingredients, newRecipeIngredient],
    });

    setIngredientAmount("");
    setIngredientName("");
    setIngredientUnit("");
  };

  const handleDeleteIngredient = (_id: string) => {
    const newIngredients = ingredients.filter((i) => i._id !== _id);

    setDraft({
      ...draft,
      ingredients: newIngredients,
    });
  };

  const ingredientListErrors = [];

  if (ingredientName || ingredientAmount || ingredientUnit) {
    if (!ingredientName) {
      ingredientListErrors.push("Ingredient name is required");
    }

    if (!ingredientAmount) {
      ingredientListErrors.push("Ingredient amount is required");
    }

    if (!ingredientUnit) {
      ingredientListErrors.push("Ingredient unit is required");
    }

    if (ingredients.find((i) => i._id === ingredientName)) {
      ingredientListErrors.push("Ingredient already exists");
    }

    if (isNaN(parseInt(ingredientAmount))) {
      ingredientListErrors.push("Ingredient amount needs to be a number");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View>
          <Text style={(textStyles.h5, styles.sectionHeading)}>Equipment</Text>
          <Row style={[styles.equipmentForm]}>
            <View style={styles.equipmentInput}>
              <TextInput
                value={equipmentValue}
                onChangeText={setEquipmentValue}
                label="Equipment Name"
                placeholder="Frying Pan, Stove, Oven"
                onEndEditing={handleAddEquipment}
                onSubmitEditing={handleAddEquipment}
              />
            </View>
            <Button
              icon="plus"
              onPress={handleAddEquipment}
              disabled={!equipmentValue}
            >
              Add
            </Button>
          </Row>
          <View style={[styles.equipment]}>
            {equipment.map((e) => (
              <Tag
                key={e}
                icon={<Icon name="close" type="material-community" size={16} />}
                iconOnpress={() => handleRemoveEquipment(e)}
              >
                {e}
              </Tag>
            ))}
          </View>
        </View>
        <View>
          <Text style={(textStyles.h5, styles.sectionHeading)}>
            Ingredients
          </Text>
          <View style={styles.ingredientForm}>
            <Row onlyWeb gap={10}>
              <TextInput
                style={styles.ingredientInput}
                value={ingredientName}
                onChangeText={setIngredientName}
                label="Ingredient"
                placeholder="apple"
              />
              <TextInput
                style={[styles.ingredientInput]}
                value={ingredientAmount}
                onChangeText={setIngredientAmount}
                keyboardType="number-pad"
                label="Amount"
                placeholder="1"
              />
              <TextInput
                style={styles.ingredientInput}
                value={ingredientUnit}
                onChangeText={setIngredientUnit}
                label="Unit"
                placeholder="piece"
                onSubmitEditing={handleAddIngredient}
              />
              <Button
                icon="plus"
                onPress={handleAddIngredient}
                disabled={!!ingredientListErrors.length}
              >
                Add
              </Button>
            </Row>
            <HelperText type="error" visible={!!ingredientListErrors.length}>
              {ingredientListErrors.map((e) => e).join(", ")}
            </HelperText>
          </View>
          <RecipeIngredientList
            ingredients={ingredients}
            onDelete={handleDeleteIngredient}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flexGrow: 1,
    maxWidth: 800,
    marginHorizontal: "auto",
  },
  sectionHeading: {
    marginBottom: 24,
  },
  equipment: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  equipmentForm: {
    alignItems: "center",
    columnGap: 10,
    marginBottom: 24,
  },
  equipmentInput: {
    flexGrow: 1,
  },
  ingredientForm: {
    marginBottom: 12,
  },
  ingredientInput: {
    flex: 1,
    width: "100%",
  },
  footer: {
    justifyContent: "space-between",
  },
});

export default RecipeRequirementsForm;
