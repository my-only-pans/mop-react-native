import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Dialog, Modal, Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome6";
import colors from "../../theme/colors";
import { GetRecipesQueryType } from "../../types/RecipeTypes";
import Row from "./Row";
import { useUiSore } from "../../stores/uiStore";

interface Props {
  initialValues: GetRecipesQueryType;
  onApplyFilter?: (filters?: GetRecipesQueryType | null) => any;
  showFilterBtn?: boolean;
}

function RecipeSearchBar(props: Props) {
  const { showDialog, closeDialog } = useUiSore();
  const {
    onApplyFilter = () => {},
    initialValues,
    showFilterBtn = false,
  } = props;
  const [filters, setFilters] = useState<GetRecipesQueryType>(initialValues);

  const handleUpdateFilters = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleFilterDialogSubmit = (
    newFilters: GetRecipesQueryType | null | undefined
  ) => {
    let updatedFilters;
    if (!newFilters) {
      newFilters = null;
      setFilters({});
    } else {
      updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
    }
    onApplyFilter(updatedFilters);
    closeDialog();
  };

  const handleOpenFilters = () => {
    showDialog({
      content: "filterDialog",
      context: {
        initialFilters: filters,
        onSubmit: handleFilterDialogSubmit,
      },
    });
  };

  const handleClearSearchbar = () => {
    handleUpdateFilters("searchString", "");
  };

  const handleSubmitSearch = () => {
    if (!filters.searchString) {
      onApplyFilter(null);
    } else {
      onApplyFilter(filters);
    }
  };

  return (
    <>
      <Row gap={10} style={styles.container}>
        <Searchbar
          value={filters.searchString || ""}
          onChangeText={(v) => handleUpdateFilters("searchString", v)}
          style={styles.searchbar}
          onIconPress={handleSubmitSearch}
          onSubmitEditing={handleSubmitSearch}
          onClearIconPress={handleClearSearchbar}
        />
        {showFilterBtn && (
          <Icon.Button
            name="sliders"
            size={24}
            backgroundColor="transparent"
            color="#000"
            underlayColor={colors.highlight}
            onPress={handleOpenFilters}
            iconStyle={{ marginRight: 0 }}
          />
        )}
      </Row>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  searchbar: {
    flex: 1,
    maxWidth: 400,
    flexGrow: 1,
  },
});

export default RecipeSearchBar;
