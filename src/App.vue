<template>
  <theme-provider :theme="$kiwi.theme" :icons="$kiwi.icons">
    <div class="root">
      <div class="wrapper">
        <AvatarGroup size="md" max="3">
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
      </div>
    </div>
  </theme-provider>
</template>

<script lang="js">
import { ThemeProvider, AvatarGroup, Avatar } from 'kiwi-core'

export default {
  data () {
    return {
    }
  },
  name: 'App',
  components: {
    ThemeProvider,
    Avatar,
    AvatarGroup
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0
}

.root {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
