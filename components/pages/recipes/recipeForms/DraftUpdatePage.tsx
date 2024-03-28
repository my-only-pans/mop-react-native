import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { textStyles } from "../../../../theme/text";
import { useLocalSearchParams, useRouter } from "expo-router";
import Container from "../../../commonComponents/Container";
import axios from "axios";
import getServerUrl from "../../../../utils/getServerUrl";
import getAuthToken from "../../../../utils/getAuthToken";
import RecipeDetailsForm from "./RecipeDetailsForm";
import { RecipeInstructions, RecipeType } from "../../../../types/RecipeTypes";
import RecipeRequirementsForm from "./RecipeRequirementsForm";
import RecipeInstructionsForm from "./RecipeInstructionsForm";
import Row from "../../../commonComponents/Row";
import StyledButton from "../../../commonComponents/StyledButton";
import colors from "../../../../theme/colors";
import RecipeDraftPreview from "./RecipeDraftPreview";
import { Icon } from "react-native-elements";

interface Props {}

const sections = ["details", "requirements", "instructions", "preview"];

function DraftUpdatePage(props: Props) {
  const {} = props;
  const { draftId, section } = useLocalSearchParams();
  const router = useRouter();

  const [draft, setDraft] = useState<RecipeType>();

  const fetchDraft = async () => {
    const res = await axios.get(getServerUrl() + "/recipe/draft", {
      params: { draftId },
      headers: { Authorization: await getAuthToken() },
    });

    setDraft(res.data);
  };

  useEffect(() => {
    fetchDraft();
  }, [draftId]);

  let content: ReactNode = null;

  const handleChangeSection = (d: "prev" | "next") => {
    let index = sections.findIndex((s) => s === section);

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

  if (draft) {
    switch (section) {
      case "details":
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
          <Row
            style={{ justifyContent: "space-between", marginBottom: 48 }}
            onlyWeb
          >
            <Text style={textStyles.header}>{draft?.title} (Draft)</Text>
          </Row>
          <View style={styles.content}>{content}</View>
          <Row gap={10} style={styles.footer}>
            <Pressable
              style={styles.footerArrows}
              onPress={() => handleChangeSection("prev")}
              disabled={section === sections[0]}
            >
              <Icon
                size={32}
                name="chevron-left"
                color={section === sections[0] ? colors.grey : "#000"}
              />
            </Pressable>
            <Row
              gap={20}
              rowGap={10}
              style={{ flexWrap: "wrap", flex: 1, justifyContent: "center" }}
            >
              <StyledButton style={styles.footerAction}>Save</StyledButton>
              <StyledButton
                style={styles.footerAction}
                buttonColor={colors.paragraph}
                textColor="#fff"
                disabled={isPublishDisabled}
              >
                Publish
              </StyledButton>
            </Row>

            <Pressable
              style={styles.footerArrows}
              onPress={() => handleChangeSection("next")}
              disabled={section === sections[sections.length - 1]}
            >
              <Icon
                size={32}
                name="chevron-right"
                color={
                  section === sections[sections.length - 1]
                    ? colors.grey
                    : "#000"
                }
              />
            </Pressable>
          </Row>
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 24,
    marginBottom: 24,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  footer: {
    justifyContent: "space-between",
  },
  footerAction: {
    // flexGrow: 1,
    flexShrink: 0,
  },
  footerArrows: {
    flexShrink: 0,
  },
});

export default DraftUpdatePage;
