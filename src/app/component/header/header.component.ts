// header.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  zoomLevel = 100;

  navItems = [
    { label: 'Open', icon: '📁', action: 'open' },
    { label: 'Save', icon: '💾', action: 'save' },
    { label: 'Export', icon: '⬇️', action: 'export', primary: true }
  ];

  utilityButtons = [
    { icon: '↶', tooltip: 'Undo', action: 'undo' },
    { icon: '↷', tooltip: 'Redo', action: 'redo' },
    { icon: '🔍', tooltip: 'Search', action: 'search' },
    { icon: '⛶', tooltip: 'Fullscreen', action: 'fullscreen' },
    { icon: '📤', tooltip: 'Share', action: 'share' }
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onNavAction(action: string): void {
    console.log(`Navigation action: ${action}`);
    this.isMobileMenuOpen = false;
    
    // Add your navigation logic here
    switch (action) {
      case 'open':
        this.handleOpen();
        break;
      case 'save':
        this.handleSave();
        break;
      case 'export':
        this.handleExport();
        break;
    }
  }

  onUtilityAction(action: string): void {
    console.log(`Utility action: ${action}`);
    
    // Add your utility logic here
    switch (action) {
      case 'undo':
        this.handleUndo();
        break;
      case 'redo':
        this.handleRedo();
        break;
      case 'search':
        this.handleSearch();
        break;
      case 'fullscreen':
        this.handleFullscreen();
        break;
      case 'share':
        this.handleShare();
        break;
    }
  }

  adjustZoom(delta: number): void {
    this.zoomLevel = Math.max(25, Math.min(400, this.zoomLevel + delta));
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const mobileMenu = document.querySelector('.mobile-menu');
    const dropdown = document.querySelector('.mobile-dropdown');
    
    if (mobileMenu && dropdown && 
        !mobileMenu.contains(target) && 
        !dropdown.contains(target)) {
      this.isMobileMenuOpen = false;
    }
  }

  private handleOpen(): void {
    // Implement open functionality
  }

  private handleSave(): void {
    // Implement save functionality
  }

  private handleExport(): void {
    // Implement export functionality
  }

  private handleUndo(): void {
    // Implement undo functionality
  }

  private handleRedo(): void {
    // Implement redo functionality
  }

  private handleSearch(): void {
    // Implement search functionality
  }

  private handleFullscreen(): void {
    // Implement fullscreen functionality
  }

  private handleShare(): void {
    // Implement share functionality
  }
}
