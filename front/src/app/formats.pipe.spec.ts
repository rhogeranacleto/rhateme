import { RoundPipe } from './formats.pipe';

describe('FormatsPipe', () => {
  it('create an instance', () => {
    const pipe = new RoundPipe();
    expect(pipe).toBeTruthy();
  });
});
