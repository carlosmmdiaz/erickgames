import { CMMDButton } from "@cmmd-web/button";
import { CMMDHeader } from "@cmmd-web/header";
import { LionDialog } from "@lion/dialog";
import { LitElement, html } from "lit-element";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";

import {
  CARDS_FAMILIES,
  CARD_GAP,
  CARD_WIDTH,
  HEADER_HEIGHT,
} from "./constants.js";
import { MemoryCard } from "../memory-card/index.js";
import { MemoryDialog } from "../memory-dialog/index.js";
import { generateRandomGameTable, getRandomInt } from "./utils.js";
import { styles } from "./MemoryGame.style.js";

const getRandomCardFamily = () => {
  const numberOfFamilies = Object.keys(CARDS_FAMILIES).length;
  const randomNumber = getRandomInt(0, numberOfFamilies);

  return CARDS_FAMILIES[randomNumber];
};

export class MemoryGame extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      "memory-button": CMMDButton,
      "memory-card": MemoryCard,
      "memory-dialog": LionDialog,
      "memory-dialog-content": MemoryDialog,
      "memory-header": CMMDHeader,
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();

    this.__cards = getRandomCardFamily();
  }

  connectedCallback() {
    super.connectedCallback();

    this.loadGame();
  }

  loadGame() {
    // TODO: Make it fully responsive, use all available space
    const MAX_CARDS = this.__cards.MAX_CARDS;
    const viewportHeight = window.visualViewport.height - HEADER_HEIGHT;
    const viewportWidth = window.visualViewport.width;

    const cardsByHeight = Math.floor(viewportHeight / (CARD_WIDTH + CARD_GAP));
    const cardsByWidth = Math.floor(viewportWidth / (CARD_WIDTH + CARD_GAP));
    const possibleNumberOfCards = Math.floor(
      (cardsByHeight * cardsByWidth) / 2
    );
    this.numberOfCards =
      possibleNumberOfCards > MAX_CARDS ? MAX_CARDS : possibleNumberOfCards;

    this.gameTable = generateRandomGameTable(this.numberOfCards, MAX_CARDS);
  }

  resetGame() {
    this.__cards = getRandomCardFamily();
    
    this.loadGame();

    this.requestUpdate();
  }

  flipCard(idCard) {
    this.gameTable = this.gameTable.map((card) => {
      if (card.idCard === idCard && !card.blocked) {
        return {
          ...card,
          flipped: !card.flipped,
        };
      }

      return card;
    });
  }

  blockCard(idCard) {
    this.gameTable = this.gameTable.map((card) => {
      if (card.idCard === idCard && !card.blocked) {
        return {
          ...card,
          blocked: true,
        };
      }

      return card;
    });
  }

  unFlipCards(idCard) {
    this.gameTable = this.gameTable.map((card) => ({
      ...card,
      flipped: card.blocked
        ? card.flipped
        : card.idCard === idCard
        ? true
        : false,
    }));
  }

  checkMatches(imageId) {
    const cardMatches = this.gameTable.filter(
      (card) => card.flipped && card.imageId === imageId
    );

    if (cardMatches.length === 2) {
      this.blockCard(cardMatches[0].idCard);
      this.blockCard(cardMatches[1].idCard);
    }
  }

  checkEndOfGame() {
    const cardsBlocked = this.gameTable.filter((card) => card.blocked).length;

    if (cardsBlocked === this.numberOfCards * 2) {
      const memoryDialog = this.shadowRoot.querySelector(
        '[data-tag-name="memory-dialog"]'
      );

      memoryDialog.opened = true;
    }
  }

  flippingCard({ detail: { idCard, imageId } }) {
    const cardsFlipped = this.gameTable.filter(
      (card) => card.flipped && !card.blocked
    );

    switch (cardsFlipped.length) {
      case 0:
        this.flipCard(idCard);
        break;
      case 1:
        this.flipCard(idCard);
        this.checkMatches(imageId);
        this.checkEndOfGame();
        break;
      default:
        this.unFlipCards(idCard);
        break;
    }

    this.requestUpdate();
  }

  renderGameTable() {
    return this.gameTable.map(
      (card) =>
        html`
          <memory-card
            .idCard=${card.idCard}
            .imageId=${card.imageId}
            .imageSource=${this.__cards.IMAGE_SOURCE}
            ?blocked=${card.blocked}
            ?flipped=${card.flipped}
            @card-flipping-over=${this.flippingCard}
            class="game-card"
          ></memory-card>
        `
    );
  }

  render() {
    return html`
      <memory-header class="header" title="Memory Game">
        <memory-button danger @click=${this.resetGame}>Reset</memory-button>
      </memory-header>
      <div class="game-table">${this.renderGameTable()}</div>
      <memory-dialog id="memory-dialog">
        <memory-dialog-content
          slot="content"
          @closing-dialog=${this.resetGame}
        ></memory-dialog-content>
      </memory-dialog>
    `;
  }
}
