import {Inject} from '@nestjs/common';
import {existsSync, readFileSync} from 'fs';

import {FileNotExists} from '../../../core/errors/file-not-exists';
import {Environment} from '../../../core/interfaces/environment';
import {ProcessEnvService} from '../../../core/services/process-env-service';

export class BufferEnvPresenter implements Environment<Buffer> {
  async getValueByKey(key: string): Promise<Buffer> {
    const path = await this.processEnvService.getValueByKey(key);

    const fileExists = existsSync(path);

    if (!fileExists) {
      throw FileNotExists.make(path);
    }

    const file = readFileSync(path);
    return file;
  }

  constructor(
    @Inject(ProcessEnvService)
    private processEnvService: Environment<string>
  ) {}
}
