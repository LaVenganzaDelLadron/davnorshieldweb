import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ChatService } from '../../core/api/chat.service';
import { ChatMessage, ChatResponse } from '../../core/models/chat.model';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-chat',
  styleUrl: './chat.css',
  templateUrl: './chat.html',
})
export class Chat {
  private readonly chat = inject(ChatService);
  conversationId?: string;
  messages: ChatMessage[] = [];
  prompt = '';
  loading = false;
  error = '';

  startNewConversation(): void {
    this.conversationId = undefined;
    this.messages = [];
    this.error = '';
  }

  send(): void {
    const prompt = this.prompt.trim();
    if (!prompt || this.loading) return;
    this.loading = true;
    this.error = '';
    const userMessage: ChatMessage = {
      id: this.messageId(),
      role: 'user',
      content: prompt,
      created_at: new Date().toISOString(),
    };
    this.messages = [...this.messages, userMessage];
    this.prompt = '';

    this.chat.sendMessage({ conversation_id: this.conversationId, prompt }).pipe(
      finalize(() => { this.loading = false; }),
    ).subscribe({
      next: response => {
        const assistantMessage = this.toMessage(response);
        this.conversationId = response.conversation_id;
        this.messages = [...this.messages, assistantMessage];
      },
      error: () => {
        this.messages = this.messages.filter(message => message.id !== userMessage.id);
        this.error = 'Chat is temporarily unavailable.';
      },
    });
  }

  private toMessage(response: ChatResponse): ChatMessage {
    return {
      id: this.messageId(),
      role: 'assistant',
      content: response.message || 'The assistant returned an empty response.',
      metadata: response.sources?.length ? { sources: response.sources } : null,
      created_at: new Date().toISOString(),
    };
  }

  sourceCount(message: ChatMessage): number {
    const sources = message.metadata?.['sources'];
    return Array.isArray(sources) ? sources.length : 0;
  }

  private messageId(): string {
    return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;
  }
}
