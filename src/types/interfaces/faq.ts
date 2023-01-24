import { ITheme } from './theme';

/**
 * FAQ
 */
export interface IFaq {
  id: string;
  question: string;
  answer: string;
  position: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
