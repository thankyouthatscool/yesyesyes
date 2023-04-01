import { FC, useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { IconButton, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setSearchTerm } from "@store";
import { defaultAppPadding } from "@theme";
import { HomeScreenNavProps } from "@types";

export const HomeScreen: FC<HomeScreenNavProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { searchTerm } = useAppSelector(({ app }) => ({ ...app }));

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const searchBarRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!!searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [searchBarRef]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: defaultAppPadding }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Searchbar
            elevation={isFocus ? 3 : 0}
            onBlur={() => setIsFocus(() => false)}
            onChangeText={(e) => dispatch(setSearchTerm(e))}
            onFocus={() => setIsFocus(() => true)}
            placeholder="Search item or location"
            ref={searchBarRef}
            style={{ flex: 1 }}
            value={searchTerm || ""}
          />
          <IconButton
            icon="plus"
            mode="contained"
            onPress={() => {
              navigation.navigate("NewCatalogItemScreen");
            }}
            size={30}
          />
        </View>
        {!!searchTerm && <SearchResult />}
      </ScrollView>
    </SafeAreaView>
  );
};

export const SearchResult = () => {
  return (
    <View style={{ marginTop: defaultAppPadding }}>
      <Text>Search Result</Text>
    </View>
  );
};
