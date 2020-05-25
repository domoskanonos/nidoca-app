import {customElement, html, LitElement, property} from 'lit-element';
import {I18nService} from '@domoskanonos/frontend-basis';
import {BasicService} from '@domoskanonos/frontend-basis';
import {KeyValueData, InputfieldType} from '@domoskanonos/nidoca-core';

@customElement('nidoca-i18n-selector')
export class NidocaI18NSelector extends LitElement {
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
          @nidoca-event-inputfield-change="${(event: CustomEvent) => this.changeLanguage(event)}"
        ></nidoca-inputfield>
      </nidoca-form>
    `;
  }

  private changeLanguage(event: CustomEvent) {
    this.langKey = event.detail.outputData.value;
    I18nService.getUniqueInstance().setLanguage(this.langKey);
    BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
      this,
      'nidoca-event-i18n-selector-change-language',
      this.langKey
    );
  }
}
