import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../core/api/chat.service';
import { ChatMessage } from '../../core/models/chat.model';

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

  send(): void {
    const prompt = this.prompt.trim();
    if (!prompt || this.loading) return;
    this.loading = true;
    this.error = '';
    this.chat.sendMessage({ conversation_id: this.conversationId, prompt }).subscribe({
      next: response => {
        this.conversationId = response.conversation_id;
        this.messages = [...this.messages,
          { id: crypto.randomUUID(), role: 'user', content: prompt, created_at: new Date().toISOString() },
          { id: crypto.randomUUID(), role: 'assistant', content: response.message, metadata: { sources: response.sources }, created_at: new Date().toISOString() },
        ];
        this.prompt = '';
        this.loading = false;
      },
      error: () => { this.error = 'Chat is temporarily unavailable.'; this.loading = false; },
    });
  }
}
