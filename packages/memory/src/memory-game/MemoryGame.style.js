import { css } from "lit-element";

import { CARD_GAP, CARD_WIDTH } from "./constants.js";

export const styles = css`
  :host {
    display: block;
    --cardSpace: ${CARD_WIDTH}px;
  }

  .header {
    display: block;
    padding: 0.5rem;
  }

  .game-table {
    display: grid;
    gap: ${CARD_GAP}px;
    grid-template-columns: repeat(auto-fill, minmax(var(--cardSpace), 1fr));
    justify-items: center;
    padding-bottom: ${CARD_GAP}px;
  }

  .game-card {
    width: var(--cardSpace);
    height: var(--cardSpace);
  }
`;
