import { LitElement, html } from "lit-element";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";

import { MemoryGame } from "../../memory-game/index.js";

export class App extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      "memory-game": MemoryGame,
    };
  }

  firstUpdated() {
    this.__registerServiceWorker();
  }

  __registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }

  render() {
    return html`<memory-game></memory-game>`;
  }
}
