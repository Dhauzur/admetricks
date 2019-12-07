import styled from "vue-styled-components"

const DatePickers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    width: calc(50% - 4px);
  }

  label {
    font-size: 12px;
  }
`

export default DatePickers
