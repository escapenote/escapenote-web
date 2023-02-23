export interface IPage {
  startCursor?: string;
  endCursor?: string;
}

export interface ITabOption {
  key: string;
  label: string;
  onClick: () => void;
}
