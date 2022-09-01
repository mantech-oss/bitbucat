import './components/tag/tag'
import { BitTag } from './components/tag/tag'
import { getDaysDiffBetweenDates } from './utils/getDaysDiffBetweenDates'

init()

async function init(): Promise<void> {
  await initStorage()

  initStorageHandler()
  addChangedDdayHandler()
}

async function initStorage(): Promise<void> {
  chrome.storage.local.set({ isRequestPullRequsestApi: false })
}

function initStorageHandler() {
  addMutationObserver()
}

function addMutationObserver(): void {
  const mutationElement = document.body

  const observer = new MutationObserver(observeBody)

  const config = { subtree: true, childList: true }

  if (!mutationElement) return

  observer.observe(mutationElement, config)
}

let timeoudId = 0

async function observeBody(mutations: MutationRecord[]): Promise<void> {
  const { enableDdayFeature } = await chrome.storage.local.get([`enableDdayFeature`])

  if (enableDdayFeature === false) return

  mutations.forEach((mutation) => {
    const target = mutation.target as HTMLElement

    if (!target.querySelector('table')) return
    if (!mutation.addedNodes.length) return

    addDdayLabels()
  })
}

function addDdayLabels(): void {
  const timeElements: NodeListOf<HTMLElement> = document.querySelectorAll(
    '[data-qa="pull-request-row"] td:first-child small > span:nth-child(3), [data-qa="pull-request-row"] td:first-child small > time:nth-of-type(2)',
  )

  if (timeElements.length === 0) return

  timeoudId && clearTimeout(timeoudId)
  timeoudId = setTimeout(() => {
    chrome.storage.local.set({ isRequestPullRequsestApi: false })

    const titleElements: NodeListOf<HTMLElement> = document.querySelectorAll(
      '[data-qa="pull-request-row"] td:first-child > div > div:nth-child(2) > div',
    )

    titleElements.forEach((titleElement, index) => {
      const bitTagElement = titleElement.querySelector('bit-tag') as BitTag
      const tagElement = document.createElement('bit-tag')
      const updatedString = timeElements[index]?.title?.replace(' at', '')
      const pullRequestUdpdatedDate = new Date(updatedString)
      const now = new Date()
      const dday = getDaysDiffBetweenDates(pullRequestUdpdatedDate, now)

      if (bitTagElement) {
        bitTagElement.remove()
      }

      tagElement.style.marginLeft = `auto`
      tagElement.ddayNumber = dday

      titleElements[index].appendChild(tagElement)

      titleElement.appendChild(tagElement)
    })
  }, 250)
}

function addChangedDdayHandler(): void {
  chrome.storage.onChanged.addListener(async (changes: any, area: 'local' | 'sync') => {
    if (area !== 'local') return
    if (!('enableDdayFeature' in changes)) return

    if (changes['enableDdayFeature'].newValue === true) {
      addDdayLabels()
    } else if (changes['enableDdayFeature'].newValue === false) {
      const bitTagElements: NodeListOf<BitTag> = document.querySelectorAll('bit-tag')
      bitTagElements.forEach((bitTagElement) => {
        bitTagElement.remove()
      })
    }
  })
}

export {}
