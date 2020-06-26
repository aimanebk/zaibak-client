import { OnlyPositivePipe } from './only-positive.pipe';

describe('OnlyPositivePipe', () => {
  it('create an instance', () => {
    const pipe = new OnlyPositivePipe();
    expect(pipe).toBeTruthy();
  });
});
