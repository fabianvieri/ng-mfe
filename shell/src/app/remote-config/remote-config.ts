import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-remote-config',
  styles: [
    `
      .remote-config {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 9999;
      }

      .remote-config__toggle {
        border: 0;
        border-radius: 999px;
        padding: 0.6rem 1rem;
        cursor: pointer;
        color: #fff;
        background: #0f172a;
        box-shadow: 0 6px 18px rgba(15, 23, 42, 0.35);
      }

      .remote-config__panel {
        margin-bottom: 0.6rem;
        width: min(92vw, 360px);
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 10px 28px rgba(15, 23, 42, 0.2);
        padding: 0.8rem;
      }

      .remote-config__title {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .remote-config__input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        padding: 0.55rem 0.65rem;
        margin-bottom: 0.6rem;
      }

      .remote-config__actions {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }

      .remote-config__btn {
        border: 0;
        border-radius: 8px;
        padding: 0.45rem 0.8rem;
        cursor: pointer;
      }

      .remote-config__btn--secondary {
        background: #e2e8f0;
        color: #0f172a;
      }

      .remote-config__btn--primary {
        background: #0f172a;
        color: #fff;
      }
    `,
  ],
  template: `
    <div class="remote-config">
      @if (isOpen) {
        <div class="remote-config__panel">
          <div class="remote-config__title">Remote Config (Dev)</div>
          <input
            class="remote-config__input"
            type="url"
            placeholder="http://localhost:4201/remoteEntry.js"
            [value]="draftUrl"
            (input)="onDraftChange($event)"
          />
          <div class="remote-config__actions">
            <button
              class="remote-config__btn remote-config__btn--secondary"
              type="button"
              (click)="close()"
            >
              Cancel
            </button>
            <button
              class="remote-config__btn remote-config__btn--primary"
              type="button"
              (click)="apply()"
            >
              Update & Reload
            </button>
          </div>
        </div>
      }
      <button class="remote-config__toggle" type="button" (click)="toggle()">
        {{ isOpen ? 'Close Remote Config' : 'Remote Config' }}
      </button>
    </div>
  `,
})
export class RemoteConfigComponent {
  readonly storageKey = 'remote-url';
  readonly fallbackUrl = 'http://localhost:4201/remoteEntry.js';
  isOpen = false;
  draftUrl = localStorage.getItem(this.storageKey) ?? this.fallbackUrl;

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.draftUrl = localStorage.getItem(this.storageKey) ?? this.fallbackUrl;
    }
  }

  close() {
    this.isOpen = false;
  }

  onDraftChange(event: Event) {
    const input = event.target as HTMLInputElement | null;
    this.draftUrl = input?.value ?? '';
  }

  apply() {
    const url = this.draftUrl.trim() || this.fallbackUrl;
    localStorage.setItem(this.storageKey, url);
    window.location.reload();
  }
}
