import { TagSelectorComponent } from "@components/TagSelectorComponent";

import {
  HomeScreenWrapper,
  HomeScreenColumnWrapper,
  HomeScreenScrollWrapper,
} from "./Styled";

export const HomeScreen = () => {
  return (
    <HomeScreenWrapper>
      <TagSelectorComponent />
      <HomeScreenScrollWrapper>
        <HomeScreenColumnWrapper></HomeScreenColumnWrapper>
        <HomeScreenColumnWrapper />
      </HomeScreenScrollWrapper>
    </HomeScreenWrapper>
  );
};
