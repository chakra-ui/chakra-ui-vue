import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import { AvatarBadge, Avatar, AvatarGroup } from 'kiwi-core'

storiesOf('UI | Avatar', module)
  .addDecorator(centered)
  .add('Avatars', () => ({
    components: {
      Avatar
    },
    template: `
      <div style="display: flex; align-items: center;">
        <Avatar
          name="Evan You"
          src="https://pbs.twimg.com/profile_images/888432310504370176/mhoGA4uj_400x400.jpg"
        />
        <Avatar
          name="Segun Adebayo"
          src="https://bit.ly/sage-adebayo"
        />
        <Avatar
          name="Tuomo Nieminen"
          src="https://akkadu.cn/assets/team/tuomo-pp.jpg"
        />
        <Avatar
          name="John Talbott Houk"
          src="https://akkadu.cn/assets/team/jt-pp.jpg"
        />
        <Avatar
          name="Prosper Otemuyiwa"
          src="https://bit.ly/prosper-baba"
        />
        <Avatar
          name="梦 龙"
          src="Non real URL"
        />
        <Avatar
          name="Jonathan Bakebwa"
          src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
        />
      </div>
    `
  }))
  .add('With size', () => ({
    components: {
      Avatar
    },
    template: `
      <div style="display: flex;">
        <Avatar
          name="Evan You"
          size="2xs"
          src="https://pbs.twimg.com/profile_images/888432310504370176/mhoGA4uj_400x400.jpg"
        />
        <Avatar
          name="Segun Adebayo"
          size="xs"
          src="https://bit.ly/sage-adebayo"
        />
        <Avatar
          name="Tuomo Nieminen"
          size="sm"
          src="https://akkadu.cn/assets/team/tuomo-pp.jpg"
        />
        <Avatar
          name="John Talbott Houk"
          size="md"
          src="https://akkadu.cn/assets/team/jt-pp.jpg"
        />
        <Avatar
          name="Prosper Otemuyiwa"
          size="lg"
          src="https://bit.ly/prosper-baba"
        />
        <Avatar
          name="梦 龙"
          size="xl"
          src="Non real URL"
        />
        <Avatar
          name="Jonathan Bakebwa"
          size="2xl"
          src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
        />
      </div>
    `
  }))
  .add('With Fallback', () => ({
    components: {
      Avatar
    },
    template: `
      <div style="display: flex; align-items: center;">
        <Avatar name="Oshigaki Kisame" src="https://bit.ly/broken-link" />
        <Avatar name="Sasuke Uchiha" src="https://bit.ly/broken-link" />
        <Avatar src="https://bit.ly/broken-link" />
      </div>
    `
  }))
  .add('With Badge', () => ({
    components: {
      Avatar,
      AvatarBadge
    },
    template: `
      <div style="display: flex; align-items: center;">
      <Avatar
        name="Evan You"
        src="https://pbs.twimg.com/profile_images/888432310504370176/mhoGA4uj_400x400.jpg"
      >
        <AvatarBadge size="1.0em" bg="green.500" />
      </Avatar>
      <Avatar
        name="Jonathan Bakebwa"
        src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
      >
        <AvatarBadge size="1.0em" bg="green.500" />
      </Avatar>
      <Avatar src="pop">
        <AvatarBadge size="1.0em" borderColor="papayawhip" bg="tomato" />
      </Avatar>
      </div>
    `
  }))
  .add('Avatar Group', () => ({
    components: {
      Avatar,
      AvatarGroup
    },
    template: `
        <AvatarGroup size="md" max="3" :spacing="-2">
          <Avatar
            name="Evan You"
            src="https://pbs.twimg.com/profile_images/888432310504370176/mhoGA4uj_400x400.jpg"
          />
          <Avatar
            name="Segun Adebayo"
            src="https://bit.ly/sage-adebayo"
          />
          <Avatar
            name="Jonathan Bakebwa"
            src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
          />
          <Avatar
            name="Tuomo Nieminen"
            size="sm"
            src="https://akkadu.cn/assets/team/tuomo-pp.jpg"
          />
          <Avatar
            name="John Talbott Houk"
            size="md"
            src="https://akkadu.cn/assets/team/jt-pp.jpg"
          />
          <Avatar
            name="Prosper Otemuyiwa"
            size="lg"
            src="https://bit.ly/prosper-baba"
          />
          <Avatar
            name="梦 龙"
            size="xl"
            src="Non real URL"
          />
          <Avatar
            name="Jonathan Bakebwa"
            size="2xl"
            src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
          />
        </AvatarGroup>
    `
  }))
