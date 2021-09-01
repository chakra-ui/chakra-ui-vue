module.exports = [
    {
        name: 'addChakraLoader',
        type: 'confirm',
        message: 'Auto import Chakra components?',
        description: 'This will allow you to use Chakra components without manually importing and registering them.',
        default: false,
        validate: input => !!input
    },
    {
        name: 'hasVueRouter',
        type: 'confirm',
        message: 'Is your project already setup with Vue Router?',
        description: 'This will affect how App.vue is setup for you',
        default: false,
        validate: input => !!input
    }
]