export interface PollVariantModel {
  title: string;
  url: string;
}

export interface PollModel {
  title: string;
  description: string;
  variants: PollVariantModel[];
}
