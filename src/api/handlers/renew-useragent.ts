import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings from '../../settings/settings'
import Generator from '../../useragent/generator'

const name: string = 'refresh-useragent'

export interface RenewUseragentRequest extends HandlerRequest {
  readonly payload: {
    // nothing
  }
}

export interface RenewUseragentResponse extends HandlerResponse {
  payload: {
    source: 'custom_agents_list' | 'generator'
    previous: string | undefined
    new: string
  }
}

export function renewUseragent(): RenewUseragentRequest {
  return {
    method: name,
    payload: {},
  }
}

export default class RenewUseragent implements Handler {
  private readonly settings: Settings

  private readonly generator: Generator

  constructor(settings: Settings) {
    this.settings = settings
    this.generator = new Generator() // FIXME pass this using constructor
  }

  name(): string {
    return name
  }

  async handle(request: RenewUseragentRequest): Promise<RenewUseragentResponse> {
    const previous = this.settings.getUserAgent()

    if (this.settings.isCustomUserAgentEnabled()) {
      const list: string[] = this.settings.getCustomUserAgentsList()

      if (list.length > 0) {
        const random: string = list[Math.floor(Math.random() * list.length)]

        if (random.trim().length > 0) {
          this.settings.setUserAgent(random)

          return {
            payload: {
              source: 'custom_agents_list',
              previous: previous,
              new: random,
            },
          }
        }
      }
    }

    const generated = this.generator.generate(this.settings.getGeneratorTypes())

    this.settings.setUserAgent(generated)

    return {
      payload: {
        source: 'generator',
        previous: previous,
        new: generated,
      },
    }
  }
}
