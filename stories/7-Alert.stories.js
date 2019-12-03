import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from 'kiwi-core'

storiesOf('UI | Alert', module)
  .addDecorator(centered)
  .add('Default Alert', () => ({
    components: { Alert },
    template: `
      <div>
        <Alert>Kiwi is the best Vue component library</Alert>
      </div>
    `
  }))
  .add('With icon', () => ({
    components: { Alert, AlertIcon },
    template: `
      <div>
        <Alert mb="3" status="info">
          <AlertIcon />
          Kiwi is the best Vue component library
        </Alert>
      </div>
    `
  }))
  .add('With status', () => ({
    components: { Alert, AlertIcon },
    template: `
      <div>
        <Alert mb="3" status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>

        <Alert mb="3" status="success">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>

        <Alert mb="3" status="warning">
          <AlertIcon />
          Seems your account is about expire, upgrade now
        </Alert>

        <Alert mb="3" status="info">
          <AlertIcon />
          Kiwi is going live on December 31st. Get ready!
        </Alert>
      </div>
    `
  }))
  .add('With composed description', () => ({
    components: { Alert, AlertIcon, AlertTitle, AlertDescription },
    template: `
      <div>
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon size="40px" mr="0" />
          <AlertTitle mt="4" mb="1" fontSize="lg">
            Event created!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Your event has been successfully created. Our team will get back to you soon.
          </AlertDescription>
        </Alert>
      </div>
    `
  }))
