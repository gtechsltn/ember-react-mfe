import Route from '@ember/routing/route';
import { service } from '@ember/service';
export default class ApplicationRoute extends Route {
  @service router;

  setupController() {
    super.setupController(...arguments);
    const { router } = this;

    window.addEventListener('message', function (event) {
      console.log('inside host app listener', event.data);

      const { data } = event;

      if (!data.type) {
        return;
      }

      if (data.type === 'navigateToHost') {
        router.transitionTo(data.payload.route);
      }
    });
  }
}
