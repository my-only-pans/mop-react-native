import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextBlock, TextBlockType } from "../../../types/RecipeTypes";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { textStyles } from "../../../theme/text";
import { Icon } from "react-native-elements";
import { Tooltip } from "@rneui/themed";
import EditorBlockOptions from "./EditorBlockOptions";
import colors from "../../../theme/colors";

interface Props {
  node: TextBlock;
  readonly?: boolean;
  isFocused?: boolean;
  onChangeText: (text: string) => any;
  onChangeBlockType: (type: TextBlockType) => any;
  onDelete: () => any;
}

function EditorBlock(props: Props) {
  const {
    node,
    readonly,
    isFocused,
    onChangeText,
    onDelete,
    onChangeBlockType,
  } = props;
  const { type, text } = node;
  const [height, setHeight] = useState(38);
  const [showOptions, setShowOptions] = useState(false);

  const inputRef = useRef<TextInput | null>(null);

  const getStyle = useCallback(() => {
    let style: { [key: string]: any }[] = [{ outlineStyle: "none" }];

    switch (type) {
      case TextBlockType.h1:
        style.push(textStyles.h1);
        break;
      case TextBlockType.h2:
        style.push(textStyles.h2);
        break;
      case TextBlockType.h3:
        style.push(textStyles.h3);
        break;
      case TextBlockType.h4:
        style.push(textStyles.h4);
        break;
      case TextBlockType.h5:
        style.push(textStyles.h5);
        break;
      case TextBlockType.p:
        style.push(textStyles.p);
        break;
      default:
        break;
    }

    return style;
  }, [type]);

  if (readonly) {
    return <Text style={getStyle()}>{text}</Text>;
  }

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={[getStyle(), { height: height }]}
        value={text}
        onChangeText={onChangeText}
        placeholder="Enter text"
        placeholderTextColor="#aaa"
        multiline
        onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
      />
      {!readonly && (
        <View style={styles.options}>
          <Tooltip
            visible={showOptions}
            onOpen={() => setShowOptions(true)}
            onClose={() => setShowOptions(false)}
            containerStyle={styles.tooltipContainer}
            backgroundColor="#ddd"
            popover={
              <EditorBlockOptions
                onDelete={onDelete}
                onClose={() => setShowOptions(false)}
                onChangeType={onChangeBlockType}
                type={type}
              />
            }
          >
            <Icon
              name="ellipsis-vertical"
              type="ionicon"
              color={colors.highlight}
              size={20}
            />
          </Tooltip>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  tooltipContainer: {
    height: "auto",
    alignItems: "stretch",
    width: "auto",
  },
  options: {
    position: "absolute",
    left: -25,
  },
});

export default EditorBlock;
