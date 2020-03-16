import {Services} from "@/services/services";
import {Defined, RpcParams} from "jsonrpc-lite";
import Settings from "@/services/settings/settings";
import {GET_ACTIVE_USERAGENT} from "@/services/rpc/constants";

export default class RpcHandlers {
  private readonly settings: Settings;

  // Methods map. Key is method name, and value is handler
  private map: { [method: string]: Services.RPC.MethodHandler } = {
    [GET_ACTIVE_USERAGENT]: this.getActiveUserAgent,
  };

  // All handler dependencies must be passed through constructor
  constructor(settings: Settings) {
    this.settings = settings;
  }

  // RPC methods registration
  public registerFor(router: Services.RPC.Router): void {
    for (let method of Object.keys(this.map)) {
      router.on(method, this.map[method].bind(this));
    }
  }

  public getActiveUserAgent(params?: RpcParams): Defined {
    return this.settings.getUserAgent();
  }
}
