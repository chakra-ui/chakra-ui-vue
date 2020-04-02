import { storiesOf } from '@storybook/vue'
import { CAlert, CAlertIcon, CAlertTitle, CAlertDescription, CStack } from '..'

storiesOf('UI | Alert', module)
  .add('Default Alert', () => ({
    components: { CAlert },
    template: `
      <div>
        <CAlert>Kiwi is the best Vue component library</CAlert>
      </div>
    `
  }))
  .add('With icon', () => ({
    components: { CAlert, CAlertIcon },
    template: `
      <div>
        <CAlert mb="3" status="info">
          <CAlertIcon />
          Kiwi is the best Vue component library
        </CAlert>
      </div>
    `
  }))
  .add('With status', () => ({
    components: { CAlert, CAlertIcon },
    template: `
      <div>
        <CAlert mb="3" status="error">
          <CAlertIcon />
          There was an error processing your request
        </CAlert>

        <CAlert mb="3" status="success">
          <CAlertIcon />
          Data uploaded to the server. Fire on!
        </CAlert>

        <CAlert mb="3" status="warning">
          <CAlertIcon />
          Seems your account is about expire, upgrade now
        </CAlert>

        <CAlert mb="3" status="info">
          <CAlertIcon />
          Kiwi is going live on December 31st. Get ready!
        </CAlert>
      </div>
    `
  }))
  .add('With composed description', () => ({
    components: { CAlert, CAlertIcon, CAlertTitle, CAlertDescription },
    template: `
      <div>
        <CAlert
          status="success"
          variant="subtle"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <CAlertIcon size="40px" mr="0" />
          <CAlertTitle mt="4" mb="1" fontSize="lg">
            Event created!
          </CAlertTitle>
          <CAlertDescription maxWidth="sm">
            Your event has been successfully created. Our team will get back to you soon.
          </CAlertDescription>
        </CAlert>
      </div>
    `
  }))
  .add('With variant', () => ({
    components: { CAlert, CAlertIcon, CAlertTitle, CAlertDescription, CStack },
    template: `
    <c-stack>
      <c-alert status="success" variant="subtle">
        <c-alert-icon />
        Data uploaded to the server. Fire on!
      </c-alert>
      <c-alert status="success" variant="solid">
        <c-alert-icon />
        Data uploaded to the server. Fire on!
      </c-alert>
      <c-alert status="success" variant="left-accent">
        <c-alert-icon />
        Data uploaded to the server. Fire on!
      </c-alert>
      <c-alert status="success" variant="top-accent">
        <c-alert-icon />
        Data uploaded to the server. Fire on!
      </c-alert>
    </c-stack>
    `
  }))
