<template>
  <div>
    <header>
      <h2 data-l10n="active_useragent">Active user-agent</h2>
      <div class="current">
        <p class="selectable tt">{{ activeUserAgent }}</p>
      </div>
    </header>

    <section>
      <div class="enabled-on-this-domain" v-for="checkbox_id in ['enabled']">
        <strong data-l10n="enabled_on_this_domain">
          <label :for="checkbox_id">Enabled on this domain</label>
        </strong>
        <iosCheckbox :id="checkbox_id"></iosCheckbox>
      </div>
      <ul>
        <li>
          <img src="/assets/img/buttons/pause.svg" alt="pause">
          <span>{{ localize('pause_switcher') }}</span>
          <span data-l10n="pause_switcher">Pause switcher</span>
        </li>
        <li class="blinking-background">
          <img src="/assets/img/buttons/start.svg" alt="unpause">
          <span data-l10n="unpause_switcher">Unpause switcher</span>
        </li>
        <li>
          <img src="/assets/img/buttons/repeat.svg" alt="new">
          <span data-l10n="get_new_agent">Get new agent</span>
        </li>
        <li>
          <img src="/assets/img/buttons/settings.svg" alt="settings">
          <span data-l10n="open_settings">Open settings</span>
        </li>
      </ul>
    </section>

    <footer>
      <a href="#" data-l10n="make_donation">Donate</a> |
      <a href="#" data-l10n="bug_report">Bug report</a>
    </footer>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import iosCheckbox from '@/components/ios-checkbox.vue';

  export default Vue.extend({
    components: { iosCheckbox },
    data: (): { [key: string]: any } => {
      return {
        // activeUserAgent: 'Loading..',
        activeUserAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:67.0) Gecko/20100101 Firefox/67.0 ' +
          'ОдиннацитиклассницаОдиннацитиклассница ОдиннацитиклассницаОдиннацитиклассницаОдиннацитиклассница' +
          'Одиннацитиклассница Одиннацитиклассница Одиннацитиклассница Одиннацитиклассница Одиннацитиклассница',
      };
    },

    methods: {
      // localize entry
      localize: (key: string): string => {
        return chrome.i18n.getMessage(key);
      },
    },
  });
</script>

<style lang="scss">
  $maximal-width: 280px;
  $minimal-height: 230px;
  $gray-dark-color: #f2f2ed;
  $light-color: #fff;
  $main-text-color: #363636;

  // Disable user-selection by default
  *, :after, :before {
    box-sizing: border-box;
    user-select: none;
    -moz-user-select: none; /* Firefox still requires their prefix */
  }

  a, a:hover, a:active {
    color: inherit;
    text-decoration: none;
  }

  label {
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }

  .selectable {
    cursor: text;
    user-select: text;
    -webkit-user-select: text;
  }

  .tt {
    font-family: 'Lucida Console', 'Lucida Sans Typewriter', monaco, 'Bitstream Vera Sans Mono', monospace;
  }

  html, body {
    color: $main-text-color;
    width: $maximal-width;
    min-height: $minimal-height;
    height: auto;
    margin: 0;
    padding: 0;
    background-color: $gray-dark-color;
    font-size: 14px;
    font-family: 'Segoe UI', 'Tahoma', sans-serif;
  }

  header {
    h2 {
      font-size: 1em;
      margin: 0;
      padding: 1em 1.2em 0 1em;
    }

    .current {
      display: table;
      position: relative;
      overflow: hidden;
      height: 100px;
      width: 100%;

      p {
        color: #222;
        font-size: 0.85em;
        text-align: center;
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        max-width: $maximal-width;
        padding: 1em 1em 1.25em 1em;
      }
    }
  }

  section {
    .enabled-on-this-domain {
      background-color: $light-color;
      margin-bottom: 1px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > * {
        margin: 1em;
      }
    }

    ul {
      background-color: $light-color;
      list-style: none;
      padding: 0.5em 0;
      margin: 0 0 0.6em 0;

      li {
        display: flex;
        align-items: center;
        height: 37px;
        padding: 0 1em;
        cursor: pointer;

        * {
          cursor: inherit;
          display: block;
        }

        img {
          height: 55%;
          image-rendering: crisp-edges;
          padding-right: 0.5em;
        }

        &.blinking-background {
          @keyframes blinking-background {
            0% {
              background-color: transparent;
            }
            30% {
              background-color: rgba(87, 222, 114, 0.2);
            }
            50% {
              background-color: rgba(87, 222, 114, 0.25);
            }
            100% {
              background-color: transparent;
            }
          }

          animation: blinking-background 2s infinite;
          text-shadow: 0 0 4px #fff;
        }

        &:hover {
          background-color: $gray-dark-color;
        }
      }
    }
  }

  footer {
    text-align: center;
    font-size: 0.75em;
    padding-bottom: 0.8em;
  }
</style>
