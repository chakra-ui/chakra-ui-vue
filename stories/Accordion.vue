<template>
  <div @click="$emit('click')" class="demo-block">
    <!-- Accordion Configuration Options

  data-allow-toggle
    Allow for each toggle to both open and close its section. Makes it possible for all sections to be closed. Assumes only one section may be open.

  data-allow-multiple
    Allow for multiple accordion sections to be expanded at the same time. Assumes data-allow-toggle otherwise the toggle on open sections would be disabled.
  __________

  Ex:
    <div id="accordionGroup" class="Accordion" data-allow-multiple>

    <div id="accordionGroup" class="Accordion" data-allow-toggle>
  -->
    <div id="accordionGroup" class="Accordion">
      <h3>
        <button aria-expanded="true" class="Accordion-trigger" aria-controls="sect1" id="accordion1id">
          <span class="Accordion-title">
            Personal Information
            <span class="Accordion-icon"></span>
          </span>
        </button>
      </h3>
      <div id="sect1" role="region" aria-labelledby="accordion1id" class="Accordion-panel">
        <div>
          <!-- Variable content within section, may include any type of markup or interactive widgets. -->
          <fieldset>
            <p>
              <label for="cufc1">
                Name
                <span aria-hidden="true">
                  *
                </span>
                :
              </label>
              <input type="text" value="" name="Name" id="cufc1" class="required" aria-required="true">
            </p>
            <p>
              <label for="cufc2">
                Email
                <span aria-hidden="true">
                  *
                </span>
                :
              </label>
              <input type="text" value="" name="Email" id="cufc2" aria-required="true">
            </p>
            <p>
              <label for="cufc3">
                Phone:
              </label>
              <input type="text" value="" name="Phone" id="cufc3">
            </p>
            <p>
              <label for="cufc4">
                Extension:
              </label>
              <input type="text" value="" name="Ext" id="cufc4">
            </p>
            <p>
              <label for="cufc5">
                Country:
              </label>
              <input type="text" value="" name="Country" id="cufc5">
            </p>
            <p>
              <label for="cufc6">
                City/Province:
              </label>
              <input type="text" value="" name="City_Province" id="cufc6">
            </p>
          </fieldset>
        </div>
      </div>
      <h3>
        <button aria-expanded="false" class="Accordion-trigger" aria-controls="sect2" id="accordion2id">
          <span class="Accordion-title">
            Billing Address
            <span class="Accordion-icon"></span>
          </span>
        </button>
      </h3>
      <div id="sect2" role="region" aria-labelledby="accordion2id" class="Accordion-panel" hidden="">
        <div>
          <fieldset>
            <p>
              <label for="b-add1">
                Address 1:
              </label>
              <input type="text" name="b-add1" id="b-add1">
            </p>
            <p>
              <label for="b-add2">
                Address 2:
              </label>
              <input type="text" name="b-add2" id="b-add2">
            </p>
            <p>
              <label for="b-city">
                City:
              </label>
              <input type="text" name="b-city" id="b-city">
            </p>
            <p>
              <label for="b-state">
                State:
              </label>
              <input type="text" name="b-state" id="b-state">
            </p>
            <p>
              <label for="b-zip">
                Zip Code:
              </label>
              <input type="text" name="b-zip" id="b-zip">
            </p>
          </fieldset>
        </div>
      </div>
      <h3>
        <button aria-expanded="false" class="Accordion-trigger" aria-controls="sect3" id="accordion3id">
          <span class="Accordion-title">
            Shipping Address
            <span class="Accordion-icon"></span>
          </span>
        </button>
      </h3>
      <div id="sect3" role="region" aria-labelledby="accordion3id" class="Accordion-panel" hidden="">
        <div>
          <fieldset>
            <p>
              <label for="m-add1">
                Address 1:
              </label>
              <input type="text" name="m-add1" id="m-add1">
            </p>
            <p>
              <label for="m-add2">
                Address 2:
              </label>
              <input type="text" name="m-add2" id="m-add2">
            </p>
            <p>
              <label for="m-city">
                City:
              </label>
              <input type="text" name="m-city" id="m-city">
            </p>
            <p>
              <label for="m-state">
                State:
              </label>
              <input type="text" name="m-state" id="m-state">
            </p>
            <p>
              <label for="m-zip">
                Zip Code:
              </label>
              <input type="text" name="m-zip" id="m-zip">
            </p>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    text: {
      type: String,
      default: 'Name'
    }
  },
  mounted () {
    Array.prototype.slice.call(document.querySelectorAll('.Accordion')).forEach(function (accordion) {
      // Allow for multiple accordion sections to be expanded at the same time
      var allowMultiple = accordion.hasAttribute('data-allow-multiple')
      // Allow for each toggle to both open and close individually
      var allowToggle = (allowMultiple) || accordion.hasAttribute('data-allow-toggle')

      // Create the array of toggle elements for the accordion group
      var triggers = Array.prototype.slice.call(accordion.querySelectorAll('.Accordion-trigger'))
      var panels = Array.prototype.slice.call(accordion.querySelectorAll('.Accordion-panel'))

      accordion.addEventListener('click', function (event) {
        var target = event.target

        if (target.classList.contains('Accordion-trigger')) {
          // Check if the current toggle is expanded.
          var isExpanded = target.getAttribute('aria-expanded') == 'true'
          var active = accordion.querySelector('[aria-expanded="true"]')

          // without allowMultiple, close the open accordion
          if (!allowMultiple && active && active !== target) {
            // Set the expanded state on the triggering element
            active.setAttribute('aria-expanded', 'false')
            // Hide the accordion sections, using aria-controls to specify the desired section
            document.getElementById(active.getAttribute('aria-controls')).setAttribute('hidden', '')

            // When toggling is not allowed, clean up disabled state
            if (!allowToggle) {
              active.removeAttribute('aria-disabled')
            }
          }

          if (!isExpanded) {
            // Set the expanded state on the triggering element
            target.setAttribute('aria-expanded', 'true')
            // Hide the accordion sections, using aria-controls to specify the desired section
            document.getElementById(target.getAttribute('aria-controls')).removeAttribute('hidden')

            // If toggling is not allowed, set disabled state on trigger
            if (!allowToggle) {
              target.setAttribute('aria-disabled', 'true')
            }
          } else if (allowToggle && isExpanded) {
            // Set the expanded state on the triggering element
            target.setAttribute('aria-expanded', 'false')
            // Hide the accordion sections, using aria-controls to specify the desired section
            document.getElementById(target.getAttribute('aria-controls')).setAttribute('hidden', '')
          }

          event.preventDefault()
        }
      })

      // Bind keyboard behaviors on the main accordion container
      accordion.addEventListener('keydown', function (event) {
        var target = event.target
        var key = event.which.toString()

        var isExpanded = target.getAttribute('aria-expanded') == 'true'
        var allowToggle = (allowMultiple) || accordion.hasAttribute('data-allow-toggle')

        // 33 = Page Up, 34 = Page Down
        var ctrlModifier = (event.ctrlKey && key.match(/33|34/))

        // Is this coming from an accordion header?
        if (target.classList.contains('Accordion-trigger')) {
          // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
          // 38 = Up, 40 = Down
          if (key.match(/38|40/) || ctrlModifier) {
            var index = triggers.indexOf(target)
            var direction = (key.match(/34|40/)) ? 1 : -1
            var length = triggers.length
            var newIndex = (index + length + direction) % length

            triggers[newIndex].focus()

            event.preventDefault()
          } else if (key.match(/35|36/)) {
            // 35 = End, 36 = Home keyboard operations
            switch (key) {
              // Go to first accordion
              case '36':
                triggers[0].focus()
                break
                // Go to last accordion
              case '35':
                triggers[triggers.length - 1].focus()
                break
            }
            event.preventDefault()
          }
        }
      })

      // These are used to style the accordion when one of the buttons has focus
      accordion.querySelectorAll('.Accordion-trigger').forEach(function (trigger) {
        trigger.addEventListener('focus', function (event) {
          accordion.classList.add('focus')
        })

        trigger.addEventListener('blur', function (event) {
          accordion.classList.remove('focus')
        })
      })

      // Minor setup: will set disabled state, via aria-disabled, to an
      // expanded/ active accordion which is not allowed to be toggled close
      if (!allowToggle) {
        // Get the first expanded/ active accordion
        var expanded = accordion.querySelector('[aria-expanded="true"]')

        // If an expanded/ active accordion is found, disable
        if (expanded) {
          expanded.setAttribute('aria-disabled', 'true')
        }
      }
    })
  },
  methods: {
    action () {
      console.log('Accordion clicked!')
    }
  }
}
</script>

