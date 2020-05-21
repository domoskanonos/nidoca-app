import { customElement, html, LitElement, property } from 'lit-element';
import { I18nService, LanguageKey } from '@domoskanonos/frontend-basis';
import { BasicService } from '@domoskanonos/frontend-basis';
import { KeyValueData, InputfieldType } from '@domoskanonos/nidoca-core';

@customElement('nidoca-i18n-selector')
export class I18NSelectorComponent extends LitElement {

   static EVENT_CHANGE_LANGUAGE: string =
      'nidoca-i18n-selector-change-language';

   @property()
   label: string = '';

   @property()
   langKey: string = I18nService.getUniqueInstance().getLanguage();

   @property()
   languages: KeyValueData[] = [];

   render() {
      return html`
         <nidoca-form>
            <nidoca-inputfield
               inputfieldType="${InputfieldType.COMBOBOX}"
               value="${this.langKey}"
               .options="${this.languages}"
               label="${this.label}"
               @nidoca-event-inputfield-change="${(event: CustomEvent) =>
                  this.changeLanguage(event)}"
            ></nidoca-inputfield>
         </nidoca-form>
      `;
   }

   private changeLanguage(event: CustomEvent) {
      this.langKey = event.detail.outputData.value[0];
      I18nService.getUniqueInstance().setLanguage(this.langKey);
      BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
         this,
         I18NSelectorComponent.EVENT_CHANGE_LANGUAGE,
         this.langKey
      );
   }
}
