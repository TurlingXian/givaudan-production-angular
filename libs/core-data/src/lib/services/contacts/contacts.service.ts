import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '@givaudan-production-angular/api-interfaces'

const API_Endpoint = "http://localhost:3000";

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  model = 'contacts';

  constructor(private http: HttpClient) { }

  all() {
    return this.http.get<Contact[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Contact>(this.getUrlWithId(id));
  }

  create(contact: Contact) {
    return this.http.post(this.getUrl(), contact);
  }

  update(contact: Contact) {
    return this.http.put(this.getUrlWithId(contact.id), contact);
  }

  delete(contact: Contact) {
    return this.http.delete(this.getUrlWithId(contact.id));
  }

  private getUrl() {
    return `${API_Endpoint}/${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}