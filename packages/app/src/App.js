import { LitElement, html } from "lit-element";
import { Router } from "@vaadin/router";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";

import { Home } from "../../home/index.js";
import { MemoryGame } from "../../memory/index.js";
import { styles } from "./App.style.js";

export class App extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      "home-app": Home,
      "memory-game": MemoryGame,
    };
  }

  static get styles() {
    return styles;
  }

  firstUpdated() {
    // this.__registerServiceWorker();
    this.__loadRoutes();
  }

  __registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }

  __loadRoutes() {
    const outlet = this.shadowRoot.getElementById("outlet");
    const router = new Router(outlet);
    router.setRoutes([
      { path: "/memory", component: this.getScopedTagName("memory-game") },
      { path: "(.*)", component: this.getScopedTagName("home-app") },
    ]);
  }

  render() {
    return html`<main class="outlet" id="outlet"></main>`;
  }
}
