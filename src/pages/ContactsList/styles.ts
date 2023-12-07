import styled from 'styled-components'
import { ButtonStyle } from '../../components/Button/styles'

export const NewContactButtonDiv = styled.div`
  ${ButtonStyle} {
    position: absolute;
    bottom: 15px;
    right: 15px;

    height: 22px;

    @media (max-width: 450px) {
      bottom: unset;
      top: 200px;
    }
  }
`

export const SummarySearch = styled.span`
  display: inline-block;
  width: 100%;
  margin: 12px auto;

  text-align: center;
  font-weight: bold;
`
