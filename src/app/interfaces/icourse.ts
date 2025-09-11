import { IFile } from './ifile';

export interface ICourse {
  id: number;
  name: string;
  cover: string;
  level: number;
  files?: File[] | IFile[];
}
