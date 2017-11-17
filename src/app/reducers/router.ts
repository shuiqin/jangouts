import { Params, RouterStateSnapshot } from "@angular/router";
import { RouterStateSerializer } from "@ngrx/router-store";

export interface IRouterStateUrl {
  url: string;
  queryParams: Params;
}

/*
 * @ngrx/router-store saves a lot of information in the application's store. So instead of using
 * the default serializer, we have implemented a custom one to save only data which is needed
 * in Jangouts.
 *
 * Check the API documentation for further information:
 * https://github.com/ngrx/platform/blob/6ed92b08a60bb99a88433372b9793586f78b17ff/docs/router-store/api.md
 */
export class CustomSerializer implements RouterStateSerializer<IRouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    return { url, queryParams };
  }
}