<style lang="css" scoped>
.Accordion {
  margin: 0;
  padding: 0;
  border: 2px solid hsl(0, 0%, 82%);
  border-radius: 7px;
  width: 20em;
}

.Accordion h3 {
  margin: 0;
  padding: 0;
}

.Accordion.focus {
  border-color: hsl(216, 94%, 73%);
}

.Accordion.focus h3 {
  background-color: hsl(0, 0%, 97%);
}

.Accordion > * + * {
  border-top: 1px solid hsl(0, 0%, 82%);
}

.Accordion-trigger {
  background: none;
  color: hsl(0, 0%, 13%);
  display: block;
  font-size: 1rem;
  font-weight: normal;
  margin: 0;
  padding: 1em 1.5em;
  position: relative;
  text-align: left;
  width: 100%;
  outline: none;
}

.Accordion-trigger:focus,
.Accordion-trigger:hover {
  background: hsl(216, 94%, 94%);
}

.Accordion *:first-child .Accordion-trigger {
  border-radius: 5px 5px 0 0;
}

button {
  border-style: none;
}

.Accordion button::-moz-focus-inner {
  border: 0;
}

.Accordion-title {
  display: block;
  pointer-events: none;
  border: transparent 2px solid;
  border-radius: 5px;
  padding: 0.25em;
  outline: none;
}

.Accordion-trigger:focus .Accordion-title {
  border-color: hsl(216, 94%, 73%);
}

.Accordion-icon {
  border: solid hsl(0, 0%, 62%);
  border-width: 0 2px 2px 0;
  height: 0.5rem;
  pointer-events: none;
  position: absolute;
  right: 2em;
  top: 50%;
  transform: translateY(-60%) rotate(45deg);
  width: 0.5rem;
}

.Accordion-trigger:focus .Accordion-icon,
.Accordion-trigger:hover .Accordion-icon {
  border-color: hsl(216, 94%, 73%);
}

.Accordion-trigger[aria-expanded="true"] .Accordion-icon {
  transform: translateY(-50%) rotate(-135deg);
}

.Accordion-panel {
  margin: 0;
  padding: 1em 1.5em;
}

/* For Edge bug https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4806035/ */
.Accordion-panel[hidden] {
  display: none;
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

input {
  border: 1px solid hsl(0, 0%, 62%);
  border-radius: 0.3em;
  display: block;
  font-size: inherit;
  padding: 0.3em 0.5em;
}

</style>
