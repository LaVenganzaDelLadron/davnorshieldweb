import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { API_ENDPOINTS } from '../constants/api.constants';
import { ChatDocumentRequest, ChatDocumentResponse, ChatMessage, ChatRequest, ChatResponse } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl + API_ENDPOINTS.CHAT;

  sendMessage(request: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.url}/`, request);
  }

  getMessages(conversationId: string, limit = 100): Observable<ChatMessage[]> {
    const params = new HttpParams().set('limit', limit);
    return this.http.get<ChatMessage[]>(`${this.url}/conversations/${conversationId}/messages`, { params });
  }

  uploadDocument(request: ChatDocumentRequest): Observable<ChatDocumentResponse> {
    return this.http.post<ChatDocumentResponse>(`${this.url}/documents/upload`, request);
  }
}
