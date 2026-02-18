import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreConfig } from '../../../../services/config';

@Component({
    selector: 'app-options',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './options.component.html',
    styleUrl: './options.component.scss'
})
export class OptionsComponent {
    @Input() storeConfig!: StoreConfig;
    @Output() storeConfigChange = new EventEmitter<StoreConfig>();

    // Helper to ensure objects exist if they are undefined
    ngOnChanges() {
        if (this.storeConfig) {
            if (!this.storeConfig.siteInfo) {
                this.storeConfig.siteInfo = {
                    address: '',
                    phone: '',
                    email: '',
                    description: '',
                    aboutUsContent: ''
                };
            }
            if (!this.storeConfig.socials) {
                this.storeConfig.socials = {
                    facebook: '',
                    instagram: '',
                    twitter: ''
                };
            }
        }
    }
}
