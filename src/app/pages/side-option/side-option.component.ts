// toolbar.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';

export interface ToolbarTool {
  id: string;
  icon: string;
  name: string;
  tooltip: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
}

@Component({
  selector: 'app-side-option',
  imports: [CommonModule],
  templateUrl: './side-option.component.html',
  styleUrl: './side-option.component.scss'
})
export class SideOptionComponent {
  @Input() activeTool: string = 'move';
  @Output() toolSelected = new EventEmitter<string>();
  @Output() toolAction = new EventEmitter<{ tool: string, action: string }>();

  tools: ToolbarTool[] = [
    {
      id: 'move',
      icon: '✛',
      name: 'Move Tool',
      tooltip: 'Move and transform objects (V)',
      isActive: true
    },
    {
      id: 'select',
      icon: '⬚',
      name: 'Selection Tool',
      tooltip: 'Select objects (A)'
    },
    {
      id: 'link',
      icon: '🔗',
      name: 'Link Tool',
      tooltip: 'Create links and connections (L)'
    },
    {
      id: 'shape',
      icon: '◇',
      name: 'Shape Tool',
      tooltip: 'Draw shapes and polygons (U)',
      hasSubmenu: true
    },
    {
      id: 'text',
      icon: 'T',
      name: 'Text Tool',
      tooltip: 'Add and edit text (T)'
    },
    {
      id: 'rectangle',
      icon: '□',
      name: 'Rectangle Tool',
      tooltip: 'Draw rectangles (R)'
    },
    {
      id: 'line',
      icon: '—',
      name: 'Line Tool',
      tooltip: 'Draw lines and paths (P)'
    },
    {
      id: 'emoji',
      icon: '😊',
      name: 'Emoji Tool',
      tooltip: 'Insert emojis and symbols (E)'
    },
    {
      id: 'filter',
      icon: '▽',
      name: 'Filter Tool',
      tooltip: 'Apply filters and effects (F)'
    }
  ];

  /**
   * Handle tool selection
   */
  onToolSelect(toolId: string): void {
    if (this.activeTool !== toolId) {
      this.activeTool = toolId;
      this.toolSelected.emit(toolId);
      console.log(`Tool selected: ${toolId}`);
    }
  }

  /**
   * Handle tool double click for additional actions
   */
  onToolDoubleClick(toolId: string): void {
    this.toolAction.emit({ tool: toolId, action: 'double-click' });
    console.log(`Tool double-clicked: ${toolId}`);
  }

  /**
   * Handle tool right click for context menu
   */
  onToolRightClick(event: MouseEvent, toolId: string): void {
    event.preventDefault();
    this.toolAction.emit({ tool: toolId, action: 'context-menu' });
    console.log(`Tool right-clicked: ${toolId}`);
  }

  /**
   * Check if tool is active
   */
  isToolActive(toolId: string): boolean {
    return this.activeTool === toolId;
  }

  /**
   * Get tool by ID
   */
  getTool(toolId: string): ToolbarTool | undefined {
    return this.tools.find(tool => tool.id === toolId);
  }
}