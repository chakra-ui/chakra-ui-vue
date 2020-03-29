import { storiesOf } from '@storybook/vue'
import { CStat, CStatGroup, CStatLabel, CStatNumber, CStatHelperText, CStatArrow } from '..'

storiesOf('UI | Stat', module)
  .add('Basic usage', () => ({
    components: { CStat, CStatLabel, CStatNumber, CStatHelperText },
    template: `
      <div>
        <CStat>
          <CStatLabel>Collected Fees</CStatLabel>
          <CStatNumber>£0.00</CStatNumber>
          <CStatHelperText>Feb 12 - Feb 28</CStatHelperText>
        </CStat>
      </div>
    `
  }))
  .add('With indicators', () => ({
    components: { CStat, CStatGroup, CStatLabel, CStatNumber, CStatHelperText, CStatArrow },
    template: `
      <div>
        <CStatGroup>
          <CStat>
            <CStatLabel>Sent</CStatLabel>
            <CStatNumber>345,670</CStatNumber>
            <CStatHelperText>
              <CStatArrow type="increase" />
              23.36%
            </CStatHelperText>
          </CStat>

          <CStat>
            <CStatLabel>Clicked</CStatLabel>
            <CStatNumber>45</CStatNumber>
            <CStatHelperText>
              <CStatArrow type="decrease" />
              9.05%
            </CStatHelperText>
          </CStat>
        </CStatGroup>
      </div>
    `
  }))
