import { StyleSheet } from 'react-native';

const colors = {
  background: '#f2f2f2',
  text: '#555',
  border: '#e6e6e6',
  darkBlue: '#141b41',
  boldBlue: '#306BAC',
  violet: '#918EF4',
  moneyGreen: '#00cc44',
  red: '#ff1a1a',
  orange: '#ee8434',
  lorange: '#fbe3d0',
  lightYellow: '#e8e288',
  llightYellow: '#f7f5d4',
  lightGreen: '#7dce82',
  llightGreen: '#daf1dc',
  grayBlue: '#3cdbd3',
  lgrayBlue: '#d4f7f5',

  lightBlue: '#00fff5',
  llightBlue: '#ccfffd'
}

const one = {
  background: 'white',
  text: 'black',
  border: '#e6e6e6',
  main: colors.grayBlue,
  lmain: colors.lgrayBlue,
  attention: colors.orange,
  lattention: colors.lorange,
  slow: colors.lightYellow,
  lslow: colors.llightYellow,
  go: colors.lightGreen,
  lgo: colors.llightGreen,
  sub: colors.lightBlue,
  lsub: colors.llightBlue,
  warning: colors.red
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
    color: '#555',
    fontSize: 20
  }
});

export default {
  colors,
  styles,
  one
}
