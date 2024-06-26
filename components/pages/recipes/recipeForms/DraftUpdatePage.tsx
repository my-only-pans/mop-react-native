import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { textStyles } from "../../../../theme/text";
import { useLocalSearchParams, useRouter } from "expo-router";
import Container from "../../../commonComponents/Container";
import axios from "axios";
import getServerUrl from "../../../../utils/getServerUrl";
import getAuthToken from "../../../../utils/getAuthToken";
import RecipeDetailsForm from "./RecipeDetailsForm";
import { RecipeType } from "../../../../types/RecipeTypes";
import RecipeRequirementsForm from "./RecipeRequirementsForm";
import RecipeInstructionsForm from "./RecipeInstructionsForm";
import Row from "../../../commonComponents/Row";
import StyledButton from "../../../commonComponents/StyledButton";
import colors from "../../../../theme/colors";
import RecipeDraftPreview from "./RecipeDraftPreview";
import { Icon } from "react-native-elements";
import getErrorMessage from "../../../../utils/getErrorMessage";
import { Snackbar } from "react-native-paper";

interface Props {}

const sections = ["details", "requirements", "instructions", "preview"];

function DraftUpdatePage(props: Props) {
  const {} = props;
  const { draftId, section = "details" } = useLocalSearchParams();
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState<string | null>();

  const [draft, setDraft] = useState<RecipeType>();

  const fetchDraft = async () => {
    axios
      .get(getServerUrl() + `/recipe/draft/${draftId}`, {
        headers: { Authorization: await getAuthToken() },
      })
      .then(({ data }) => {
        setDraft(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDraft();
  }, [draftId]);

  let content: ReactNode = null;

  const handleChangeSection = (d: "prev" | "next") => {
    let index = !section ? 0 : sections.findIndex((s) => s === section);

    if (d === "prev") {
      if (index !== 0) {
        index--;
      }
    } else {
      if (index !== sections.length - 1) {
        index++;
      }
    }

    router.setParams({ section: sections[index] });
  };

  const handleSave = async () => {
    console.log(draft);
    axios
      .put(getServerUrl() + "/recipe/draft", draft, {
        headers: { Authorization: await getAuthToken() },
      })
      .then((res) => {
        console.log(res);
        // TODO display success
        setServerMessage("Recipe successfuly saved");
      })
      .catch((error) => console.log(getErrorMessage(error)));
  };

  const handlePublish = async () => {
    handleSave()
      .then(async () => {
        axios
          .post(getServerUrl() + "/recipe/", draft, {
            headers: { Authorization: await getAuthToken() },
          })
          .then((res) => {
            router.push(`/recipes/${res.data._id}`);
          })
          .catch((error) => console.log(getErrorMessage(error)));
      })
      .catch((error) => console.log(getErrorMessage(error)));
  };

  if (draft) {
    switch (section) {
      case "requirements":
        content = <RecipeRequirementsForm draft={draft} setDraft={setDraft} />;
        break;
      case "instructions":
        content = <RecipeInstructionsForm draft={draft} setDraft={setDraft} />;
        break;
      case "preview":
        content = <RecipeDraftPreview draft={draft} />;
        break;
      default:
        content = (
          <RecipeDetailsForm
            draft={draft}
            setDraft={setDraft}
            onClickNext={() => {
              router.setParams({ section: "requirements" });
            }}
          />
        );
        break;
    }
  }

  const isPublishDisabled =
    !draft?.equipment.length ||
    !draft.ingredients.length ||
    !draft.instructions?.find((b) => b.text);

  return (
    <Container>
      {content && (
        <>
          <View style={styles.header}>
            <Row
              gap={20}
              rowGap={10}
              style={{ flexWrap: "wrap", flex: 1, justifyContent: "flex-end" }}
            >
              <StyledButton style={styles.footerAction} onPress={handleSave}>
                Save Draft
              </StyledButton>
              <StyledButton
                style={styles.footerAction}
                buttonColor={colors.paragraph}
                textColor="#fff"
                disabled={isPublishDisabled}
                onPress={handlePublish}
              >
                Publish
              </StyledButton>
            </Row>
          </View>

          {section !== "preview" && (
            <Row gap={10} style={{ alignItems: "center", marginBottom: 48 }}>
              <Text style={[textStyles.header]}>{draft?.title}</Text>
              <Text style={styles.section}>
                {(section as string).toUpperCase()}
              </Text>
            </Row>
          )}
          <View style={styles.content}>{content}</View>
          <Row style={styles.navigation}>
            <View>
              {section !== sections[0] && (
                <StyledButton
                  style={styles.footerArrows}
                  onPress={() => handleChangeSection("prev")}
                  disabled={!section || section === sections[0]}
                  buttonColor={colors.grey}
                >
                  Previous
                </StyledButton>
              )}
            </View>
            <View>
              {section !== sections[sections.length - 1] && (
                <StyledButton
                  style={styles.footerArrows}
                  onPress={() => handleChangeSection("next")}
                  disabled={section === sections[sections.length - 1]}
                  buttonColor={colors.highlight}
                >
                  Next
                </StyledButton>
              )}
            </View>
          </Row>
        </>
      )}
      <Snackbar
        visible={!!serverMessage}
        onDismiss={() => setServerMessage(null)}
        action={{
          label: "Close",
          onPress: () => {
            setServerMessage(null);
          },
        }}
      >
        {serverMessage}
      </Snackbar>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 64,
    marginBottom: 24,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  header: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    paddingBottom: 24,
    marginBottom: 24,
  },
  section: {
    color: colors.info,
  },
  navigation: {
    justifyContent: "space-between",
  },
  footer: {
    justifyContent: "flex-end",
  },
  footerAction: {
    flexShrink: 0,
  },
  footerArrows: {
    flexShrink: 0,
  },
});

export default DraftUpdatePage;
