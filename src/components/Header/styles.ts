import styled from 'styled-components'
import { colors } from '../../styles'
import { ButtonStyle } from '../Button/styles'

export const HeaderStyle = styled.header`
  position: relative;

  display: flex;
  justify-content: space-around;

  width: 100%;
  padding: 40px;

  background-color: ${colors.backgroundHeader};
  border-bottom: 2px solid black;

  ${ButtonStyle} {
    display: inline-flex;
    align-items: center;
  }

  ul {
    display: flex;
    justify-content: space-around;
    gap: 18px;

    list-style: none;

    @media (max-width: 700px) {
      flex-direction: row;
    }

    @media (max-width: 450px) {
      flex-direction: column;
      gap: 12px;
    }
  }

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
`
export const FirstDivHeader = styled.div`
  display: flex;
  justify-content: center;

  align-items: center;

  @media (max-width: 320px) {
    flex-wrap: wrap;
  }
`
