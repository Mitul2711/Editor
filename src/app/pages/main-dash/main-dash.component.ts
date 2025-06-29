import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { SideOptionComponent } from '../side-option/side-option.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Effect {
  name: string;
  icon: string;
}

interface Layer {
  name: string;
  opacity: number;
  blendMode: string;
  visible: boolean;
}

interface CustomFilter {
  name: string;
  expanded: boolean;
}


@Component({
  selector: 'app-main-dash',
  imports: [SideOptionComponent, FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './main-dash.component.html',
  styleUrl: './main-dash.component.scss'
})
export class MainDashComponent {


  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isDragOver = false;
  
  // History tabs
  tabs = [
    { id: 'original', label: 'Original', active: false },
    { id: 'crop', label: 'Crop', active: false },
    { id: 'brightness', label: 'Brightness', active: false },
    { id: 'filter', label: 'Filter', active: true },
    { id: 'text', label: 'Text', active: false }
  ];

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  onUploadClick(): void {
    this.fileInput.nativeElement.click();
  }

  private handleFile(file: File): void {
    if (file.type.startsWith('image/')) {
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  selectTab(tabId: string): void {
    this.tabs.forEach(tab => tab.active = tab.id === tabId);
  }

  // Toolbar actions
  onUndo(): void {
    console.log('Undo action');
  }

  onRedo(): void {
    console.log('Redo action');
  }

  onCopy(): void {
    console.log('Copy action');
  }

  onClose(): void {
    console.log('Close action');
    this.selectedFile = null;
    this.imagePreview = null;
  }


  activeTab: string = 'effects';
  selectedEffect: string = '';
  
  brightness: number = 0;
  contrast: number = 0;
  saturation: number = 0;

  rightTabs = [
    { key: 'layers', label: 'Layers' },
    { key: 'adjustments', label: 'Adjust' },
    { key: 'effects', label: 'Effects' }
  ];

  effects: Effect[] = [
    { name: 'Blur', icon: '✨' },
    { name: 'Sharpen', icon: '🔍' },
    { name: 'Vintage', icon: '📷' },
    { name: 'B&W', icon: '⚫' },
    { name: 'Sepia', icon: '🟫' },
    { name: 'Vignette', icon: '⭕' }
  ];

  customFilters: CustomFilter[] = [
    { name: 'Film Grain', expanded: false },
    { name: 'Light Leak', expanded: false },
    { name: 'Color Pop', expanded: false }
  ];

  layers: Layer[] = [
    { name: 'Background', opacity: 100, blendMode: 'Normal', visible: true },
    { name: 'Layer 1', opacity: 85, blendMode: 'Normal', visible: true },
    { name: 'Text Layer', opacity: 100, blendMode: 'Normal', visible: false },
    { name: 'Effects', opacity: 60, blendMode: 'Normal', visible: true }
  ];

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  selectEffect(effectName: string): void {
    this.selectedEffect = this.selectedEffect === effectName ? '' : effectName;
  }

  toggleFilter(filterName: string): void {
    const filter = this.customFilters.find(f => f.name === filterName);
    if (filter) {
      filter.expanded = !filter.expanded;
    }
  }

  addLayer(): void {
    const newLayer: Layer = {
      name: `Layer ${this.layers.length}`,
      opacity: 100,
      blendMode: 'Normal',
      visible: true
    };
    this.layers.push(newLayer);
  }

  deleteLayer(): void {
    if (this.layers.length > 1) {
      this.layers.pop();
    }
  }

  toggleLayerVisibility(layerName: string): void {
    const layer = this.layers.find(l => l.name === layerName);
    if (layer) {
      layer.visible = !layer.visible;
    }
  }

  applyAdjustments(): void {
    console.log('Applying adjustments:', {
      brightness: this.brightness,
      contrast: this.contrast,
      saturation: this.saturation
    });
  }

  trackByLayer(index: number, layer: Layer): string {
    return layer.name;
  }

}
