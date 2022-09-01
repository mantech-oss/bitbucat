import { html, css, LitElement, unsafeCSS, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { IconCog } from '../content/components/icons/icons'
import { watch } from '../content/utils/watch'

import tailwind from '../styles/tailwind.css?inline'

@customElement('popup-main')
export class PopupMain extends LitElement {
  // # Properties

  @property({ type: Boolean })
  enableDdayFeature = true

  // # Event handlers

  // # Lifecycle methods

  connectedCallback(): void {
    chrome.storage.local.get([`enableDdayFeature`], (result: any) => {
      const { enableDdayFeature } = result
      this.enableDdayFeature = enableDdayFeature
    })
    super.connectedCallback()
  }

  // # watch
  @watch('enableDdayFeature', { waitUntilFirstUpdate: true })
  async onWatchEnableDdayFeature(): Promise<void> {
    chrome.storage.local.set({ enableDdayFeature: this.enableDdayFeature })
  }

  render() {
    const { enableDdayFeature } = this
    return html`
      <main data-theme="fantasy" class="bg-transparent">
        <div class="navbar bg-base-100 shadow-xl rounded-box flex item-center justify-between">
          <h1 class="ml-4 normal-case text-xl">
            ${IconCog}
            <span class="ml-2">${chrome.i18n.getMessage('SETTING')}</span>
          </h1>
          <img width="64" src="img/logo-128.png" />
        </div>

        <div class="navbar bg-base-100 shadow-xl rounded-box mt-4">
          <ul class="menu menu-compact bg-base-100 w-full p-2 rounded-box">
            <li class="menu-title w-full">
              <span>${chrome.i18n.getMessage('VIEW_REAL_TIME_DATA')}</span>
            </li>
            <li class="w-full flex">
              <label class="label cursor-pointer">
                <span class="label-text">${chrome.i18n.getMessage('PR_DDAY')}</span>
                <input
                  ?checked=${enableDdayFeature}
                  @change=${(event: Event) => {
                    this.enableDdayFeature = (event.target as HTMLInputElement).checked
                  }}
                  type="checkbox"
                  class="toggle toggle-accent"
                />
              </label>
            </li>
          </ul>
        </div>
      </main>
    `
  }

  static styles = [
    unsafeCSS(tailwind),
    css`
      main {
        min-width: 500px;
        padding: 1rem;
      }

      .outline-none-important {
        outline: none !important;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'popup-main': PopupMain
  }
}
