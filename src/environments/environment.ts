// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const prod = false;
const urlDomainProduction = 'https://spring.luismeramosr.ml';
const urlDomainDev = 'http://localhost:8090';
const urlDomain = prod ? urlDomainProduction : urlDomainDev;
export const environment = {
  production: true,
  apiURL: urlDomain,
  url_api: 'https://platzi-store.herokuapp.com',
  url_client_images: `${urlDomain}/uploads/photos-clients/`,
  url_voucher_images: `${urlDomain}/uploads/vouchers/`,
  url_products_images: `${urlDomain}/uploads/products/thumbnails/`,
  url_productos_other_images: `${urlDomain}/uploads/products/product-images/`,
  url_product_not_found: 'https://www.w4ter.co.za/error.png',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
