<template>
  <CFlex justify="center" align="center" min-h="100vh">
    <CGrid template-columns="auto auto" gap="20" align-items="center">
      <CStack spacing="5" px="6" py="4" bg="gray.50" rounded="40px">
        <CHeading as="h3" font-size="4xl" color="gray.600">
          Alerts
        </CHeading>
        <CAlert status="error" cursor="pointer" :_hover="{ transform: 'translateY(-5px)' }">
          <CAlertIcon />
          <CStack spacing="1" mr="3">
            <CAlertTitle>Credit Card expired</CAlertTitle>
            <CAlertDescription status="error">
              Update Payment Details
            </CAlertDescription>
          </CStack>
          <CCloseButton ml="auto" rounded="full" bg="transparent" @click="() => showToast('error')" />
        </CAlert>
        <CAlert status="success" cursor="pointer" :_hover="{ transform: 'translateY(-5px)' }">
          <CAlertIcon />
          <CStack spacing="1" mr="3">
            <CAlertTitle>Source successfully added!</CAlertTitle>
            <CAlertDescription status="success">
              Start Exploring
            </CAlertDescription>
          </CStack>
          <CCloseButton ml="auto" rounded="full" bg="transparent" @click="() => showToast('success')" />
        </CAlert>
        <CAlert status="warning" cursor="pointer" :_hover="{ transform: 'translateY(-5px)' }">
          <CAlertIcon />
          <CStack spacing="1" mr="3">
            <CAlertTitle>Low memory</CAlertTitle>
            <CAlertDescription status="warning">
              Upgrade to Pro
            </CAlertDescription>
          </CStack>
          <CCloseButton ml="auto" rounded="full" bg="transparent" @click="() => showToast('warning')" />
        </CAlert>
        <CAlert status="info" cursor="pointer" :_hover="{ transform: 'translateY(-5px)' }">
          <CAlertIcon />
          <CStack spacing="1" mr="3">
            <CAlertTitle>37 New Reviews found</CAlertTitle>
            <CAlertDescription status="info">
              Refresh Feed
            </CAlertDescription>
          </CStack>
          <CCloseButton ml="auto" rounded="full" bg="transparent" @click="() => showToast('info')" />
        </CAlert>
      </CStack>
      <CBox
        bg="blackAlpha.700"
        pt="6"
        pb="16"
        px="6"
        shadow="lg"
        rounded="40px"
      >
        <CStack
          cursor="pointer"
          transition="0.2s all ease-in"
          :_hover="{ bg: 'blackAlpha.600' }"
          border-color="blue.400"
          border-width="4px"
          border-style="dashed"
          spacing="5"
          bg="blackAlpha.800"
          px="8"
          shadow="lg"
          py="10"
          position="relative"
          rounded="28px"
          align="center"
        >
          <CIcon color="white" name="upload" size="30px" />
          <CText color="white" font-weight="bold">
            Upload pictures
          </CText>
          <CText text-align="center" max-w="250px" size="sm" color="gray.400">
            Videos must be less than <span v-chakra color="white">30 MB</span> and photos must be less than <br><span v-chakra color="white">2 MB</span> in size
          </CText>
          <CButton
            variant-color="blue"
            size="lg"
            shadow="md"
            position="absolute"
            bottom="0"
            left="50%"
            transform="translate(-50%, 50%)"
          >
            Upload
          </CButton>
        </CStack>
      </CBox>
    </CGrid>
  </CFlex>
</template>

<script lang="js">
export default {
  name: 'App',
  methods: {
    showToast (status) {
      this.$toast({
        title: 'Toast dismissed',
        description: 'Action has been taken',
        status,
        isClosable: true,
        variant: 'subtle'
      })
    }
  }
}
</script>
