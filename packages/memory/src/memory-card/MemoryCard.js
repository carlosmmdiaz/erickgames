import { LitElement, html } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { nothing } from "lit-html";

import { styles } from "./MemoryCard.style.js";

export class MemoryCard extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      blocked: { type: Boolean, reflect: true },
      flipped: { type: Boolean, reflect: true },
      idCard: { type: Number },
      imageId: { type: String },
      imageSource: { type: String },
    };
  }

  constructor() {
    super();

    /**
     * @type {Boolean} Tells if the card is flipped or not
     */
    this.flipped = false;

    /**
     * @type {Boolean} Tells if the card is blocked or not
     */
    this.blocked = false;

    /**
     * @type {String} Id of the image to show on flip
     */
    this.imageId = "";

    /**
     * @type {Number} Id of the image to show on flip
     */
    this.idCard = null;

    /**
     * @type {String} image card source
     */
    this.imageSource = "";
  }

  flipCard() {
    if (!this.blocked) {
      this.dispatchEvent(
        new CustomEvent("card-flipping-over", {
          detail: { idCard: this.idCard, imageId: this.imageId },
        })
      );
    }
  }

  render() {
    const flipCardInnerClasses = {
      "flip-card-inner": true,
      flipped: this.flipped,
      blocked: this.blocked,
    };

    return html`
      <button class="flip-card" @click="${this.flipCard}">
        <div class=${classMap(flipCardInnerClasses)}>
          <div class="flip-card-front">
            <img src=${`${this.imageSource}mark.svg`} />
          </div>
          <div class="flip-card-back">
            ${this.imageId
              ? html`<img src=${`${this.imageSource}${this.imageId}.svg`} />`
              : nothing}
          </div>
        </div>
      </button>
    `;
  }
}
