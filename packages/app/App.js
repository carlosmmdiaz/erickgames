import { LitElement, html } from "lit-element";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";

import MemoryGame from "../memory-game/src/app/App.js";

export default class App extends ScopedElementsMixin(LitElement) {
    static get scopedElements() {
      return {
        "memory-game": MemoryGame,
      };
    }

  render() {
    return html`
      <h1>Erick Games</h1>
      <memory-game></memory-game>
    `;
  }
}
