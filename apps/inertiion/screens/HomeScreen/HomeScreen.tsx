import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { defaultAppPadding } from "@theme";

export const HomeScreen = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const searchBarRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!!searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [searchBarRef]);

  return (
    <SafeAreaView style={{ flex: 1, padding: defaultAppPadding }}>
      <Searchbar
        mode="bar"
        elevation={isFocus ? 3 : 0}
        onBlur={() => setIsFocus(() => false)}
        onChangeText={(e) => setSearchTerm(() => e)}
        onFocus={() => setIsFocus(() => true)}
        placeholder="Search item or location"
        ref={searchBarRef}
        value={searchTerm || ""}
      />
    </SafeAreaView>
  );
};
