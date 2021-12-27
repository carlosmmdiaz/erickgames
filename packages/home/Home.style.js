import { css } from "lit-element";

import { CMMDfontFamily } from "@cmmd-web/styles";

export const styles = css`
  :host {
    display: block;
    font-family: ${CMMDfontFamily};
    margin: 0.5rem;
  }

  .header {
    display: block;
  }

  .home {
    margin: 0.3rem;
  }

  .nav {
    font-size: 2rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;
