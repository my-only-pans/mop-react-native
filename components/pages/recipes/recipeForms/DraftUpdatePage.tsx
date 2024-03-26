import React, { ReactNode, useEffect, useState } from "react";
import { Text, View } from "react-native";
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

interface Props {}

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

  console.log(draft);
  console.log("ACTIVE SECTION", section);

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
        content = (
          <RecipeRequirementsForm
            draft={draft}
            setDraft={setDraft}
            onClickNext={() => {
              router.setParams({ section: "requirements" });
            }}
            onClickBack={() => {
              router.setParams({ section: "details" });
            }}
          />
        );
        break;
      case "instructions":
        content = (
          <RecipeRequirementsForm
            draft={draft}
            setDraft={setDraft}
            onClickNext={() => {
              router.setParams({ section: "preview" });
            }}
            onClickBack={() => {
              router.setParams({ section: "requirements" });
            }}
          />
        );
        break;

      default:
        break;
    }
  }

  return <Container>{content}</Container>;
}

export default DraftUpdatePage;
