import { css } from "astroturf";

export const mdx = css`
  .link {
    text-decoration: none;
  }

  .button {
    background-color: var(--color-main);
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: var(--font-headings);
    font-weight: normal;
    color: #fff;
    padding: 1em;
    margin: 0 auto 1em;
    width: max-content;
  }
`;
