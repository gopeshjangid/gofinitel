
export class CustomerService {

    getCustomersLarge() {
        return fetch('data/customers-large.json').then(res => res.json())
                .then(d => d.data);
    }

    getSideBarMenuList() {
        return fetch('data/menu-tree.json').then(res => res.json())
                .then(d => d);
    }

    getCustomers(params) {
        const queryParams = params ? Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&') : '';
        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then(res => res.json())
    }
}
    