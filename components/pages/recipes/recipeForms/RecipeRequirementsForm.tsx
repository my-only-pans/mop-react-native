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
      .map((c) => c.trim().toLowerCase());

    const newEquipment = [...new Set([...equipment, ...equipmentArr])];
    setDraft({ ...draft, equipment: newEquipment });
    setEquipmentValue("");
  };

  const handleAddIngredient = () => {
    const newRecipeIngredient = {
      _id: ingredientName,
      amount: parseInt(ingredientAmount),
      unit: ingredientUnit,
    };

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

  const existingIngredient = !!ingredients.find(
    (i) => i._id === ingredientName
  );

  let addIngredientDisabled = true;
  const ingredientsFieldsComplete =
    ingredientAmount &&
    ingredientName &&
    ingredientUnit &&
    !isNaN(parseInt(ingredientAmount));

  if (ingredientsFieldsComplete && !existingIngredient) {
    addIngredientDisabled = false;
  }

  return (
    <View style={styles.container}>
      {/* <Row>
        <Text style={[textStyles.subHeader]}>Recipe Requirements</Text>
      </Row> */}
      <View style={styles.main}>
        <View style={[styles.column, { marginBottom: 48 }]}>
          <Text style={(textStyles.h5, styles.sectionHeading)}>Equipment</Text>
          <Row style={[styles.equipmentForm]}>
            <View style={styles.equipmentInput}>
              <TextInput
                value={equipmentValue}
                onChangeText={setEquipmentValue}
                label="Equipment Name"
                placeholder="Frying Pan, Stove, Oven"
                onEndEditing={handleAddEquipment}
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
        <View style={[styles.column]}>
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
              />
              <Button
                icon="plus"
                onPress={handleAddIngredient}
                disabled={addIngredientDisabled}
              >
                Add
              </Button>
            </Row>
            <HelperText
              type="error"
              visible={existingIngredient || !ingredientsFieldsComplete}
            >
              {!ingredientsFieldsComplete
                ? "Ingredient fields are required"
                : "* Ingredient already exists"}
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
    // flexGrow: 1,
  },
  column: {
    flex: 1,
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