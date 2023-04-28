import {ValueIsNotNumber} from '../../../../../src/core/errors/value-is-not-number';
import {NumberEnvPresenter} from '../../../../../src/entry-point';
import {EnvironmentMock} from '../../../__mocks__/interfaces/environment-mock';
import {
  ProcessEnvMock,
  ProcessEnvNumberKey,
} from '../../../__mocks__/libs/nodejs-process-env-mock';

describe('Given Number Env Presenter', () => {
  let presenter: NumberEnvPresenter;

  beforeEach(() => {
    presenter = new NumberEnvPresenter(EnvironmentMock);
  });

  describe('When attempt to access number from environment', () => {
    it('Should return number from environment key', async () => {
      const envNumber = ProcessEnvMock[ProcessEnvNumberKey];

      EnvironmentMock.getValueByKey.mockReturnValue(envNumber);

      const value = await presenter.getValueByKey(ProcessEnvNumberKey);

      expect(value).toBe(envNumber);
    });

    it('Should throw ValueIsNotNumber', async () => {
      const mockValue = 'NOT AN NUMBER';

      EnvironmentMock.getValueByKey.mockReturnValue(mockValue);

      expect(() =>
        presenter.getValueByKey(ProcessEnvNumberKey)
      ).rejects.toThrow(ValueIsNotNumber.make(ProcessEnvNumberKey));
    });
  });
});
