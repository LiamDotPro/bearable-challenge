import styled from 'styled-components/native'
import {Text} from 'react-native'
import {color, space, typography, layout, flexbox, border} from 'styled-system'

const Paragraph = styled(Text)`
  ${color}
  ${space}
  ${typography}
  ${layout}
  ${flexbox}
  ${border}
`

export default Paragraph
