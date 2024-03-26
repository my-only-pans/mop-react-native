import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RecipeType } from "../../../../types/RecipeTypes";
import { textStyles } from "../../../../theme/text";
import { Button, HelperText, TextInput } from "react-native-paper";
import Row from "../../../commonComponents/Row";
import Tag from "../../../commonComponents/Tag";
import { Icon } from "react-native-elements";
import RecipeIngredientList from "./RecipeIngredientList";

interface Props {
  draft: RecipeType;
  setDraft: React.Dispatch<React.SetStateAction<RecipeType | undefined>>;
  onClickNext: (section: string) => void;
  onClickBack: (section: string) => void;
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
    <View>
      <Row>
        <Text style={[textStyles.subHeader]}>Recipe Requirements</Text>
      </Row>
      <View>
        <Row onlyWeb style={{ gap: 20 }}>
          <View style={styles.column}>
            <Text style={(textStyles.h5, styles.sectionHeading)}>
              Equipment
            </Text>
            <Row style={[styles.equipmentForm]}>
              <View style={styles.equipmentInput}>
                <TextInput
                  value={equipmentValue}
                  onChangeText={setEquipmentValue}
                  label="Equipment Name"
                  placeholder="Frying Pan, Stove, Oven"
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
            <HelperText type="error" visible={!equipmentValue}>
              * Equipment name is required
            </HelperText>
            <View style={[styles.equipment]}>
              {equipment.map((e) => (
                <Tag
                  key={e}
                  icon={
                    <Icon name="close" type="material-community" size={16} />
                  }
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
            <Row style={styles.ingredientForm}>
              <View>
                <TextInput
                  style={styles.ingredientInput}
                  value={ingredientName}
                  onChangeText={setIngredientName}
                  label="Ingredient"
                  placeholder="apple"
                />
              </View>
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
            <RecipeIngredientList
              ingredients={ingredients}
              onDelete={handleDeleteIngredient}
            />
          </View>
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  equipmentInput: {
    flexGrow: 1,
  },
  ingredientForm: {
    gap: 10,
    alignItems: "center",
  },
  ingredientInput: {
    flex: 1,
  },
});

export default RecipeRequirementsForm;
