import styled from 'vue-styled-components';

export default styled.ul`
  width: 100%;
  display: flex;
  margin: 16px 0;
  padding: 0;
  list-style: none;
  
  li {
    flex-grow: 1;
    padding: 8px;
    cursor: pointer;
    border-bottom: 2px transparent;
    text-align: center;

    &.active {
      color: var(--primary-color);
      border-bottom: 2px solid var(--primary-color);
    }
  }
`;
