export interface ChatRequest {
  conversation_id?: string;
  prompt: string;
  top_k?: number;
  temperature?: number;
}

export interface ChatSource {
  id: string;
  score: number;
  snippet: string;
}

export interface ChatResponse {
  conversation_id: string;
  message: string;
  sources: ChatSource[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  metadata?: Record<string, unknown> | null;
  created_at: string;
}

export interface ChatDocumentRequest {
  source: string;
  text: string;
}

export interface ChatDocumentResponse {
  id: string;
  chunk_count: number;
}
