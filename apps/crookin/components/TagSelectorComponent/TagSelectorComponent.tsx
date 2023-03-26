import { Text, View } from "react-native";
import { Chip } from "react-native-paper";

export const TagSelectorComponent = () => {
  return (
    <View style={{ flexDirection: "row", marginHorizontal: 4 }}>
      <Chip icon="information">Yes yes yes</Chip>
    </View>
  );
};
