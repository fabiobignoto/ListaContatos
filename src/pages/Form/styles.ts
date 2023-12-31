import styled from 'styled-components'
import { InputStyle } from '../../components/Input/styles'
import { colors } from '../../styles'

export const FormStyle = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;

  align-items: center;

  max-width: 760px;
  padding: 32px;

  margin: 64px auto;
  & > ${InputStyle} {
    width: 85%;
    max-width: 500px;
  }

  select {
    padding: 4px 8px;

    background-color: ${colors.selectBackground};

    border: 1px solid ${colors.blackborder};
    border-radius: 16px;
  }

  h2 {
    margin-bottom: 24px;
  }
`
