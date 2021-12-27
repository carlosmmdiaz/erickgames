import { css } from "lit-element";

export const styles = css`
  .outlet > .leaving {
    animation: 1s fadeOut ease-in-out;
  }
  .outlet > .entering {
    animation: 1s fadeIn linear;
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
