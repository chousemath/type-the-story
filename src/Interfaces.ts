import { StoryKeys, TextColor, TypedPart } from './Enums'

export interface TypeableOption {
    key: StoryKeys;
  title: string;
  data: Array<string>;
  full: string;
  left: string;
  right: string;
  middle: string;
  part: TypedPart;
  leftColor: TextColor;
  middleColor: TextColor;
  index: number;
}

export interface StoryProfile {
    lastTime: number;
    bestTime: number;
    worstTime: number;
}
export interface UserProfile {
    [StoryKeys.testStory]?: StoryProfile;
    [StoryKeys.testStory2]?: StoryProfile;
    [StoryKeys.testStory3]?: StoryProfile;
    [StoryKeys.threeLittlePigs]?: StoryProfile;
    [StoryKeys.frogOx]?: StoryProfile;
    [StoryKeys.bellingCat]?: StoryProfile;
    [StoryKeys.townMouse]?: StoryProfile;
    [StoryKeys.foxGrapes]?: StoryProfile;
    [StoryKeys.wolfCrane]?: StoryProfile;
    [StoryKeys.lionMouse]?: StoryProfile;
    [StoryKeys.gnatBull]?: StoryProfile;
    [StoryKeys.owlGrasshopper]?: StoryProfile;
}
