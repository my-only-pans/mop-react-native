import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import StyledButton from "../StyledButton";
import {
  GetRecipesQueryType,
  SortByFieldType,
  SortOrderType,
} from "../../../types/RecipeTypes";
import colors from "../../../theme/colors";
import Row from "../Row";
import Tag from "../Tag";
import { Icon } from "react-native-elements";
import { Button, TextInput } from "react-native-paper";
import textStyles from "../../../theme/text";
import convertParamsArray from "../../../utils/convertParamsArray";

const sortByFields: { label: string; value: SortByFieldType }[] = [
  { value: "title", label: "Title" },
  { value: "prepTime", label: "Prep Time" },
  { value: "cookTime", label: "Cook Time" },
  // { value: "averageRating", label: "Rating" },
];

const sortOrder = ["ascending", "descending"];

export interface FilterDialogProps {
  initialFilters: GetRecipesQueryType;
  onSubmit: (filters: GetRecipesQueryType | null) => any;
}

function FilterDialog(props: FilterDialogProps) {
  const { initialFilters, onSubmit } = props;
  const [filters, setFilters] = useState<GetRecipesQueryType>(initialFilters);
  const [categoryValue, setCategoryValue] = useState("");

  const handleSelectSortBy = (value: SortByFieldType) => {
    setFilters({ ...filters, sortBy: value });
  };

  const handleSelectSortOrder = (value: SortOrderType) => {
    setFilters({ ...filters, sortOrder: value });
  };

  const handleAddCategories = () => {
    const newCategories = categoryValue
      .split(/,|\n/)
      .map((c) => c.trim().toLowerCase())
      .filter((c) => !!c);

    setFilters({
      ...filters,
      categories: [...(filters?.categories || []), ...newCategories],
    });
    setCategoryValue("");
  };

  const handleRemoveCategory = (value: string) => {
    const newCategories = (
      filters?.categories ? [...filters.categories] : []
    ).filter((c) => c !== value);

    setFilters({ ...filters, categories: newCategories });
  };

  const handleUpdatePrepTime = (value: string) => {
    const numValue = Number(value);

    setFilters({
      ...filters,
      prepTime: !isNaN(numValue) ? numValue : undefined,
    });
  };

  const handleUpdateCookTime = (value: string) => {
    const numValue = Number(value);

    setFilters({
      ...filters,
      cookTime: !isNaN(numValue) ? numValue : undefined,
    });
  };

  const handleSubmit = () => {
    onSubmit(filters);
  };

  const handleClearFilter = () => {
    onSubmit(null);
  };

  return (
    <View style={styles.container}>
      <Text style={textStyles.header}>Filter Recipes</Text>
      <View style={styles.form}>
        <View style={styles.section}>
          <Row gap={12}>
            <Text style={styles.label}>Sort By:</Text>
            <View style={styles.sortByList}>
              {sortByFields.map((f) => (
                <Pressable
                  key={f.value}
                  style={[
                    styles.sortByItem,
                    {
                      backgroundColor:
                        f.value === filters.sortBy ? colors.info : colors.grey,
                    },
                  ]}
                  onPress={() => handleSelectSortBy(f.value)}
                >
                  <Text
                    style={[
                      styles.sorByLabel,
                      {
                        color:
                          f.value === filters.sortBy
                            ? colors.background
                            : "auto",
                      },
                    ]}
                  >
                    {f.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Row>
          <Row gap={12}>
            <Text style={styles.label}>Sort Order:</Text>
            <View style={styles.sortByList}>
              {sortOrder.map((s) => (
                <Pressable
                  key={s}
                  style={[
                    styles.sortByItem,
                    {
                      backgroundColor:
                        s === filters.sortOrder ? colors.info : colors.grey,
                    },
                  ]}
                  onPress={() => handleSelectSortOrder(s as SortOrderType)}
                >
                  <Text
                    style={[
                      styles.sorByLabel,
                      {
                        color:
                          s === filters.sortOrder ? colors.background : "auto",
                      },
                    ]}
                  >
                    {s}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Row>
        </View>
        <View style={styles.section}>
          <View>
            <Row style={{ alignItems: "center", marginBottom: 12 }}>
              <TextInput
                style={{ flex: 1, flexGrow: 1 }}
                label="Categories"
                placeholder="dinner, meal, snack"
                value={categoryValue}
                onChangeText={setCategoryValue}
              />
              <Button icon="plus" onPress={handleAddCategories}>
                Add
              </Button>
            </Row>
            <View style={styles.tagContainer}>
              {filters &&
                (
                  (filters?.categories &&
                    convertParamsArray(filters.categories)) ||
                  []
                ).map((category) => (
                  <Tag
                    key={category}
                    icon={
                      <Icon name="close" type="material-community" size={16} />
                    }
                    iconOnpress={() => handleRemoveCategory(category)}
                  >
                    {category}
                  </Tag>
                ))}
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Row gap={20}>
            <TextInput
              style={styles.inputColumn}
              value={filters.prepTime ? filters.prepTime.toString() : ""}
              onChangeText={handleUpdatePrepTime}
              label="Prep Time (mins)"
              placeholder="15"
            />
            <TextInput
              style={styles.inputColumn}
              value={filters.cookTime ? filters.cookTime.toString() : ""}
              onChangeText={handleUpdateCookTime}
              label="Cook Time (mins)"
              placeholder="30"
            />
          </Row>
        </View>
      </View>
      <StyledButton onPress={handleClearFilter} buttonColor={colors.danger}>
        Clear FIlters
      </StyledButton>
      <StyledButton onPress={handleSubmit}>Submit</StyledButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  form: {
    marginVertical: 24,
  },
  section: {
    borderBottomWidth: 1,
    borderColor: colors.grey,
    padding: 24,
    gap: 24,
  },
  label: {
    fontWeight: "bold",
  },
  sortByList: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  sortByItem: {
    padding: 8,
    backgroundColor: colors.grey,
    borderRadius: 5,
  },
  sorByLabel: {
    fontSize: 12,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputColumn: {
    flex: 1,
  },
});

export default FilterDialog;
