import { newSpecPage } from '@stencil/core/testing';
import { NovaCascader } from '../components/nova-cascader/nova-cascader';

describe('Cascader', () => {
  it('should render cascader component', async () => {
    const page = await newSpecPage({
      components: [NovaCascader],
      html: `<nova-cascader></nova-cascader>`,
    });
    expect(page.root).toEqualHtml(`<nova-cascader></nova-cascader>`);
  });
});
