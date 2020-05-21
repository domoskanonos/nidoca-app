import {customElement, html, LitElement, property} from 'lit-element';
import {NidocaButton} from '@domoskanonos/nidoca-core';

@customElement('nidoca-data-protection')
export class NidocaDataProtection extends LitElement {

    private static LOCAL_STORAGE_ACCEPT_KEY = 'nidoca-data-protection-accept';

    @property()
    nidocaButtons: NidocaButton = <NidocaButton>{};

    @property()
    lawText: string = '';

    @property()
    isAccepted: boolean;

    constructor() {
        super();
        this.isAccepted = this.getLocalStorageAcceptValue();
    }

    getLocalStorageAcceptValue(): boolean {
        let isAcceptedAsNumber = Number(
            localStorage.getItem(NidocaDataProtection.LOCAL_STORAGE_ACCEPT_KEY)
        );
        let isAccepted = isAcceptedAsNumber === 1;
        console.log('Already accepted ? ' + this.isAccepted);
        return isAccepted;
    }

    setLocalStorageAcceptValue(acceptValue: boolean): void {
        localStorage.setItem(
            NidocaDataProtection.LOCAL_STORAGE_ACCEPT_KEY,
            acceptValue ? '1' : '0'
        );
    }

    render() {
        return html`
            <nidoca-dialog style="${
            this.isAccepted ? 'display: none;' : ''
        }">
               <nidoca-button .inputData="${this.nidocaButtons}" @click="${
            this.accept
        }">${this.lawText}</nidoca-button>
            </nidoca-dialog>
         </div>
      `;
    }

    async accept() {
        this.setLocalStorageAcceptValue(true);
    }
}
