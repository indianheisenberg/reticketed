import { CommonModule } from '@angular/common';
import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface GenericDialogData {
  title?: string;
  content?: any;
  template?: TemplateRef<any>;
  templateContext?: any;
  actions?: {
    label: string;
    action: string;
    color?: string;
  }[];
}

@Component({
  selector: 'app-generic-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div
      class="fixed top-1/2 left-1/2 z-50 flex max-h-[90vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg bg-white shadow-xl"
    >
      <!-- Dialog Header -->
      <div class="flex-shrink-0 border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">{{ data.title }}</h3>
          <button
            (click)="close()"
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Close dialog"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Dialog Content (Scrollable) -->
      <div class="flex-1 overflow-y-auto px-6 py-4">
        <div *ngIf="data.content && !data.template">{{ data.content }}</div>

        <ng-container *ngIf="data.template">
          <ng-container
            *ngTemplateOutlet="data.template; context: data.templateContext"
          ></ng-container>
        </ng-container>
      </div>

      <!-- Dialog Actions -->
      <div
        *ngIf="data.actions && data.actions.length > 0"
        class="flex flex-shrink-0 justify-end space-x-3 border-t border-gray-200 bg-gray-50 px-6 py-4"
      >
        <button
          *ngFor="let action of data.actions"
          (click)="handleAction(action.action)"
          class="rounded-md px-4 py-2 text-sm font-medium focus:outline-none"
          [ngClass]="{
            'bg-blue-600 text-white hover:bg-blue-700': action.color === 'primary',
            'bg-gray-200 text-gray-800 hover:bg-gray-300':
              !action.color || action.color === 'secondary',
            'bg-red-600 text-white hover:bg-red-700': action.color === 'danger',
          }"
        >
          {{ action.label }}
        </button>
      </div>
    </div>
  `,
})
export class GenericDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GenericDialogData,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  handleAction(action: string): void {
    this.dialogRef.close(action);
  }
}
