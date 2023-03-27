import { useMemo } from "react";
import { FlatList, View } from "react-native";
import { Chip } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setSelectedTags } from "@store";
import { defaultAppPaddingSize } from "@theme";
import { RecipeTag } from "@types";

export const TagSelectorComponent = () => {
  const numberOfTags = useMemo(() => 10, []);

  const dispatch = useAppDispatch();

  const { availableTags, selectedTags } = useAppSelector(
    ({ recipes }) => recipes
  );

  return (
    <View
      style={{
        marginTop: defaultAppPaddingSize / 2,
      }}
    >
      <FlatList
        horizontal
        data={[...availableTags]?.sort((a, b) => a.name.localeCompare(b.name))}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, name }, index }) => (
          <Chip
            key={id}
            mode={selectedTags.includes(id) ? "flat" : "outlined"}
            onPress={() => {
              if (!!selectedTags.includes(id)) {
                dispatch(
                  setSelectedTags(selectedTags.filter((tag) => tag !== id))
                );
              } else {
                dispatch(setSelectedTags([...selectedTags, id]));
              }
            }}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              marginLeft:
                index === 0 ? defaultAppPaddingSize : defaultAppPaddingSize / 4,
              marginRight:
                index === numberOfTags - 1
                  ? defaultAppPaddingSize
                  : defaultAppPaddingSize / 4,
            }}
          >
            {name}
          </Chip>
        )}
      />
    </View>
  );
};
