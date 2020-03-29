import { storiesOf } from '@storybook/vue'
import { CAvatarBadge, CAvatar, CAvatarGroup } from '..'

storiesOf('UI | Avatar', module)
  .add('Avatars', () => ({
    components: {
      CAvatar
    },
    template: `
      <div style="display: flex; align-items: center;">
        <CAvatar
          name="Evan You"
          src="https://pbs.twimg.com/profile_images/888432310504370176/mhoGA4uj_400x400.jpg"
        />
        <CAvatar
          name="Segun Adebayo"
          src="https://bit.ly/sage-adebayo"
        />
        <CAvatar
          name="Tuomo Nieminen"
          src="https://akkadu.cn/assets/team/tuomo-pp.jpg"
        />
        <CAvatar
          name="John Talbott Houk"
          src="https://akkadu.cn/assets/team/jt-pp.jpg"
        />
        <CAvatar
          name="Prosper Otemuyiwa"
          src="https://bit.ly/prosper-baba"
        />
        <CAvatar
          name="梦 龙"
          src="Non real URL"
        />
        <CAvatar
          name="Jonathan Bakebwa"
          src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
        />
      </div>
    `
  }))
  .add('With size', () => ({
    components: {
      CAvatar
    },
    template: `
      <div style="display: flex;">
        <CAvatar
          name="Evan You"
          size="2xs"
          src="https://pbs.twimg.com/profile_images/888432310504370176/mhoGA4uj_400x400.jpg"
        />
        <CAvatar
          name="Segun Adebayo"
          size="xs"
          src="https://bit.ly/sage-adebayo"
        />
        <CAvatar
          name="Tuomo Nieminen"
          size="sm"
          src="https://akkadu.cn/assets/team/tuomo-pp.jpg"
        />
        <CAvatar
          name="John Talbott Houk"
          size="md"
          src="https://akkadu.cn/assets/team/jt-pp.jpg"
        />
        <CAvatar
          name="Prosper Otemuyiwa"
          size="lg"
          src="https://bit.ly/prosper-baba"
        />
        <CAvatar
          name="梦 龙"
          size="xl"
          src="Non real URL"
        />
        <CAvatar
          name="Jonathan Bakebwa"
          size="2xl"
          src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
        />
      </div>
    `
  }))
  .add('With Fallback', () => ({
    components: {
      CAvatar
    },
    template: `
      <div style="display: flex; align-items: center;">
        <CAvatar name="Oshigaki Kisame" src="https://bit.ly/broken-link" />
        <CAvatar name="Sasuke Uchiha" src="https://bit.ly/broken-link" />
        <CAvatar src="https://bit.ly/broken-link" />
      </div>
    `
  }))
  .add('With Badge', () => ({
    components: {
      CAvatar,
      CAvatarBadge
    },
    template: `
      <div style="display: flex; align-items: center;">
      <CAvatar
        name="Evan You"
        src="https://pbs.twimg.com/profile_images/888432310504370176/mhoGA4uj_400x400.jpg"
      >
        <CAvatarBadge size="1.0em" bg="green.500" />
      </CAvatar>
      <CAvatar
        name="Jonathan Bakebwa"
        src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
      >
        <CAvatarBadge size="1.0em" bg="green.500" />
      </CAvatar>
      <CAvatar src="pop">
        <CAvatarBadge size="1.0em" borderColor="papayawhip" bg="tomato" />
      </CAvatar>
      </div>
    `
  }))
  .add('Avatar Group', () => ({
    components: {
      CAvatar,
      CAvatarGroup
    },
    template: `
        <CAvatarGroup size="md" max="3" :spacing="-2">
          <CAvatar
            name="Evan You"
            src="https://pbs.twimg.com/profile_images/888432310504370176/mhoGA4uj_400x400.jpg"
          />
          <CAvatar
            name="Segun Adebayo"
            src="https://bit.ly/sage-adebayo"
          />
          <CAvatar
            name="Jonathan Bakebwa"
            src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
          />
          <CAvatar
            name="Tuomo Nieminen"
            size="sm"
            src="https://akkadu.cn/assets/team/tuomo-pp.jpg"
          />
          <CAvatar
            name="John Talbott Houk"
            size="md"
            src="https://akkadu.cn/assets/team/jt-pp.jpg"
          />
          <CAvatar
            name="Prosper Otemuyiwa"
            size="lg"
            src="https://bit.ly/prosper-baba"
          />
          <CAvatar
            name="梦 龙"
            size="xl"
            src="Non real URL"
          />
          <CAvatar
            name="Jonathan Bakebwa"
            size="2xl"
            src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
          />
        </CAvatarGroup>
    `
  }))
