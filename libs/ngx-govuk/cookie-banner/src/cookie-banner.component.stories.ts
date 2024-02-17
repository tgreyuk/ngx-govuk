import { moduleMetadata, type Meta } from '@storybook/angular';
import { NgxGovukButtonGroupDirective } from 'libs/ngx-govuk/button/src/button-group.directive';
import { NgxGovukButtonDirective } from 'libs/ngx-govuk/button/src/button.directive';
import { NgxgovukCookieBannerComponent } from './cookie-banner.component';

const meta: Meta<NgxgovukCookieBannerComponent> = {
  component: NgxgovukCookieBannerComponent,
  title: 'UI Components/Cookie Banner',
  decorators: [
    moduleMetadata({
      imports: [NgxGovukButtonGroupDirective, NgxGovukButtonDirective],
    }),
  ],
};
export default meta;

export const CookieBanner = {
  args: {
    headingText: 'Cookies on [name of service]',
  },
  render: (args: NgxgovukCookieBannerComponent) => ({
    props: args,
    template: `
      <ngx-govuk-cookie-banner [headingText]="headingText">
        <p class="govuk-body">
          We use some essential cookies to make this service work.
        </p>
        <p class="govuk-body">
          We’d also like to use analytics cookies so we can understand how you
          use the service and make improvements.
        </p>
        <div buttonGroup ngxGovukButtonGroup>
          <button ngxGovukButton>Accept analytics cookies</button>
          <button ngxGovukButton>Reject analytics cookies</button>
          <a href="" class="govuk-link">View cookies</a>
        </div>
      </ngx-govuk-cookie-banner>`,
  }),
};
