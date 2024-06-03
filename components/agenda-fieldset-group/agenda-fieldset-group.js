import { getLibs } from '../../scripts/utils.js';
import { style } from './agenda-fieldset-group.css.js';

const { LitElement, html, repeat, nothing } = await import(`${getLibs()}/deps/lit-all.min.js`);

export default class AgendaFieldsetGroup extends LitElement {
  static properties = {
    agendas: { type: Array },
    timeslots: { type: Array },
    options: { type: Object },
  };

  constructor() {
    super();
    this.agendas = this.agendas || [{}];
    this.timeslots = this.dataset.timeslots.split(',');
    this.options = JSON.parse(this.dataset.options);
  }

  static styles = style;

  addAgenda() {
    this.agendas = [...this.agendas, {}];
  }

  deleteAgenda(index) {
    this.agendas = this.agendas.filter((_, i) => i !== index);
    this.requestUpdate();
  }

  handleAgendaUpdate(event, index) {
    const updatedAgenda = event.detail.agenda;
    this.agendas = this.agendas.map((agenda, i) => (i === index ? updatedAgenda : agenda));
  }

  getAgendas() {
    return this.agendas;
  }

  render() {
    return html`
      ${repeat(this.agendas, (agenda, index) => html`
        <agenda-fieldset .agenda=${agenda} .timeslots=${this.timeslots} .options=${this.options}
          @update-agenda=${(event) => this.handleAgendaUpdate(event, index)}>
          <div slot="delete-btn" class="delete-btn">
            ${this.agendas.length > 1 ? html`
              <img class="icon icon-remove-circle" src="/icons/remove-circle.svg" alt="remove-repeater" @click=${() => this.deleteAgenda(index)}></img>
            ` : nothing}
          </div>
        </agenda-fieldset>
      `)}
      <repeater-element text="Add agenda time and details" @repeat=${this.addAgenda}></repeater-element>
    `;
  }
}
