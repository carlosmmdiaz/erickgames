import { LitElement, html } from "lit-element";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { CMMDButton } from "@cmmd-web/button";
import { CMMDHeader } from "@cmmd-web/header";
import { LionDialog } from "@lion/dialog";

import { Card } from "../card/Card.js";
import { DialogContent } from "../dialog-content/DialogContent.js";
import { generateRandomGameTable } from "./utils.js";
import { MAX_CARDS, HEADER_HEIGHT, CARD_WIDTH, CARD_GAP } from "./constants.js";
import { styles } from "./MemoryGame.style.js";

export class MemoryGame extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      "memory-button": CMMDButton,
      "memory-card": Card,
      "memory-dialog": LionDialog,
      "memory-dialog-content": DialogContent,
      "memory-header": CMMDHeader,
    };
  }

  static get styles() {
    return styles;
  }

  connectedCallback() {
    super.connectedCallback();

    this.loadGame();
  }

  loadGame() {
    const viewportHeight =
      window.visualViewport.height - HEADER_HEIGHT;
    const viewportWidth = window.visualViewport.width;

    const cardsByHeight = Math.floor(viewportHeight / (CARD_WIDTH + CARD_GAP));
    const cardsByWidth = Math.floor(viewportWidth / (CARD_WIDTH + CARD_GAP));
    const possibleNumberOfCards = Math.floor(
      (cardsByHeight * cardsByWidth) / 2
    );
    this.numberOfCards =
      possibleNumberOfCards > MAX_CARDS ? MAX_CARDS : possibleNumberOfCards;

    this.gameTable = generateRandomGameTable(this.numberOfCards);
  }

  resetGame() {
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
