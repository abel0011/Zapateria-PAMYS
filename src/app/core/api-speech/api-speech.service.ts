import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
declare const webkitSpeechRecognition: any;
@Injectable({
  providedIn: 'root',
})
export class ApiSpeechService {
  error = true;

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  text = '';
  tempWords: any;

  constructor() {}

  init(callback: any): void {
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-PE';
    this.recognition.interim = true;
    this.recognition.continuous = true;
    this.recognition.addEventListener('result', (e: any) => {
      for (let index = e.resultIndex; index < e.results.length; index++) {
        this.text = e.results[index][0].transcript;
      }
      if (
        this.text
          .toLocaleLowerCase()
          .startsWith(environment.nameVirtualAssistant)
      ) {
        callback(this.text);
      }
    });
  }

  start(): void {
    this.isStoppedSpeechRecog = false;
    // inicio el reconocimiento
    this.recognition.start();
    // cuando termina de hablar
    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
      } else {
        this.recognition.start();
      }
    });
  }
  stop(): void {
    this.text = '';
    this.recognition.stop();
    this.isStoppedSpeechRecog = true;
  }
}
