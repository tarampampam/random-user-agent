import Settings from '../settings/settings'
import {UseragentGenerator} from '../useragent/generator'

export default class UseragentService {
  private readonly settings: Settings
  private readonly generator: UseragentGenerator

  constructor(settings: Settings, generator: UseragentGenerator) {
    this.settings = settings
    this.generator = generator
  }

  // Renew the useragent (generate a new and set them into the settings)
  renew(): {
    source: 'custom_agents_list' | 'generator'
    previous: string | undefined
    new: string
  } {
    const previous = this.settings.getUserAgent()

    if (this.settings.isCustomUserAgentEnabled()) {
      const list: string[] = this.settings.getCustomUserAgentsList()

      if (list.length > 0) {
        const random: string = list[Math.floor(Math.random() * list.length)]

        if (random.trim().length > 0) {
          this.settings.setUserAgent(random)

          return {
            source: 'custom_agents_list',
            previous: previous,
            new: random,
          }
        }
      }
    }

    const generated = this.generator.generate(this.settings.getGeneratorTypes())

    this.settings.setUserAgent(generated)

    return {
      source: 'generator',
      previous: previous,
      new: generated,
    }
  }
}
