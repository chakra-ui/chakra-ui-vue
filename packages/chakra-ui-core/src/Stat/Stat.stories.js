import { storiesOf } from '@storybook/vue'
import { Stat, StatGroup, StatLabel, StatNumber, StatHelperText, StatArrow } from '..'

storiesOf('UI | Stat', module)
  .add('Basic usage', () => ({
    components: { Stat, StatLabel, StatNumber, StatHelperText },
    template: `
      <div>
        <Stat>
          <StatLabel>Collected Fees</StatLabel>
          <StatNumber>£0.00</StatNumber>
          <StatHelperText>Feb 12 - Feb 28</StatHelperText>
        </Stat>
      </div>
    `
  }))
  .add('With indicators', () => ({
    components: { Stat, StatGroup, StatLabel, StatNumber, StatHelperText, StatArrow },
    template: `
      <div>
        <StatGroup>
          <Stat>
            <StatLabel>Sent</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelperText>
              <StatArrow type="increase" />
              23.36%
            </StatHelperText>
          </Stat>

          <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelperText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelperText>
          </Stat>
        </StatGroup>
      </div>
    `
  }))
