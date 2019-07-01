import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('nova-cascader e2e', () => {
  let page: E2EPage;
  let element: E2EElement;
  let contentElement: any;

  const props  = {
    "data": {
      "items": [
        {
          "value": "zhejiang",
          "label": "Zhejiang",
          "children": [
            {
              "value": "hangzhou",
              "label": "Hangzhou",
              "children": [
                {
                  "value": "xihu",
                  "label": "West Lake"
                },
                {
                  "value": "xihe",
                  "label": "East Lake"
                },
                {
                  "value": "xiha",
                  "label": "North Lake"
                }
              ]
            }
          ]
        },
        {
          "value": "jiangsu",
          "label": "Jiangsu",
          "disabled": "true",
          "children": [
            {
              "value": "nanjing",
              "label": "Nanjing",
              "children": [
                {
                  "value": "zhonghuamen",
                  "label": "Zhong Hua Men"
                }
              ]
            }
          ]
        }
      ]
    }
  }

  beforeEach(async () => {
    page = await newE2EPage({html: ` <nova-cascader></nova-cascader>`});
    await page.$eval('nova-cascader', ( el:any , { data } ) => {
        el.content = data
    }, props)
    await page.waitForChanges();
    
    element = await page.find('nova-cascader');
  });


  it('should set the instructions', async () => {
    // contentElement = await element.shadowRoot.querySelector('p')
    // expect(contentElement).toEqualText('Select one of the options below');
  });

  it('should display all menu options', async () => {
    // contentElement = await element.shadowRoot.querySelectorAll('li')
    // expect(contentElement.length).toEqual(5);
  });
});