import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


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
  selector: 'app-right-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss'
})
export class RightPanelComponent {
 
}
