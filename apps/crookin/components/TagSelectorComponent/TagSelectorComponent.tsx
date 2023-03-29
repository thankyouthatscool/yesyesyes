import { useEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { Chip } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setSelectedTags } from "@store";
import { defaultAppPaddingSize } from "@theme";
import { RecipeTag } from "@types";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export const TagSelectorComponent = () => {
  // const numberOfTags = useMemo(() => 10, []);

  const [numberOfTags, setNumberOfTags] = useState<number>(0);

  const dispatch = useAppDispatch();

  const { availableTags, selectedTags } = useAppSelector(
    ({ recipes }) => recipes
  );

  useEffect(() => {
    if (!!availableTags) {
      setNumberOfTags(() => availableTags.length);
    }
  }, [availableTags]);

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
