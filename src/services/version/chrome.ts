import Axios from "axios";
import {Services} from "@/services/services";
import IVersion = Services.Version;

export default class Chrome {
  /**
   * Get latest google chrome version.
   */
  static latest(): Promise<IVersion> {
    return new Promise<IVersion>((resolve: (_: IVersion) => void, reject: (_: Error) => void): void => {
      Axios({
        method: 'GET',
        url: 'https://omahaproxy.appspot.com/all.json',
        responseType: 'json',
      })
        .then((response) => {
          // Define response structure
          type ResponseStructure = {
            [key: string]: any;
            os: 'win' | 'win64' | 'ios' | 'cros' | 'mac' | 'linux' | 'android' | 'webview';

            versions: {
              [key: string]: string;
              channel: 'dev' | 'beta' | 'stable';
              v8_version: string;
              version: string;
              current_reldate: string;
            }[],
          }[];

          // extract platform-based version values
          const winVersions = (response.data as ResponseStructure).filter((entry): boolean => {
            return entry.os === 'win';
          })[0]?.versions;

          if (!winVersions || winVersions.length <= 0) {
            return reject(new Error('Version entries not found'));
          }

          // extract stable version value
          const stableVersion = winVersions.filter((entry): boolean => {
            return entry.channel === 'stable';
          })[0]?.version;

          if (!stableVersion) {
            return reject(new Error('Version data was not found in server response'));
          }

          // explode version value into parts
          const parts = stableVersion.trim().split('.');

          if (parts.length !== 4) {
            return reject(new Error(`Unexpected version value: ${parts}`));
          }

          resolve(<IVersion>{
            major: parseInt(parts[0], 10),
            minor: parseInt(parts[1], 10),
            patch: parseInt(parts[2], 10),
            build: parts[3],
          });
        })
        .catch((err) => reject(err));
    });
  }
}
