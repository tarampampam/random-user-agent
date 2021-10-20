import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings from '../../settings/settings'
import Generator from '../../useragent/generator'

const name: string = 'new-useragent'

export interface NewUseragentRequest extends HandlerRequest {
  readonly payload: {
    // nothing
  }
}

export interface NewUseragentResponse extends HandlerResponse {
  payload: {
    source: 'custom_agents_list' | 'generator'
    useragent: string
  }
}

export function newUseragent(): NewUseragentRequest {
  return {
    method: name,
    payload: {},
  }
}

export default class NewUseragent implements Handler {
  private readonly settings: Settings

  private readonly generator: Generator

  constructor(settings: Settings) {
    this.settings = settings
    this.generator = new Generator()
  }

  name(): string {
    return name
  }

  async handle(request: HandlerRequest): Promise<NewUseragentResponse> {
    if (this.settings.isCustomUserAgentEnabled()) {
      const list: string[] = this.settings.getCustomUserAgentsList()

      if (list.length > 0) {
        const random: string = list[Math.floor(Math.random() * list.length)]

        if (random.trim().length > 0) {
          return {
            payload: {
              source: 'custom_agents_list',
              useragent: random,
            },
          }
        }
      }
    }

    return {
      payload: {
        source: 'generator',
        useragent: await this.generator.generate(this.settings.getGeneratorTypes()),
      },
    }
  }
}
