import styled, { createGlobalStyle } from 'styled-components'

export const colors = {
  backgroundHeader: 'rgb(242,242,242)',

  backgroundFilterTagHover: 'rgb(220,220,220)',
  backgroundFilterTagActive: ' rgb(209, 232, 159)',

  backgroundContactCard: 'rgb(242,242,242)',
  shadowBoxContactCard: 'rgb(100,100,100)',

  backgroundTag: 'rgb(209,250,159)',

  buttonColorConfirm: 'green',
  buttonColorCancel: 'darkred',

  blackborder: '#121212',

  iconConfirm: 'lightgreen',
  iconConfirmHover: 'darkgreen',

  iconDanger: 'salmon',
  iconDangerHover: 'darkred',

  iconColorHover: 'white',

  selectBackground: 'white',

  tagStyleBackground: 'transparent'
}
export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    .inputMaskStyle{
      padding: 8px;
      border-radius: 16px;
      width: 150px;
    }
  }
`

export const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
`
export const Dflex = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
`
