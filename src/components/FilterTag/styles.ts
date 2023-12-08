import styled from 'styled-components'
import { colors } from '../../styles'

type FilterTagProps = {
  $active?: boolean
}

export const FilterTagStyle = styled.li<FilterTagProps>`
  width: 120px;
  padding: 4px 0px;

  margin: auto;

  border: 2px solid ${colors.blackborder};
  border-radius: 16px;

  background-color: ${(props) =>
    props.$active ? colors.backgroundFilterTagActive : 'transparent'};

  text-align: center;
  font-weight: bold;

  cursor: ${(props) => (props.$active ? 'default' : 'pointer')};

  &:hover {
    background-color: ${(props) =>
      props.$active
        ? colors.backgroundFilterTagActive
        : colors.backgroundFilterTagHover};
  }
`
