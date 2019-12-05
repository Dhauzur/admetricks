import styled from 'vue-styled-components';

const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;

  & > div {
    width: calc(50% - 10px);
  }
`;

export default ControlsRow;
