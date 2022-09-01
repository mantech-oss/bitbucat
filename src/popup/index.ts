import { html, css, LitElement, unsafeCSS, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { IconCog } from '../content/components/icons/icons'

import tailwind from '../styles/tailwind.css?inline'

@customElement('popup-main')
export class PopupMain extends LitElement {
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

  // # Properties  

  // # Event handlers  

  // # Lifecycle methods  

  // # watch  

  render() {
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
                <span class="label-text">Test</span>
                <input
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
}

declare global {
  interface HTMLElementTagNameMap {
    'popup-main': PopupMain
  }
}
