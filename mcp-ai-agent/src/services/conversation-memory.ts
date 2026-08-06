import { createLogger, type Logger } from "@mcp-marketing/shared";
import type { AgentStore, ChatMessage } from "./store.js";

export interface ConversationSummary {
  sessionId: string;
  messageCount: number;
  lastMessageAt?: string;
  topics: string[];
}

export interface ConversationMemoryOptions {
  maxMessagesPerSession?: number;
  logger?: Logger;
}

export class ConversationMemory {
  private readonly maxMessages: number;
  private readonly logger: Logger;

  constructor(options: ConversationMemoryOptions = {}) {
    this.maxMessages = options.maxMessagesPerSession ?? 200;
    this.logger = options.logger ?? createLogger("conversation-memory");
  }

  getSessionHistory(store: AgentStore, sessionId: string, limit?: number): ChatMessage[] {
    const messages = store.history.filter((m) => m.sessionId === sessionId);
    const capped = limit ?? this.maxMessages;
    return messages.slice(-capped);
  }

  appendMessage(store: AgentStore, message: ChatMessage): ChatMessage {
    store.history.push(message);
    this.logger.debug(
      { sessionId: message.sessionId, role: message.role },
      "Appended message to conversation memory",
    );
    return message;
  }

  summarizeSession(store: AgentStore, sessionId: string): ConversationSummary {
    const messages = this.getSessionHistory(store, sessionId);
    const userTopics = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content.slice(0, 80));

    const lastMessageAt = messages.at(-1)?.timestamp;
    const summary: ConversationSummary = {
      sessionId,
      messageCount: messages.length,
      topics: userTopics.slice(-5),
    };
    if (lastMessageAt !== undefined) {
      summary.lastMessageAt = lastMessageAt;
    }
    return summary;
  }

  listSessions(store: AgentStore): ConversationSummary[] {
    const sessionIds = [...new Set(store.history.map((m) => m.sessionId))];
    return sessionIds.map((sessionId) => this.summarizeSession(store, sessionId));
  }

  clearSession(store: AgentStore, sessionId: string): number {
    const before = store.history.length;
    store.history = store.history.filter((m) => m.sessionId !== sessionId);
    const removed = before - store.history.length;
    this.logger.info({ sessionId, removed }, "Cleared session from conversation memory");
    return removed;
  }
}
