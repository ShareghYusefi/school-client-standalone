export interface IFile {
  id: number;
  fileable_id: number;
  fileable_type: string;
  path: string;
  name: string;
  mime_type: string;
  size: number;
  uploaded_at: string;
}
