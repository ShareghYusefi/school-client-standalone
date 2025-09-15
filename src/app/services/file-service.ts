import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IFile } from '../interfaces/ifile';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  files = signal<any>([]);

  constructor(private http: HttpClient) {}

  addFiles(newFiles: FileList) {
    const currentFiles = this.files(); // files() is a getter function for the signal
    // spread the items within currentFiles array into a new array
    this.files.set([...currentFiles, ...Array.from(newFiles)]); // convert FileList to an array
  }

  removeFile(file: File | IFile) {
    console.log('File:', file);
    console.log('Files before removal:', this.files());

    // remove file from the array based on filter condition
    this.files.update((files) => files.filter((f: any) => f !== file));
  }

  clearAll() {
    this.files.set([]);
  }
}
