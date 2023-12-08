import styled from 'styled-components'
import { colors } from '../../styles'

export const TagStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px;
  max-width: 100px;
  min-width: 70px;

  background-color: ${colors.tagStyleBackground};

  border: 2px solid black;
  border-radius: 40px;
`
