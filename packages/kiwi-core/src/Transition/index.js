const Slide = {
  name: 'Slide',
  props: {
    in: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 250
    },
    finalHeight: {
      type: String,
      default: 'auto'
    },
    from: String,
    finalWidth: String
  },
  setup (props, context) {
    let placements = {
      bottom: {
        maxWidth: '100vw',
        height: props.finalHeight,
        bottom: 0,
        left: 0,
        right: 0
      },
      top: {
        maxWidth: '100vw',
        height: props.finalHeight,
        top: 0,
        left: 0,
        right: 0
      },
      left: {
        ...(props.finalWidth && { maxWidth: props.finalWidth }),
        height: '100vh',
        left: 0,
        top: 0
      },
      right: {
        ...(props.finalWidth && { maxWidth: props.finalWidth }),
        right: 0,
        top: 0,
        height: '100vh'
      }
    }

    let transitionOptions = {
      bottom: {
        offset: '100%',
        transform: y => `translateY(${y})`
      },
      top: {
        offset: '-100%',
        transform: y => `translateY(${y})`
      },
      left: {
        offset: '-100%',
        transform: x => `translateX(${x})`
      },
      right: {
        offset: '100%',
        transform: x => `translateX(${x})`
      }
    }

    const { transform, offset } = transitionOptions[props.from]
    console.log(transform, offset, placements)
  }
}

export {
  Slide
}
