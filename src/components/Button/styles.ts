import styled from 'styled-components'
import { colors } from '../../styles'

type ButtonStyleProps = {
  $buttonColor?: 'red' | 'green'
}

//Estilo do botão.
//A propriedade overflow:hidden; é necessária para o efeito de hover criado.
export const ButtonStyle = styled.button<ButtonStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  height: 22px;
  margin: 8px;
  padding: 2px 4px;
  width: 100px;

  overflow: hidden;

  background-color: ${(props) =>
    props.$buttonColor === 'red'
      ? colors.buttonColorCancel
      : colors.buttonColorConfirm};
  color: white;

  border: 1px solid black;
  border-radius: 16px;

  cursor: pointer;

  &:after {
    content: '';

    position: absolute;
    left: -75px;
    top: -50px;

    width: 50px;
    height: 155px;

    opacity: 0.2;
    background: #fff;

    transform: rotate(35deg);
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
  }
  &:hover {
    &:after {
      left: 120%;
      transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
`
