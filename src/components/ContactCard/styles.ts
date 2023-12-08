import { styled } from 'styled-components'
import { colors } from '../../styles'
import { TagStyle } from '../Tag/styles'

type ButtonFigureProps = {
  $isCorrect: 'confirm' | 'cancel' | 'delete'
}

export const ContactCardStyle = styled.div`
  display: grid;
  gap: 8px;

  grid-template-columns: 2fr 1fr 1fr;
  grid-template-areas: ' name name phone' '  name name email' ' category button button';

  width: 95%;
  max-width: 800px;
  padding: 16px;

  margin: 12px auto;
  align-items: center;

  background-color: ${colors.backgroundContactCard};

  border: 1px solid ${colors.blackborder};
  border-radius: 8px;

  box-shadow: 2px 1px ${colors.shadowBoxContactCard};

  .name {
    grid-area: name;

    display: flex;
    padding: 8px;

    border-radius: 8px;

    align-items: center;
    font-size: 24px;
    text-transform: capitalize;
  }
  .phone {
    grid-area: phone;

    display: flex;
    padding: 8px;

    width: 100%;
    align-items: center;

    a {
      width: 130px;
      text-align: center;
      padding: 8px;

      border-radius: 16px;

      transition: all 0.5s;

      &:hover {
        background-color: ${colors.backgroundFilterTagHover};
      }
    }

    ${TagStyle} {
      margin-right: 4px;
    }

    ${TagStyle} {
      @media (max-width: 320px) {
        display: none;
      }
    }
  }

  .email {
    grid-area: email;

    display: flex;
    padding: 8px;

    align-items: center;
    a {
      text-align: center;
      padding: 8px;

      border-radius: 16px;

      transition: all 0.5s;

      &:hover {
        background-color: ${colors.backgroundFilterTagHover};
      }
    }
  }

  .category {
    grid-area: category;

    display: flex;
    padding: 8px;

    align-items: center;
  }

  .button {
    grid-area: button;

    display: flex;
    width: 100%;
    gap: 8px;
    justify-content: end;
    align-items: center;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'name' 'phone' 'email' ' category' 'button';

    width: 95%;
    margin: 8px auto;

    align-items: start;
  }
`
export const CardEditingButton = styled.div<ButtonFigureProps>`
  display: flex;
  justify-content: center;
  padding: 4px;

  background-color: ${(props) =>
    props.$isCorrect === 'confirm'
      ? colors.iconConfirm
      : props.$isCorrect === 'delete'
        ? 'transparent'
        : colors.iconDanger};
  border-radius: 50%;

  align-items: center;

  cursor: pointer;

  &:hover {
    transition: all 0.3s;
    background-color: ${(props) =>
      props.$isCorrect === 'confirm'
        ? colors.iconConfirmHover
        : colors.iconDangerHover};
    color: ${colors.iconColorHover};
  }
`
export const DivPhoneTypeAndTag = styled.div`
  display: flex;
  align-items: center;
`
