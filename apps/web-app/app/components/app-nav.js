import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class AppNavComponent extends Component {
  @service router;

  @action handleAdminClick() {
    if (this.router.currentURL.startsWith('/admin')) {
      window.postMessage(
        { type: 'navigateToAdminMfeHome' },
        window.location.origin
      );
    }
    this.router.transitionTo('/admin');
  }
}
