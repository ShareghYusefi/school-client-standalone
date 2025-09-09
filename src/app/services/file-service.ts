import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  files = signal<File[]>([]);

  constructor(private http: HttpClient) {}

  addFiles(newFiles: FileList) {
    const currentFiles = this.files(); // files() is a getter function for the signal
    // spread the items within currentFiles array into a new array
    this.files.set([...currentFiles, ...Array.from(newFiles)]);
  }

  removeFile(file: File) {
    // remove file from the array based on filter condition
    this.files.update((files) => files.filter((f) => f !== file));
  }

  clearAll(){
    this.files.set([]);
  }
}
