import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private progressSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private _storage: AngularFireStorage) {}

  uploadFile(file: File): Observable<string> {
    const filePath = `image/${Date.now()}_${file.name}`;
    const fileRef = this._storage.ref(filePath);

    const task = this._storage.upload(filePath, file);

    task.percentageChanges().subscribe((progress) => {
      this.progressSubject.next(progress);
    });

    return new Observable((observer) => {
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(
              (downloadURL) => {
                observer.next(downloadURL);
                observer.complete();
              },
              (error) => observer.error(error)
            );
          })
        )
        .subscribe();
    });
  }


  getUploadProgress(): Observable<number> {
    return this.progressSubject.asObservable();
  }
  
}
