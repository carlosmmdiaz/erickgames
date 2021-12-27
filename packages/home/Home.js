import { CMMDHeader } from "@cmmd-web/header";
import { LitElement, html } from "lit-element";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";

import { styles } from "./Home.style.js";

export class Home extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      "memory-header": CMMDHeader,
    };
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <memory-header class="header" title="Erick Games"></memory-header>
      <div class="home">
        <h2>Choose a GAME</h2>
        <nav class="nav">
          <ul>
            <li>
              <a class="link link--herse" href="/memory">Memory</a>
            </li>
          </ul>
        </nav>
      </div>
    `;
  }
}
