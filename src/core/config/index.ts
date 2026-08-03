import { ConfigService } from "../../config/ConfigService.js";
import { EnvValidator } from "../../config/EnvValidator.js";

/** Core config facade — reuses app ConfigService / EnvValidator. */
export class CoreConfig {
  constructor(readonly app: ConfigService) {}

  static load(rootDir = process.cwd()): CoreConfig {
    return new CoreConfig(ConfigService.create({ rootDir }));
  }

  get rootDir(): string {
    return this.app.rootDir;
  }

  get env() {
    return this.app.env;
  }
}

export { ConfigService, EnvValidator };
